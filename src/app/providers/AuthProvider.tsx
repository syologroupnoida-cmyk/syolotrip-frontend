import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { UserProfile, AuthResponse, UserRole } from '@/contracts';
import {
  loginApi,
  demoLoginApi,
  getCurrentUserApi,
  logoutApi,
  loginAdmin,
  demoLoginAdmin,
  logoutAdmin,
} from '@/services/api';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  token: string | null;
  role: UserRole | null;
  permissions: string[];
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginAsAdmin: (email: string, password: string) => Promise<AuthResponse>;
  demoLogin: (role?: UserRole | 'ADMIN' | 'CUSTOMER' | 'PARTNER' | 'BUSINESS_ADMIN') => Promise<AuthResponse>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
  canAccess: (requirements: { roles?: UserRole[]; permissions?: string[] }) => boolean;
  refreshUser: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'ss_access_token';
const ADMIN_TOKEN_KEY = 'admin_token';
const USER_KEY = 'ss_user_profile';
const ADMIN_USER_KEY = 'admin_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const rawUser = localStorage.getItem(USER_KEY) || localStorage.getItem(ADMIN_USER_KEY);
    if (rawUser) {
      try {
        return JSON.parse(rawUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state into localStorage
  const saveSession = (authToken: string, authUser: UserProfile) => {
    localStorage.setItem(TOKEN_KEY, authToken);
    localStorage.setItem(ADMIN_TOKEN_KEY, authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  };

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    setToken(null);
    setUser(null);
  };

  const refreshUser = async (): Promise<UserProfile | null> => {
    try {
      const activeToken = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY);
      if (!activeToken) {
        setIsLoading(false);
        return null;
      }
      const fetchedUser = await getCurrentUserApi();
      if (fetchedUser) {
        saveSession(activeToken, fetchedUser);
        return fetchedUser;
      } else {
        clearSession();
        return null;
      }
    } catch {
      // Token might be expired or invalid
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    const handleUnauthorized = () => {
      clearSession();
    };

    const handleLogout = () => {
      clearSession();
    };

    window.addEventListener('admin:unauthorized', handleUnauthorized);
    window.addEventListener('admin:logout', handleLogout);

    return () => {
      window.removeEventListener('admin:unauthorized', handleUnauthorized);
      window.removeEventListener('admin:logout', handleLogout);
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const authData = await loginApi(email, password);
      const accessToken =
        authData.tokens?.accessToken || (authData.tokens as any)?.access_token || '';
      if (accessToken && authData.user) {
        saveSession(accessToken, authData.user);
      }
      return authData;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsAdmin = async (email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const authData = await loginAdmin({ email, password });
      const accessToken =
        authData.tokens?.accessToken || (authData.tokens as any)?.access_token || '';
      if (accessToken && authData.user) {
        saveSession(accessToken, authData.user);
      }
      return authData;
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (
    role: UserRole | 'ADMIN' | 'CUSTOMER' | 'PARTNER' | 'BUSINESS_ADMIN' = 'CUSTOMER'
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      let authData: AuthResponse;
      if (
        role === 'ADMIN' ||
        role === 'SUPER_ADMIN' ||
        role === 'OPERATIONS_ADMIN' ||
        role === 'INVENTORY_MANAGER' ||
        role === 'FINANCE_ADMIN' ||
        role === 'SUPPORT_ADMIN'
      ) {
        authData = await demoLoginAdmin('ADMIN');
      } else {
        authData = await demoLoginApi(role as any);
      }
      const accessToken =
        authData.tokens?.accessToken || (authData.tokens as any)?.access_token || '';
      if (accessToken && authData.user) {
        saveSession(accessToken, authData.user);
      }
      return authData;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    logoutAdmin();
    clearSession();
  };

  const role = user?.role || null;
  const permissions = useMemo(() => user?.permissions || [], [user]);

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user || !user.role) return false;
    if (user.role === 'SUPER_ADMIN') return true; // Super admin has global bypass
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList.includes(user.role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    if (permissions.includes('*') || permissions.includes(permission)) return true;

    // Check wildcard prefix (e.g. "inventory:*" matches "inventory:read")
    const [actionPrefix] = permission.split(':');
    if (actionPrefix && permissions.includes(`${actionPrefix}:*`)) {
      return true;
    }
    return false;
  };

  const canAccess = ({
    roles,
    permissions: requiredPermissions,
  }: {
    roles?: UserRole[];
    permissions?: string[];
  }): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;

    if (roles && roles.length > 0) {
      const matchRole = roles.includes(user.role);
      if (!matchRole) return false;
    }

    if (requiredPermissions && requiredPermissions.length > 0) {
      const matchPerm = requiredPermissions.every((p) => hasPermission(p));
      if (!matchPerm) return false;
    }

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(token && user),
        isLoading,
        user,
        token,
        role,
        permissions,
        login,
        loginAsAdmin,
        demoLogin,
        logout,
        hasRole,
        hasPermission,
        canAccess,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useRBAC = () => {
  const { user, role, permissions, hasRole, hasPermission, canAccess } = useAuth();
  return {
    user,
    role,
    permissions,
    hasRole,
    hasPermission,
    canAccess,
    isSuperAdmin: role === 'SUPER_ADMIN',
    isAdmin: role === 'ADMIN' || role === 'SUPER_ADMIN',
    isPartner: role === 'PARTNER',
    isBusiness: role === 'BUSINESS_ADMIN' || role === 'AGENCY_ADMIN' || role === 'EMPLOYEE',
    isCustomer: role === 'CUSTOMER',
  };
};

// Backwards-compatible hook for migrated admin pages
export const useAdminAuth = () => {
  const auth = useAuth();
  return {
    isAuthenticated: auth.isAuthenticated && Boolean(
      auth.role === 'ADMIN' ||
      auth.role === 'SUPER_ADMIN' ||
      auth.role === 'OPERATIONS_ADMIN' ||
      auth.role === 'INVENTORY_MANAGER' ||
      auth.role === 'FINANCE_ADMIN' ||
      auth.role === 'SUPPORT_ADMIN'
    ),
    user: auth.user,
    token: auth.token,
    login: auth.loginAsAdmin,
    demoLogin: () => auth.demoLogin('ADMIN'),
    logout: auth.logout,
  };
};


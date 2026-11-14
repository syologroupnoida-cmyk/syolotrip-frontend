import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@/contracts';
import { useAuth } from '@/hooks/useAuth';
import { ForbiddenPage } from '@/components/ui/ForbiddenPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermissions?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requiredPermissions,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading, user, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-600">Verifying security credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (redirectTo) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    // For admin routes default to /admin/login
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    // For partner routes
    if (location.pathname.startsWith('/partner')) {
      return <Navigate to="/partner/login" state={{ from: location }} replace />;
    }
    // For business routes
    if (location.pathname.startsWith('/business')) {
      return <Navigate to="/business/login" state={{ from: location }} replace />;
    }
    return <ForbiddenPage title="Sign-in Required" message="Please log in to access this secured portal." />;
  }

  // Check role authorization
  if (allowedRoles && allowedRoles.length > 0) {
    const isAuthorizedRole = hasRole(allowedRoles);
    if (!isAuthorizedRole) {
      return (
        <ForbiddenPage
          title="Role Restriction"
          message={`Your current role (${user?.role}) does not have permission to access this section.`}
          requiredRole={allowedRoles.join(' or ')}
        />
      );
    }
  }

  // Check granular permission authorization
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((perm) => hasPermission(perm));
    if (!hasAllPermissions) {
      return (
        <ForbiddenPage
          title="Permission Denied"
          message="Your account lacks the specific authorization permissions required for this feature."
        />
      );
    }
  }

  return <>{children}</>;
};


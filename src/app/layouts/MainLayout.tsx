import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header, ScreenType } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { AuthModal } from '@/components/ui/AuthModal';
import { WishlistModal } from '@/components/ui/WishlistModal';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/contexts/WishlistContext';
import { getMyBizContextApi, MyBizContext } from '@/services/api';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const { wishlistCount } = useWishlist();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [bizContext, setBizContext] = useState<MyBizContext | null>(null);

  // Map path to ScreenType for header active indicators
  const getScreenFromPath = (path: string): ScreenType => {
    if (path === '/' || path === '') return 'explore';
    if (path.startsWith('/flights')) return 'flights';
    if (path.startsWith('/hotels')) return 'hotels';
    if (path.startsWith('/trains')) return 'trains';
    if (path.startsWith('/buses')) return 'buses';
    if (path.startsWith('/cabs')) return 'cabs';
    if (path.startsWith('/packages')) return 'packages';
    if (path.startsWith('/checkout')) return 'checkout';
    if (path.startsWith('/trips')) return 'trips';
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/wallet')) return 'wallet';
    if (path.startsWith('/list-property') || path.startsWith('/list-your-property')) return 'list-property';
    if (path.startsWith('/partner/register')) return 'vendor-register';
    if (path.startsWith('/partner/kyc')) return 'vendor-kyc';
    if (path.startsWith('/partner/dashboard')) return 'vendor-dashboard';
    if (path.startsWith('/partner')) return 'vendor-register';
    if (path.startsWith('/business/register')) return 'business-register';
    if (path.startsWith('/business/login')) return 'business-login';
    if (path.startsWith('/business/dashboard')) return 'business-dashboard';
    if (path.startsWith('/business')) return 'business';
    return 'explore';
  };

  const activeScreen = getScreenFromPath(location.pathname);

  // Load business context if logged in
  useEffect(() => {
    if (user) {
      getMyBizContextApi()
        .then((ctx) => setBizContext(ctx))
        .catch(() => setBizContext(null));
    } else {
      setBizContext(null);
    }
  }, [user]);

  // Listen to open-auth and open-wishlist window events
  useEffect(() => {
    const handleOpenAuth = () => setIsAuthOpen(true);
    const handleOpenWishlist = () => setIsWishlistOpen(true);

    window.addEventListener('app:open-auth', handleOpenAuth);
    window.addEventListener('app:open-wishlist', handleOpenWishlist);

    return () => {
      window.removeEventListener('app:open-auth', handleOpenAuth);
      window.removeEventListener('app:open-wishlist', handleOpenWishlist);
    };
  }, []);

  const handleNavigateScreen = (screen: ScreenType) => {
    switch (screen) {
      case 'explore': navigate('/'); break;
      case 'flights': navigate('/flights'); break;
      case 'hotels': navigate('/hotels'); break;
      case 'trains': navigate('/trains'); break;
      case 'buses': navigate('/buses'); break;
      case 'cabs': navigate('/cabs'); break;
      case 'packages': navigate('/packages'); break;
      case 'checkout': navigate('/checkout'); break;
      case 'trips': navigate('/trips'); break;
      case 'dashboard': navigate('/dashboard'); break;
      case 'wallet': navigate('/wallet'); break;
      case 'list-property': navigate('/list-your-property'); break;
      case 'vendor-register': navigate('/partner/register'); break;
      case 'vendor-kyc': navigate('/partner/kyc'); break;
      case 'vendor-dashboard': navigate('/partner/dashboard'); break;
      case 'business': navigate('/business'); break;
      case 'business-register': navigate('/business/register'); break;
      case 'business-login': navigate('/business/login'); break;
      case 'business-dashboard': navigate('/business/dashboard'); break;
      default: navigate('/'); break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Unified Header */}
      <Header
        activeScreen={activeScreen}
        setActiveScreen={handleNavigateScreen}
        currentPath={location.pathname}
        user={user}
        bizContext={bizContext}
        onOpenAuth={() => setIsAuthOpen(true)}
        onPartnerLogin={() => navigate('/partner/login')}
        onBusinessLogin={() => navigate('/business/login')}
        onLogout={logout}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistCount}
        onNavigateDashboardTab={(tab) => {
          navigate(`/dashboard?tab=${tab}`);
        }}
      />

      {/* Main Module Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigateScreen} />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsAuthOpen(false);
          refreshUser();
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onInitiateCheckout={(item) => {
          setIsWishlistOpen(false);
          navigate('/checkout', { state: { checkoutItem: item } });
        }}
        onExplore={() => {
          setIsWishlistOpen(false);
          navigate('/');
        }}
      />
    </div>
  );
};


import React from 'react';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { ScreenType } from '@/components/navigation/Header';

// Travel Module Pages
import { ExplorePage } from '@/modules/travel/pages/ExplorePage';
import { FlightSearchPage } from '@/modules/travel/pages/FlightSearchPage';
import { HotelSearchPage } from '@/modules/travel/pages/HotelSearchPage';
import { TrainSearchPage } from '@/modules/travel/pages/TrainSearchPage';
import { BusSearchPage } from '@/modules/travel/pages/BusSearchPage';
import { CabSearchPage } from '@/modules/travel/pages/CabSearchPage';
import { PackageSearchPage } from '@/modules/travel/pages/PackageSearchPage';
import { BookingCheckoutPage, WebCheckoutItem } from '@/modules/travel/pages/BookingCheckoutPage';

// Customer Module Pages
import { CustomerDashboardPage, DashboardSubTab } from '@/modules/customer/pages/CustomerDashboardPage';

// Business Module Pages
import { BusinessLandingPage } from '@/modules/business/pages/BusinessLandingPage';
import { BusinessRegistrationPage } from '@/modules/business/pages/BusinessRegistrationPage';
import { BusinessLoginPage } from '@/modules/business/pages/BusinessLoginPage';
import { BusinessDashboardPage } from '@/modules/business/pages/BusinessDashboardPage';

// Partner Module Pages
import { ListPropertyPage } from '@/modules/partner/pages/ListPropertyPage';
import { VendorRegistrationPage } from '@/modules/partner/pages/VendorRegistrationPage';
import { VendorKYCPage } from '@/modules/partner/pages/VendorKYCPage';
import { VendorDashboardPage } from '@/modules/partner/pages/VendorDashboardPage';

// Admin Service Page
import { UniversalServiceManagement } from '@/modules/admin/pages/UniversalServiceManagement';

export const useNavigationHelper = () => {
  const navigate = useNavigate();

  const handleNavigate = (screen: ScreenType) => {
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

  const handleInitiateCheckout = (item: WebCheckoutItem) => {
    navigate('/checkout', { state: { checkoutItem: item } });
  };

  return { handleNavigate, handleInitiateCheckout };
};

export const ExploreRoute: React.FC = () => {
  const navigate = useNavigate();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  return (
    <ExplorePage
      onNavigate={handleNavigate}
      onSearchFlights={(params) => {
        const sp = new URLSearchParams();
        if (params.fromCode) sp.set('fromCode', params.fromCode);
        if (params.toCode) sp.set('toCode', params.toCode);
        if (params.fromCity) sp.set('fromCity', params.fromCity);
        if (params.toCity) sp.set('toCity', params.toCity);
        if (params.departDate) sp.set('departDate', params.departDate);
        if (params.returnDate) sp.set('returnDate', params.returnDate);
        navigate(`/flights?${sp.toString()}`);
      }}
      onSearchHotels={(params) => {
        const sp = new URLSearchParams();
        if (params.city) sp.set('city', params.city);
        if (params.checkIn) sp.set('checkIn', params.checkIn);
        if (params.checkOut) sp.set('checkOut', params.checkOut);
        navigate(`/hotels?${sp.toString()}`);
      }}
      onSearchTrains={(params) => {
        const sp = new URLSearchParams();
        if (params.fromCity) sp.set('fromCity', params.fromCity);
        if (params.toCity) sp.set('toCity', params.toCity);
        if (params.travelDate) sp.set('travelDate', params.travelDate);
        navigate(`/trains?${sp.toString()}`);
      }}
      onSearchBuses={(params) => {
        const sp = new URLSearchParams();
        if (params.fromCity) sp.set('fromCity', params.fromCity);
        if (params.toCity) sp.set('toCity', params.toCity);
        if (params.travelDate) sp.set('travelDate', params.travelDate);
        navigate(`/buses?${sp.toString()}`);
      }}
      onSearchCabs={(params) => {
        const sp = new URLSearchParams();
        if (params.city) sp.set('city', params.city);
        if (params.pickup) sp.set('pickup', params.pickup);
        if (params.drop) sp.set('drop', params.drop);
        navigate(`/cabs?${sp.toString()}`);
      }}
      onSearchPackages={(params) => {
        const sp = new URLSearchParams();
        if (params.destination) sp.set('destination', params.destination);
        navigate(`/packages?${sp.toString()}`);
      }}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const FlightSearchRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  const params = {
    fromCode: searchParams.get('fromCode') || 'DEL',
    toCode: searchParams.get('toCode') || 'BLR',
    fromCity: searchParams.get('fromCity') || 'Delhi',
    toCity: searchParams.get('toCity') || 'Bengaluru',
    departDate: searchParams.get('departDate') || '2026-10-24',
    returnDate: searchParams.get('returnDate') || undefined,
  };

  return (
    <FlightSearchPage
      searchParams={params}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const HotelSearchRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  const params = {
    city: searchParams.get('city') || 'Paris',
    checkIn: searchParams.get('checkIn') || '2026-11-04',
    checkOut: searchParams.get('checkOut') || '2026-11-11',
  };

  return (
    <HotelSearchPage
      searchParams={params}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const TrainSearchRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  const fromCity = searchParams.get('fromCity') || 'Delhi';
  const toCity = searchParams.get('toCity') || 'Mumbai';

  return (
    <TrainSearchPage
      fromCity={fromCity}
      toCity={toCity}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const BusSearchRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  const fromCity = searchParams.get('fromCity') || 'Bengaluru';
  const toCity = searchParams.get('toCity') || 'Goa';
  const travelDate = searchParams.get('travelDate') || '2026-10-24';
  const returnDate = searchParams.get('returnDate') || undefined;

  return (
    <BusSearchPage
      fromCity={fromCity}
      toCity={toCity}
      travelDate={travelDate}
      returnDate={returnDate}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const CabSearchRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  const city = searchParams.get('city') || 'Delhi';
  const pickup = searchParams.get('pickup') || undefined;
  const drop = searchParams.get('drop') || undefined;

  return (
    <CabSearchPage
      city={city}
      pickupLocation={pickup}
      dropLocation={drop}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const PackageSearchRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  const destination = searchParams.get('destination') || 'Kashmir';

  return (
    <PackageSearchPage
      destinationCity={destination}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
    />
  );
};

export const CheckoutRoute: React.FC = () => {
  const location = useLocation();
  const { handleNavigate } = useNavigationHelper();
  const { user } = useAuth();
  const checkoutItem = (location.state as any)?.checkoutItem || null;

  return (
    <BookingCheckoutPage
      bookingItem={checkoutItem}
      currentUser={user}
      onNavigate={(screen) => handleNavigate(screen as ScreenType)}
    />
  );
};

export const CustomerDashboardRoute: React.FC<{ tab?: DashboardSubTab }> = ({ tab }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { handleNavigate, handleInitiateCheckout } = useNavigationHelper();

  let activeTab: DashboardSubTab = tab || (searchParams.get('tab') as DashboardSubTab) || 'overview';
  if (location.pathname === '/trips') activeTab = 'trips';
  if (location.pathname === '/wallet') activeTab = 'wallet';

  return (
    <CustomerDashboardPage
      currentUser={user}
      initialTab={activeTab}
      onNavigate={handleNavigate}
      onInitiateCheckout={handleInitiateCheckout}
      onOpenAuth={() => window.dispatchEvent(new CustomEvent('app:open-auth'))}
      onLogout={logout}
    />
  );
};

export const BusinessLandingRoute: React.FC = () => {
  const { handleNavigate } = useNavigationHelper();
  const { user } = useAuth();
  return (
    <BusinessLandingPage
      user={user}
      bizContext={null}
      onNavigate={handleNavigate}
      onOpenAuth={() => handleNavigate('business-login')}
    />
  );
};

export const BusinessRegisterRoute: React.FC = () => {
  const navigate = useNavigate();
  const { handleNavigate } = useNavigationHelper();
  return (
    <BusinessRegistrationPage
      onNavigate={handleNavigate}
      onBizRegistered={() => navigate('/business/dashboard')}
    />
  );
};

export const BusinessLoginRoute: React.FC = () => {
  const navigate = useNavigate();
  const { handleNavigate } = useNavigationHelper();
  return (
    <BusinessLoginPage
      onNavigate={handleNavigate}
      onBizLoginSuccess={() => navigate('/business/dashboard')}
    />
  );
};

export const BusinessDashboardRoute: React.FC = () => {
  const { handleNavigate } = useNavigationHelper();
  const { user } = useAuth();
  return (
    <BusinessDashboardPage
      user={user}
      bizContext={null}
      onNavigate={handleNavigate}
      onOpenAuth={() => handleNavigate('business-login')}
    />
  );
};

export const ListPropertyRoute: React.FC = () => {
  const { handleNavigate } = useNavigationHelper();
  return <ListPropertyPage onNavigate={handleNavigate} />;
};

export const VendorRegisterRoute: React.FC<{ initialMode?: 'register' | 'login' }> = ({
  initialMode = 'register',
}) => {
  const { handleNavigate } = useNavigationHelper();
  return <VendorRegistrationPage onNavigate={handleNavigate} initialMode={initialMode} />;
};

export const VendorKYCRoute: React.FC = () => {
  const { handleNavigate } = useNavigationHelper();
  return <VendorKYCPage onNavigate={handleNavigate} />;
};

export const VendorDashboardRoute: React.FC = () => {
  const { handleNavigate } = useNavigationHelper();
  const { logout } = useAuth();
  return <VendorDashboardPage onNavigate={handleNavigate} onLogout={logout} />;
};

export const AdminUniversalServiceRoute: React.FC = () => {
  const { entity } = useParams<{ entity: string }>();
  const validEntity = (entity || 'flights') as
    | 'flights'
    | 'hotels'
    | 'villas'
    | 'packages'
    | 'trains'
    | 'buses'
    | 'cabs'
    | 'tours'
    | 'visa'
    | 'insurance';
  return <UniversalServiceManagement entity={validEntity} />;
};

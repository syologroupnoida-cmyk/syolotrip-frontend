import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AdminLayout } from '@/app/layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ForbiddenPage } from '@/components/ui/ForbiddenPage';
import { NotFoundPage } from '@/components/ui/NotFoundPage';

// Route Adapters for Travel, Customer, Business, and Partner
import {
  ExploreRoute,
  FlightSearchRoute,
  HotelSearchRoute,
  TrainSearchRoute,
  BusSearchRoute,
  CabSearchRoute,
  PackageSearchRoute,
  CheckoutRoute,
  CustomerDashboardRoute,
  BusinessLandingRoute,
  BusinessRegisterRoute,
  BusinessLoginRoute,
  BusinessDashboardRoute,
  ListPropertyRoute,
  VendorRegisterRoute,
  VendorKYCRoute,
  VendorDashboardRoute,
} from './routeAdapters';

// Admin Module Pages
import { AdminLoginPage } from '@/modules/admin/pages/AdminLoginPage';
import { DashboardOverview } from '@/modules/admin/pages/DashboardOverview';
import { BookingsManagement } from '@/modules/admin/pages/BookingsManagement';
import { UniversalServiceManagement } from '@/modules/admin/pages/UniversalServiceManagement';
import { MasterDataManagement } from '@/modules/admin/pages/MasterDataManagement';
import { PricingManagement } from '@/modules/admin/pages/PricingManagement';
import { CouponsManagement } from '@/modules/admin/pages/CouponsManagement';
import { WalletManagement } from '@/modules/admin/pages/WalletManagement';
import { CustomersManagement } from '@/modules/admin/pages/CustomersManagement';
import { BusinessManagement } from '@/modules/admin/pages/BusinessManagement';
import { RolesManagement } from '@/modules/admin/pages/RolesManagement';
import { UsersManagement } from '@/modules/admin/pages/UsersManagement';
import { ImportExportManagement } from '@/modules/admin/pages/ImportExportManagement';
import { AuditLogsManagement } from '@/modules/admin/pages/AuditLogsManagement';
import { PlatformSettings } from '@/modules/admin/pages/PlatformSettings';

const ADMIN_ALLOWED_ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'OPERATIONS_ADMIN',
  'INVENTORY_MANAGER',
  'FINANCE_ADMIN',
  'SUPPORT_ADMIN',
] as const;

export const router = createBrowserRouter([
  // ── Public Travel & Customer Application (MainLayout Shell) ──
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Travel Search & Booking Routes
      { index: true, element: <ExploreRoute /> },
      { path: 'flights', element: <FlightSearchRoute /> },
      { path: 'hotels', element: <HotelSearchRoute /> },
      { path: 'trains', element: <TrainSearchRoute /> },
      { path: 'buses', element: <BusSearchRoute /> },
      { path: 'cabs', element: <CabSearchRoute /> },
      { path: 'packages', element: <PackageSearchRoute /> },
      { path: 'checkout', element: <CheckoutRoute /> },

      // Partner / Vendor Onboarding & Registration
      { path: 'list-property', element: <ListPropertyRoute /> },
      { path: 'list-your-property', element: <ListPropertyRoute /> },
      { path: 'partner/register', element: <VendorRegisterRoute initialMode="register" /> },
      { path: 'partner/login', element: <VendorRegisterRoute initialMode="login" /> },

      // Business / myBiz Public Portals
      { path: 'business', element: <BusinessLandingRoute /> },
      { path: 'business/register', element: <BusinessRegisterRoute /> },
      { path: 'business/login', element: <BusinessLoginRoute /> },

      // Protected Customer Routes
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN', 'SUPER_ADMIN', 'PARTNER', 'BUSINESS_ADMIN', 'EMPLOYEE']}>
            <CustomerDashboardRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: 'trips',
        element: (
          <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN', 'SUPER_ADMIN', 'PARTNER', 'BUSINESS_ADMIN', 'EMPLOYEE']}>
            <CustomerDashboardRoute tab="trips" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'wallet',
        element: (
          <ProtectedRoute allowedRoles={['CUSTOMER', 'ADMIN', 'SUPER_ADMIN', 'PARTNER', 'BUSINESS_ADMIN', 'EMPLOYEE']}>
            <CustomerDashboardRoute tab="wallet" />
          </ProtectedRoute>
        ),
      },

      // Protected Partner Routes
      {
        path: 'partner/kyc',
        element: (
          <ProtectedRoute allowedRoles={['PARTNER', 'ADMIN', 'SUPER_ADMIN']}>
            <VendorKYCRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: 'partner/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['PARTNER', 'ADMIN', 'SUPER_ADMIN']}>
            <VendorDashboardRoute />
          </ProtectedRoute>
        ),
      },

      // Protected Business Routes
      {
        path: 'business/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['BUSINESS_ADMIN', 'AGENCY_ADMIN', 'EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}>
            <BusinessDashboardRoute />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ── Standalone Admin Login (Public) ──
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },

  // ── Protected Admin Control Console (AdminLayout Shell) ──
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[...ADMIN_ALLOWED_ROLES]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'dashboard', element: <DashboardOverview /> },
      {
        path: 'bookings',
        element: (
          <ProtectedRoute requiredPermissions={['booking:read']}>
            <BookingsManagement />
          </ProtectedRoute>
        ),
      },

      // 10 Universal Travel Inventory Services
      {
        path: 'flights',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="flights" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'hotels',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="hotels" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'villas',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="villas" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'packages',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="packages" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'trains',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="trains" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'buses',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="buses" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cabs',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="cabs" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tours',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="tours" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'visa',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="visa" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'insurance',
        element: (
          <ProtectedRoute requiredPermissions={['inventory:read']}>
            <UniversalServiceManagement entity="insurance" />
          </ProtectedRoute>
        ),
      },

      // Master Reference Data
      {
        path: 'master-data',
        element: (
          <ProtectedRoute requiredPermissions={['master_data:read']}>
            <MasterDataManagement />
          </ProtectedRoute>
        ),
      },

      // Commercials
      {
        path: 'pricing',
        element: (
          <ProtectedRoute requiredPermissions={['pricing:read']}>
            <PricingManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'coupons',
        element: (
          <ProtectedRoute requiredPermissions={['coupon:read']}>
            <CouponsManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'wallet',
        element: (
          <ProtectedRoute requiredPermissions={['wallet:read']}>
            <WalletManagement />
          </ProtectedRoute>
        ),
      },

      // Users & Access
      {
        path: 'customers',
        element: (
          <ProtectedRoute requiredPermissions={['user:read']}>
            <CustomersManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'business',
        element: (
          <ProtectedRoute requiredPermissions={['business:read']}>
            <BusinessManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'roles',
        element: (
          <ProtectedRoute requiredPermissions={['role:manage']}>
            <RolesManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute requiredPermissions={['user:read']}>
            <UsersManagement />
          </ProtectedRoute>
        ),
      },

      // Tools & System
      {
        path: 'import-export',
        element: (
          <ProtectedRoute requiredPermissions={['import:read']}>
            <ImportExportManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'audit',
        element: (
          <ProtectedRoute requiredPermissions={['audit:read']}>
            <AuditLogsManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute requiredPermissions={['settings:read']}>
            <PlatformSettings />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ── Error & Fallback Routes ──
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


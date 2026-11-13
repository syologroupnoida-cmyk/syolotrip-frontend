# SyoloTrip — Unified Frontend Application

A consolidated, single-application frontend for the SyoloTrip travel platform built with **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, **React Router v6**, and **TanStack Query**.

---

## 🏛️ Application Architecture

All platform modules operate inside this single application with dynamic Role-Based Access Control (RBAC):
- **`src/modules/travel/`**: Flights, Hotels, Trains, Buses, Cabs, Holiday Packages, and Checkout
- **`src/modules/customer/`**: Customer Dashboard, My Trips, Saved Travellers, and Dual Wallet
- **`src/modules/business/`**: Corporate myBiz Portal, Employee Management, and Invoices
- **`src/modules/partner/`**: Vendor Extranet, Property Listing, and KYC Onboarding
- **`src/modules/admin/`**: Admin Control Console (10 Travel Services, Pricing Engine, Coupons, Wallet, Roles, Settings)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```
Default configuration points to the local backend proxy:
```env
VITE_API_URL=/api/v1
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch on: **http://localhost:5173/**

### 4. Build for Production
```bash
# Typecheck
npm run typecheck

# Production bundle
npm run build

# Preview build
npm run preview
```

---

## 🔐 Credentials & Default Accounts
- **Admin Portal (`/admin`)**: `admin@ssjourney.com` / `ADMIN~321`
- **Partner Extranet (`/partner/dashboard`)**: `vendor.demo@traveler.com` / `DemoPass123!`
- **Corporate myBiz (`/business/dashboard`)**: `biz.admin@traveler.com` / `DemoPass123!`
- **Customer Account (`/dashboard`)**: `customer.demo@traveler.com` / `DemoPass123!`

---

## 📚 Documentation
Detailed documentation is included in the [`docs/`](./docs) folder:
- [Architecture Guide](./docs/architecture.md)
- [Module Mapping](./docs/module-mapping.md)
- [Roles & Permissions (RBAC)](./docs/roles-permissions.md)
- [Setup Guide](./docs/setup-guide.md)


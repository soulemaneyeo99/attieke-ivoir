# Project Roadmap: Attiéké Ivoir E-commerce Platform

## Phase 1: Setup & Backend Core (Weeks 1-2)
- [ ] Initialize Git Repository and Project Structure
- [x] Backend Setup (Django REST Framework) <!-- id: 0 -->
    - [x] Create virtual environment and install dependencies (Django, DRF, PSQL adapter, etc.)
    - [x] Initialize Django Project `attieke_ivoir_backend`
    - [x] Configure PostgreSQL database connection
    - [x] Setup Environment Variables (.env)
    - [x] Setup CORS and basic security settings
- [x] Frontend Setup (Next.js 14+) <!-- id: 1 -->
    - [x] Initialize Next.js app `attieke_ivoir_frontend` (App Router)
    - [x] Setup TailwindCSS/PostCSS
    - [x] Install essential libraries (axios/ky, zustand, framer-motion, lucide-react)
    - [x] Configure ESLint/Prettier
- [x] Database Modeling <!-- id: 2 -->
    - [x] Implement `User` model (Custom User or extended)
    - [x] Implement `Category` model
    - [x] Implement `Product` and `ProductImage` models
    - [x] Implement `Order` and `OrderItem` models
    - [x] Implement `ShippingZone` and `PromoCode` models
    - [x] Make migrations and migrate
- [x] API Development - Core & Auth <!-- id: 3 -->
    - [x] Setup JWT Authentication (SimpleJWT)
    - [x] Create Auth endpoints (Register, Login, Refresh, Me)
    - [x] Create Product/Category Read endpoints (List, Detail, Featured)
    - [x] Setup Admin interface (Standard Django Admin)

## Phase 2: Frontend Public Pages (Week 3)
- [x] Design System Implementation <!-- id: 4 -->
    - [x] Setup Global Styles (Colors, Typography)
    - [x] Create reusable UI components (Buttons, Cards, Inputs)
    - [x] Implement Layout (Header, Footer, Mobile Menu)
- [x] Page Implementation <!-- id: 5 -->
    - [x] Home Page (Hero, Featured, Testimonials)
    - [x] Shop Page (Grid, Filters, Sorting, Search)
    - [x] Product Details Page (Gallery, Info, Related)
    - [ ] Static Pages (About, Contact, FAQ)

## Phase 3: Cart & Checkout System (Week 4)
- [x] Shopping Cart Logic <!-- id: 6 -->
    - [x] Implement Zustand Store for Cart
    - [x] Cart Page UI (List, Quantity, Total)
    - [x] Cart Persistence (Local Storage / Backend sync)
- [/] Checkout Flow <!-- id: 7 -->
    - [x] Checkout Page UI (Shipping Form)
    - [x] Backend: Order Creation API (Models, Views, Serializers Implemented)
    - [ ] Run Migrations & Verify API
    - [ ] Connect Frontend to Backend API

## Phase 4: Payment & Delivery (Week 5)
- [ ] Payment Gateway Integration <!-- id: 8 -->
    - [ ] Research/Select Aggregator (PayDunya, CinetPay, or direct OM/MTN/Moov)
    - [ ] Implement Payment Initiation API
    - [ ] Implement Payment Webhook/Callback handling
- [ ] Delivery Management <!-- id: 9 -->
    - [ ] Admin: Manage Shipping Zones
    - [ ] Frontend: Dynamic shipping cost based on location

## Phase 5: Admin Panel & Dashboard (Week 6)
- [ ] Custom Admin Dashboard <!-- id: 10 -->
    - [ ] Statistics Charts (Sales, Orders)
    - [ ] Order Management Workflow (Status updates)
    - [ ] Invoice Generation (PDF)
- [ ] Stock Management <!-- id: 11 -->
    - [ ] Low stock alerts
    - [ ] Bulk image upload

## Phase 6: Deployment & Polish (Week 7)
- [ ] Optimization <!-- id: 12 -->
    - [ ] SEO Metadata & Sitemap
    - [ ] Image Optimization
    - [ ] Performance Audit (Lighthouse)
- [ ] Deployment <!-- id: 13 -->
    - [ ] Backend on Railway/DigitalOcean
    - [ ] Frontend on Vercel
    - [ ] Domain Configuration
- [ ] Documentation <!-- id: 14 -->
    - [ ] API Docs (Swagger/Redoc)
    - [ ] User/Admin Manuals

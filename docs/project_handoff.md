# Handoff Context: Attiéké Ivoir E-commerce Platform
**Status as of:** 2025-12-14

## Project Overview
A professional e-commerce platform for "Attiéké Ivoir" (Ivorian agri-food products). Mobile-first, Next.js Frontend, Django Rest Framework Backend.

## Current State (Phase 3: Checkout)
- **Frontend**: 
    - Full "Bio-Agro" design system implemented.
    - Shopping Cart is fully functional (Zustand + LocalStorage).
    - Checkout Page (`/commande`) UI is ready but currently **simulates** the API call.
- **Backend**:
    - Project structure set up.
    - Accounts, Products apps working.
    - **Orders App**: I just wrote the code for Models, Serializers, and Views.
    - **CRITICAL**: The database migrations for `orders` have **NOT** been applied yet due to environment limitations.

## Immediate Action Items for Next AI
1.  **Run Migrations**: The very first thing you must do is apply the pending migrations.
    - `python manage.py makemigrations orders`
    - `python manage.py migrate`
2.  **Verify Backend**: Ensure the `POST /api/orders/` endpoint works using `curl` or Postman.
3.  **Integrate Frontend**: Go to `attieke_ivoir_frontend/app/commande/page.tsx`. Search for `handleOrderSubmit`. Replace the mock `setTimeout` with a real `axios.post('/api/orders/', ...)` call.
    - *Note*: Ensure the payload matches `OrderCreateSerializer` (needs `items: [{product_id, quantity}]`).

## Technology Headers
- **Visuals**: Primary Colors: Forest Green (`#2D7A3E`), Vibrant Orange (`#FF8C42`).
- **Frameworks**: Next.js 14 (App Router), Django 4.x, TailwindCSS.

## File Shortcuts
- **Tracking**: [task.md](file:///C:/Users/YEO/.gemini/antigravity/brain/db5fca31-78b8-4d36-b1ed-5c76683cf028/task.md)
- **Recent Frontend**: [CheckoutPage](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_frontend/app/commande/page.tsx)
- **Recent Backend**: [OrderSerializers](file:///C:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/serializers.py)

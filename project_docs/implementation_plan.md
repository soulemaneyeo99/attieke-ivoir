# Implementation Plan - Phase 3: Cart & Checkout System

# Goal Description
Implement a fully functional shopping cart and checkout process.
1.  **Cart**: Users can add items, change quantities, remove items. State persists in LocalStorage.
2.  **Checkout**: Users provide shipping info and confirm order. Backend creates the Order record.

## User Review Required
- **Guest Checkout**: We will assume guest checkout is allowed for now (or simple auto-registration).
- **Payment**: We'll implement "Cash on Delivery" and "Mobile Money" (simulation) as payment methods.

## Proposed Changes

### Frontend (`attieke_ivoir_frontend`)

#### [NEW] [store/cart.ts](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_frontend/store/cart.ts)
- **Zustand Store**:
    - `items`: Array of `{ product, quantity }`.
    - `addItem(product, quantity)`
    - `removeItem(productId)`
    - `updateQuantity(productId, quantity)`
    - `clearCart()`
    - `totalPrice()` selector.
- **Persistence**: Use `persist` middleware from Zustand.

#### [NEW] [components/cart/](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_frontend/components/cart/)
- `CartSheet.tsx`: Slide-over drawer showing detailed cart contents (accessible from Header).
- `CartItem.tsx`: Individual row in cart.
- `CartSummary.tsx`: Subtotal, Shipping estimation, Total.

#### [NEW] [app/panier/page.tsx](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_frontend/app/panier/page.tsx)
- Full page view of the cart (fallback if drawer is too small or for detailed review).

#### [NEW] [app/commande/page.tsx](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_frontend/app/commande/page.tsx)
- **Steps**:
    1.  **Info**: Name, Phone, Delivery Address (Commune).
    2.  **Payment**: Method selection (Orange/MTN/Moov/Cash).
    3.  **Review**: Final check.
    4.  **Success**: Confirmation screen.
- **Logic**: Submits data to `POST /api/orders/create/`.

### Backend (`attieke_ivoir_backend`)

#### [NEW] [apps/orders/serializers.py](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/serializers.py)
- `OrderItemSerializer`: For validation.
- `OrderCreateSerializer`: Handles nested `items` creation properly. Transaction atomic.

#### [NEW] [apps/orders/views.py](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/views.py)
- `CreateOrderView`: Public endpoint (or auth required).
- `OrderHistoryView`: List orders for logged-in user.

#### [NEW] [apps/orders/urls.py](file:///c:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/urls.py)
- Register endpoints.

### Orders App (Backend)
#### [MODIFY] [models.py](file:///C:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/models.py)
 - Add `first_name`, `last_name`, `email`, `commune`, `delivery_fee` fields to `Order`.
 - Ensure `phone` is present.
 - Update `__str__` methods.
#### [NEW] [serializers.py](file:///C:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/serializers.py)
 - `OrderItemSerializer`: Simple serializer for items.
 - `OrderCreateSerializer`: Handles nested creation of items, calculation of total (validation), and user association.
#### [NEW] [views.py](file:///C:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/views.py)
 - `OrderViewSet`: `create` (AllowAny or IsAuthenticated?), `list` (IsAuthenticated - own orders).
#### [NEW] [urls.py](file:///C:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/apps/orders/urls.py)
 - Register `OrderViewSet`.
#### [MODIFY] [config/urls.py](file:///C:/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda/attieke_ivoir_backend/config/urls.py)
 - Add `path('api/orders/', include('apps.orders.urls'))`.

## Verification Plan
### Manual Verification
1.  **Add to Cart**: Go to Product page, click Add -> Verify badge count updates in Header.
2.  **Persist**: Refresh page -> Cart should still have items.
3.  **Checkout**: Fill form, Submit -> Check Network tab for 201 Created.
4.  **Admin**: Check Django Admin -> New Order should appear with correct items.
### Automated Tests
- Run `python manage.py test apps.orders` (if tests exist, otherwise skip).
- Use `curl` or Postman to create a dummy order.
### Manual Verification
- Use frontend Checkout to place an order.
- Check Django Admin to see if the order is created correctly with all fields.

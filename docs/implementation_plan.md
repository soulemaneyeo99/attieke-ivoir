# Implementation Plan - Phase 4: Finalizing per Specifications (Cahier des Charges)

## Goal
Align the platform completely with the user's "Cahier des Charges":
- **Products**: Manioc flour, Attiéké, Poultry, Rabbits, Organic Fish.
- **Pages**: About, Contact, FAQ, specialized Shop.
- **Payment**: Visualize Mobile Money options.
- **Admin**: Ensure everything is manageable.

## User Review Required
None. Proceeding based on provided detailed specs.

## Proposed Changes

### Frontend (`frontend/`)

#### [NEW] [app/contact/page.tsx]
- Contact form and information (phone, email).

#### [NEW] [app/faq/page.tsx]
- Frequently asked questions (delivery, payment, quality).

#### [NEW] [app/a-propos/page.tsx]
- Company presentation, mission (Bio/Local).

#### [MODIFY] [components/layout/Footer.tsx]
- Add links to new pages (About, Contact, FAQ).

#### [MODIFY] [app/commande/page.tsx]
- Update payment step to visually selection between:
    - Orange Money / MTN / Moov (Manual/On Delivery)
    - Cash on Delivery
- Ensure "Pays" and "Commune" selection is clear.

#### [MODIFY] [tailwind.config.ts] ~ Optional
- Adjust palette if needed to include "Brown" (Earth tones).

### Backend (`backend/`)

#### [NEW] [apps/products/management/commands/seed_products.py]
-   **Script to auto-populate**:
    -   **Categories**: "Farine de Manioc", "Attiéké", "Volailles (Poulet)", "Lapins", "Poissons Bio".
    -   **Products**: Realistic sample data with prices and descriptions matching the prompt.

## Verification Plan
1.  **Seeding**: Run `python manage.py seed_products` on Render (via Start Command or manual console if available, or just run locally and dump). *Better: Run locally and I'll push a data fix, OR just rely on the user using the now-working Admin.*
    -   *Decision*: I will create the seed command so the user can run it, or I can run it via `python manage.py shell`.
2.  **Navigation**: Check Footer links work.
3.  **Checkout**: Verify payment options are visible.

# CampusBites — Design System

The UI is kept **very simple on purpose**: white page, black text, thin grey borders and one
orange accent colour. The focus of this MVP is the flow (browse → cart → order → pickup), not
decoration.

All colour tokens live in [`app/globals.css`](app/globals.css) (Tailwind v4 `@theme`), so a class
like `bg-primary` or `text-muted` always uses these values.

## 1. Colors

| Token | Hex | Used for |
|---|---|---|
| Primary | `#EA580C` (orange) | Main buttons, active filter, active nav link, logo |
| Primary Dark | `#C2410C` | Hover on main buttons |
| Secondary | `#FFFFFF` with grey border | Outline buttons (Add, Cancel, Clear cart) |
| Background | `#FFFFFF` | Page background |
| Text | `#111827` | All normal text |
| Muted text | `#6B7280` | Helper text (canteen name, prep time, dates) |
| Border | `#D1D5DB` | Boxes, list dividers, inputs |
| Accent | `#EA580C` | Same as primary, so there is only one highlight colour |
| Success | `#16A34A` | "Veg", "Open" |
| Error | `#DC2626` | "Non-veg", "Closed", error messages, Remove |

Green / red for veg / non-veg follows the common Indian food convention.

## 2. Typography

One font: **Inter** (Google Font, loaded with `next/font` in [`app/layout.js`](app/layout.js)).

| Style | Size / Weight | Tailwind |
|---|---|---|
| H1 (page title) | 24px / Bold | `text-2xl font-bold` |
| H2 (section) | 18px / Bold | `text-lg font-bold` |
| Body | 16px / Regular | default |
| Button text | 14px / Regular | `text-sm` |
| Small / secondary | 14px / Regular, muted colour | `text-sm text-muted` |
| Label (Veg, Open...) | 12px / Medium | `text-xs font-medium` |

## 3. Layout

- Content width is capped at `max-w-4xl` and centred, with 16px side padding.
- Menu, cart and orders are **simple lists** (one row per item with a divider line).
- Boxes have a 1px grey border and slightly rounded corners. No shadows, gradients or animations.
- It works on mobile: the navbar links wrap onto a second line on small screens.

## 4. UI Components

Reusable components in [`components/`](components/):

| Component | Purpose | Used on |
|---|---|---|
| `Navbar` | Logo, Menu, My Orders, Cart (count), Login/Logout | Every page |
| `Footer` | Bottom line | Every page |
| `Button` | `primary` (orange) or `outline` (white); becomes a link when given `href` | Everywhere |
| `Card` | Bordered box | Cart summary, login, order status |
| `Badge` | Small coloured label (Veg, Open, ...) | Menu, landing |
| `Input` | Labelled text input / textarea | Login, search, cart note |
| `Select` | Labelled dropdown | Pickup time on cart |
| `Modal` | Popup box for confirming the order | Cart |
| `MenuItemCard` | One dish row: name, veg label, canteen, time, price, Add / quantity | Landing, menu |
| `QuantityStepper` | `− 2 +` control | Menu, item details, cart |
| `CategoryFilter` | Row of filter buttons | Menu (canteen + category) |
| `OrderStatusTracker` | "Order placed → Preparing → Ready for pickup" | Order details |
| `EmptyState` | Message + button when a list is empty | Cart, orders, search |
| `Loader` | "Loading..." text | Placing an order, app start |

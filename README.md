# CampusBites

**Pre-order food from your campus canteen and skip the queue.**

Breaks between classes are only 10–15 minutes, and most of that time goes on standing in the
canteen queue. CampusBites lets students browse every campus canteen's menu, order ahead for a
pickup time, track the order, and collect the food the moment it's ready.

> Milestone-1 MVP built with **Next.js**, **React Context** and **dummy data** (no backend).

## Inspiration

Inspired by **Snackpass** (listed on **Product Hunt**), an order-ahead pickup app used by college
students in the US. CampusBites is my own take on that idea for an Indian college canteen:
veg / non-veg labels, break-time pickup slots and pay at the counter.

## Features (MVP)

- **Landing page**: what the app does, how it works, campus canteens (open / closed), popular items
- **Menu**: search, **Veg only** toggle, filter by canteen and by category
  (Breakfast, Meals, Snacks, Beverages, Desserts)
- **Item details**: price, description, canteen, prep time, timings
- **Cart**: change quantities, remove items, choose a **pickup time**, add a note for the canteen,
  see subtotal + packing fee + total
- **One canteen per order**: adding a dish from another canteen shows a message, because you
  pick up from one counter
- **Mock login** with a demo account; you must be logged in to place an order
- **Confirm popup → loading → order tracking**: status moves on its own
  (Order placed → Preparing → Ready for pickup), simulated with timers
- **My Orders**: history of all orders with their status
- Data is saved in `localStorage`, so refreshing the page keeps the cart and orders

**Demo login:** `student@campus.edu` / `demo123` (or click **Use demo account**)

## Try it (demo walkthrough)

1. Home → **Order now**
2. Menu → search or filter, then click **Add** on a couple of dishes (the navbar shows `Cart (2)`)
3. Open **Cart** → pick a pickup time → **Login to place order** → **Use demo account** → **Login**
4. Back in the cart → **Place order** → **Confirm**
5. Watch the status change to **Preparing** (~15 s) and **Ready for pickup** (~45 s), then click
   **I've picked it up**
6. **My Orders** shows the order history

## Tech stack

Next.js (App Router) · React · JavaScript · Tailwind CSS · React Context · localStorage

## Architecture

```
Next.js (App Router)
   ↓
Pages            app/  (landing, login, menu, item details, cart, orders, order tracking)
   ↓
Components       components/  (Navbar, Button, Card, MenuItemCard, Modal, ...)
   ↓
React Context    context/  AuthContext · CartContext · OrderContext
   ↓
Dummy Data       data/  canteens.js · menu.js · users.js
```

- **AuthContext** holds the logged-in user (`login`, `logout`), checked against `data/users.js`.
- **CartContext** holds the cart items (`addToCart`, `updateQuantity`, `removeFromCart`,
  `clearCart`) and works out `totalItems` and `subtotal`.
- **OrderContext** holds the orders (`placeOrder`, `markPickedUp`) and works out each order's
  status from the time it was placed (`getOrderStatus`).
- All three providers wrap the app in `components/Providers.js`. Components read them with the
  custom hooks `useAuth()`, `useCart()` and `useOrders()`, which call `useContext` inside.
- Example of shared state: clicking **Add** in `MenuItemCard` updates CartContext, and the
  `Cart (n)` count in the `Navbar` updates straight away.

## Design

Kept **very simple** on purpose: white page, black text, thin grey borders and one orange
accent colour (`#EA580C`) for main buttons. One font (Inter). Menu, cart and orders are plain
lists. Full details: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Wireframes

- **FlutterFlow wireframes** (7 screens):
  [docs/wireframes/flutterflow/CampusBites-FlutterFlow-wireframes.pdf](docs/wireframes/flutterflow/CampusBites-FlutterFlow-wireframes.pdf)
- **User flow** and annotated sketch wireframes: [docs/wireframes/](docs/wireframes/)

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Explain the product, show canteens and popular items |
| `/login` | Login | Mock login, required to place an order |
| `/menu` | Menu | Browse, search and filter all dishes |
| `/menu/[id]` | Item details | Full info about one dish |
| `/cart` | Cart | Review items, choose pickup time, place order |
| `/orders` | My orders | List of active and past orders |
| `/orders/[id]` | Order tracking | Live status of one order |

## Project structure

```
campus-bites/
├── app/
│   ├── layout.js            # font, Providers, Navbar, Footer
│   ├── page.js              # Landing
│   ├── login/page.js        # Login
│   ├── menu/page.js         # Menu + filters
│   ├── menu/[id]/           # Item details
│   ├── cart/page.js         # Cart + checkout
│   ├── orders/page.js       # My orders
│   └── orders/[id]/         # Order tracking
├── components/              # reusable UI components
├── context/                 # React Context providers
├── data/                    # dummy data
├── lib/                     # small helpers / hooks
├── docs/wireframes/         # wireframes (FlutterFlow + sketches)
├── PRODUCT-ASSUMPTIONS.md
├── DESIGN-SYSTEM.md
└── README.md
```

## Run locally

Needs Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Not in this MVP

Real authentication, a backend or database, online payments, a canteen-staff dashboard and
notifications. These are the next steps. See [PRODUCT-ASSUMPTIONS.md](PRODUCT-ASSUMPTIONS.md).

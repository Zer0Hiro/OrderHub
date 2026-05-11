# OrderHub

A food order management dashboard built as part of a **Software Engineering Architecture** course project.

OrderHub aggregates incoming delivery orders from multiple providers — Wolt, TenBis, Mishloha, and manual entries — into a single interface, letting staff track, accept, complete, or cancel orders without switching between platforms.

---

## Overview

The project demonstrates a front-end architecture for a real-world business problem: restaurants that receive orders from several delivery services have no unified view. OrderHub solves this with a lightweight, browser-based dashboard requiring no backend or installation.

---

## Features

- **Multi-provider support** — Wolt, TenBis, Mishloha, and manual orders in one table
- **Order lifecycle management** — move orders through Incoming → Completed or Cancelled
- **Filter by provider** — quickly isolate orders from a specific delivery service
- **Create manual orders** — form with customer name, phone, items, address, total, and payment method
- **Simulate orders** — generate test orders for demo and development purposes
- **Customer contact** — call or message a customer directly from the order row
- **Tabbed views** — separate tabs for Incoming, Cancelled, and Completed orders
- **Persistent storage** — order data managed via `order_db.js`

---

## Project Structure

```
OrderHub/
├── index.html      # Main UI — layout, tables, order form, templates
├── order.js        # Order logic — actions, event handlers, UI updates
├── order_db.js     # Data layer — order storage and retrieval
├── style.css       # Styles
└── photos/         # Icons and assets
```

The architecture separates concerns across three layers: **presentation** (`index.html` + `style.css`), **business logic** (`order.js`), and **data** (`order_db.js`) — a pattern discussed in the SE Architecture course.

---

## Running Locally

No build step, no dependencies. Just open the file:

```bash
# Clone the repo
git clone https://github.com/Zer0Hiro/OrderHub.git
cd OrderHub

# Open in browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

---

## Supported Providers

| Provider | Type |
|---|---|
| Wolt | Delivery platform |
| TenBis | Delivery platform |
| Mishloha | Delivery platform |
| Manual | Direct / phone orders |

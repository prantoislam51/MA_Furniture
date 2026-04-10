# Noir Wood Luxury Furniture Shop

A complete Node.js + Express + EJS furniture e-commerce website designed with a bold, luxury dark theme.

## Tech Stack

- Node.js
- Express.js
- EJS
- Pure CSS (no framework)
- Vanilla JavaScript
- Google Fonts CDN
- Font Awesome CDN
- In-memory data from local files

## Project Structure

furniture-shop/
- server.js
- package.json
- data/
  - categories.js
  - products.js
- public/
  - css/
    - variables.css
    - reset.css
    - layout.css
    - components.css
    - pages.css
    - animations.css
    - responsive.css
  - js/
    - main.js
    - slider.js
    - search.js
    - modal.js
    - admin.js
- views/
  - partials/
    - head.ejs
    - header.ejs
    - footer.ejs
    - product-card.ejs
  - index.ejs
  - category.ejs
  - search.ejs
  - admin.ejs

## Features

- Cinematic hero slider with auto-play and touch support
- Luxury dark product cards with quick actions
- Category pages with filters and sorting
- Search page with live client-side filtering
- Product detail modal with image gallery, qty selector, and WhatsApp order link
- Recent viewed products in localStorage
- Admin dashboard with password gate
  - Username: admin
  - Password: admin2024
  - Add / edit / delete products via API
  - Export products/categories JSON
- Sticky header, mobile menu, reveal animations, counter animations

## API Routes

- GET /
- GET /category/:id
- GET /search
- GET /admin
- POST /api/product
- PUT /api/product/:id
- DELETE /api/product/:id

## Run Locally

1. Open terminal in furniture-shop folder
2. Install dependencies

npm install

3. Start server

npm start

4. Open in browser

http://localhost:3000

## Notes

- Data is in-memory at runtime. Restarting the server resets API mutations.
- Product dataset includes 56 products (7 per 8 categories).
- WhatsApp integration uses:
  - https://wa.me/8801700000000

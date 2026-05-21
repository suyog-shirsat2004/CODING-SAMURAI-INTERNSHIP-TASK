# Task 5: E-Commerce Website

## Description
A fully functional e-commerce website built with React featuring product listing, shopping cart functionality, and a complete checkout flow.

🔗 **Live Demo:** [https://suyog-shirsat2004.github.io/](https://suyog-shirsat2004.github.io/)

## Features
- **Product Listing**: Browse products fetched from FakeStoreAPI with search, category filtering, and sorting options
- **Product Details**: View detailed product information including ratings and descriptions
- **Shopping Cart**: Add, remove, and update product quantities with persistent localStorage
- **Checkout Flow**: Complete order form with validation for shipping and payment information
- **Order Confirmation**: Success page with order number after placing an order
- **Responsive Design**: Fully responsive layout for all screen sizes

## Technologies Used
- **React 19** - UI Library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Context API** - Global state management for cart
- **FakeStoreAPI** - Product data API

## Project Structure
```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with cart count
│   ├── Footer.jsx          # Site footer
│   ├── ProductCard.jsx     # Product card component
│   └── Loading.jsx         # Loading spinner
├── pages/
│   ├── Home.jsx            # Landing page with featured products
│   ├── Products.jsx        # Product listing with filters
│   ├── ProductDetail.jsx   # Individual product view
│   ├── Cart.jsx            # Shopping cart page
│   ├── Checkout.jsx        # Checkout form with validation
│   └── OrderSuccess.jsx    # Order confirmation page
├── context/
│   └── CartContext.jsx     # Cart state management
├── services/
│   └── productService.js   # API integration
├── styles/
│   ├── App.css             # Global styles
│   ├── Navbar.css
│   ├── Footer.css
│   ├── ProductCard.css
│   ├── Loading.css
│   ├── Home.css
│   ├── Products.css
│   ├── ProductDetail.css
│   ├── Cart.css
│   ├── Checkout.css
│   └── OrderSuccess.css
├── App.jsx                 # Main app with routing
└── main.jsx                # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Routes
- `/` - Home page with featured products
- `/products` - All products with filtering and sorting
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/order-success` - Order confirmation

## State Management
The application uses React Context API for cart state management:
- Cart items are persisted in localStorage
- Actions: ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART
- Utility functions: getCartTotal(), getCartCount()

## API Integration
Uses the FakeStoreAPI (https://fakestoreapi.com) for:
- Fetching all products
- Fetching product by ID
- Fetching product categories
- Fetching products by category

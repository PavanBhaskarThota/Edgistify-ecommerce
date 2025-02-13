# Edgistify

# E-Commerce Assignment Project

## Project Overview
This is a simple e-commerce project that allows users to log in, add products to their cart, manage product quantities, and proceed to checkout after providing an address. The project ensures secure authentication using JWT and bcrypt.

## Features
- **User Authentication**: Users must log in to access the shopping features.
- **Add to Cart**: Only logged-in users can add items to their cart.
- **Product List**: Displays available products. Users can update product quantities or remove items.
- **Cart Management**: Users can view their cart, modify product quantities, and remove items.
- **Checkout Process**: Users must fill out an address form before proceeding with the purchase.
- **Notifications**: Toast notifications for each key operation (e.g., login success, item added, checkout completed).

## Tech Stack
### Frontend:
- **React**
- **MUI (Material UI)**
- **React Toastify** (for notifications)

### Backend:
- **Node.js**
- **Express.js**
- **JWT & bcrypt** (for secure authentication)

### Database:
- **MongoDB** (using Mongoose for object modeling)

## Security Features
- Passwords are hashed using bcrypt before being stored.
- JWT is used for authentication, ensuring secure API access.
- Only logged-in users can modify the cart or proceed to checkout.

## Notifications
- **React hot toast** is used to show toast notifications for login status, cart actions, and order completion.


## Screenshots

### Login Page
![Home Page](https://i.ibb.co/BVTdSMq4/Screenshot-2025-02-13-161116.png)

### Product List
![Product List](https://i.ibb.co/xKjR8Tjd/Screenshot-2025-02-13-161325.png)

### Cart Page
![Cart Page](https://i.ibb.co/qMryHcgY/Screenshot-2025-02-13-161350.png)


### 📱 Mobile View  
<p align="center">
  <img src="https://i.ibb.co/Q3jfgJ97/Screenshot-2025-02-13-161515.png" width="30%" />
  <img src="https://i.ibb.co/fGz28krF/Screenshot-2025-02-13-161458.png" width="30%" />
  <img src="https://i.ibb.co/mC0yJXfn/Screenshot-2025-02-13-161430.png" width="30%" />
</p>





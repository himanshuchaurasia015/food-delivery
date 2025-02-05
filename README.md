# Food Delivery System

## Project Description

The Food Delivery System is a web application designed to streamline the process of ordering food online. Users can register and log in, browse a menu, add items to their cart, place orders, and view order history. Authentication is handled using cookies, ensuring secure access to protected routes.

### Key Features:

- **User Authentication**: Registration and login with JWT-based cookies.
- **Menu Management**: Create, read, update, and delete menu items with sorting and pagination.
- **Cart Functionality**: Add, update, and remove items with quantities.
- **Order Tracking**: Place orders and view order history.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Setup Instructions

### Backend

1. **Install Dependencies**:

   cd server
   npm install

2. **Environment Variables**:
   Create a `.env` file in the `server` directory with the following variables:

   PORT=5000
   MONGO_URI=<your_mongo_db_connection_string>
   JWT_SECRET=<your_jwt_secret>
   COOKIE_SECRET=<your_cookie_secret>

3. **Run the Server**:

   npm start

   The backend will run on `http://localhost:5000`.

### Frontend

1. **Install Dependencies**:

   cd client
   npm install

2. **Start the Development Server**:

   npm run dev

   The frontend will run on `http://localhost:5173`.

---

## Assumptions

- Users need to be authenticated to access the menu and order pages.
- JWT tokens are stored in cookies for secure session management.

## Challenges Faced

- **State Management**: Balancing global state between authentication and cart management required careful use of context.
- **Responsiveness**: Designing a responsive UI that works seamlessly across various screen sizes.

## Limitations

- **Admin Separation**: The app currently does not distinguish between admin and regular users.
- **Scalability**: Pagination is implemented, but infinite scrolling is not yet supported.
- **Search Functionality**: While menu sorting is available, full-text search is not yet implemented.

---

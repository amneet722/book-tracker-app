# 📚 Book Tracker App

A full-stack web application designed to help book lovers manage their reading journey, track progress, and discover new books efficiently.

## ✨ Features

* **User Authentication:** Secure user registration and login with JSON Web Tokens (JWT).
* **Personalized Dashboard:** A central hub to track your reading statistics and progress.
* **Book Management:**
    * Search and find books using the **Open Library API**.
    * Add books to your personal collection with statuses like "Read", "Currently Reading", or "Wishlist".
    * Edit book details, update reading progress, and change statuses.
    * Rate and review books you've read.
    * View book cover images.
* **Reading Progress Tracking:**
    * Set and monitor annual reading goals.
    * Visualize your progress with interactive charts (Goal Completion, Status Breakdown).
* **Dynamic Theming:** Seamlessly switch between light and dark modes for a personalized experience.
* **Responsive Design:** Optimized for various screen sizes, from desktops to mobile devices.

## 🚀 Tech Stack

### Frontend
* **React.js:** A JavaScript library for building user interfaces.
* **React Router DOM:** For declarative routing within the single-page application.
* **Axios:** Promise-based HTTP client for making API requests.
* **Recharts:** A composable charting library built on React for visualizing reading goals.
* **Chart.js:** Flexible charting library for displaying book status overview.
* **React Context API:** For global state management, particularly for theme toggling.
* **HTML5 & CSS3:** For structuring and styling the application.

### Backend
* **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
* **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
* **PostgreSQL:** A powerful, open-source relational database system.
* **bcryptjs:** Library to hash passwords securely.
* **jsonwebtoken (JWT):** For creating, signing, and verifying authentication tokens.
* **cors:** Node.js package for providing a Connect/Express middleware that can be used to enable CORS.
* **dotenv:** Loads environment variables from a `.env` file.

### Authentication
* **JSON Web Tokens (JWT):** For secure, stateless authentication between client and server.

## 📁 Folder Structure

The project is divided into two main parts: `client` (React frontend) and `server` (Node.js/Express backend).

.
├── client/                     # React Frontend Application
│   ├── public/                 # Static assets (index.html)
│   ├── src/                    # React source code
│   │   ├── api/                # Axios instance for API calls
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── components/         # Reusable UI components (Navbar, Footer, PrivateRoute, BookCard etc.)
│   │   ├── pages/              # Top-level components/views (Home, Dashboard, Login, Register)
│   │   ├── app.css             # Global CSS variables and base styles
│   │   ├── App.js              # Main React application component
│   │   └── index.js            # React entry point
│   ├── .env                    # Environment variables for client (e.g., API URLs)
│   ├── package.json
│   └── README.md
├── server/                     # Node.js/Express Backend API
│   ├── config/                 # Database configuration
│   ├── controllers/            # Logic for handling API requests
│   ├── middleware/             # Authentication middleware (e.g., auth.js)
│   ├── models/                 # Database models (e.g., user.js, book.js)
│   ├── routes/                 # API routes (e.g., auth.js, books.js)
│   ├── .env                    # Environment variables for server (e.g., DB credentials, JWT secret)
│   ├── server.js               # Main Express application file
│   ├── package.json
│   └── README.md
├── .gitignore                  # Specifies untracked files to ignore
├── README.md                   # This file
└── package.json                # Root package.json (if used for monorepo scripts)


## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/en/) (LTS version recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/download/)

### 1. Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/book-tracker-app.git](https://github.com/YOUR_USERNAME/book-tracker-app.git)
cd book-tracker-app
(Replace YOUR_USERNAME/book-tracker-app.git with the actual path to your GitHub repository.)

2. Install Dependencies
Navigate into both the client and server directories and install their dependencies:

Bash

# Install server dependencies
cd server
npm install # or yarn

# Install client dependencies
cd ../client
npm install # or yarn


3. Database Setup (PostgreSQL)
Make sure your PostgreSQL server is running.

Create a new database:

SQL
CREATE DATABASE book_tracker_db;
Run Migrations/Schema (if you have them): If your server directory has a database.sql file or migration scripts, you'll need to run them to set up tables. For example:
Bash

# From server directory
psql -U your_postgres_username -d book_tracker_db -f path/to/your/schema.sql
(Replace your_postgres_username and path/to/your/schema.sql accordingly.) Typical tables would include users and books.

4. Environment Variables
Create .env files in both the server and client directories:

server/.env

Code snippet

PORT=5000
DATABASE_URL="postgresql://your_postgres_username:your_postgres_password@localhost:5432/book_tracker_db"
JWT_SECRET="your_very_secret_jwt_key_here" # Change this to a strong, random string
client/.env

Code snippet

REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_OPEN_LIBRARY_API_URL=[https://openlibrary.org](https://openlibrary.org)
(Make sure to replace placeholder values with your actual PostgreSQL credentials and secure your JWT_SECRET.)

5. Run the Applications

Start the Backend Server
From the server directory:

Bash

npm start # or yarn start
The server should start on http://localhost:5000. You should see a message like "Book Tracker API Running..." in your terminal.

Start the Frontend Application
From the client directory:

Bash

npm start # or yarn start
This will open the React app in your browser at http://localhost:3000.

📖 Usage

Register: Navigate to /register to create a new account.
Login: Use your credentials to log in at /login.
Dashboard: After logging in, you'll be redirected to your personalized dashboard where you can:
Set and track reading goals.
View your book statistics.
Add new books by searching the Open Library database.
Manage your existing books (edit details, update status, add ratings/reviews).
Theme Toggle: Use the "Light/Dark" button in the Navbar to switch between themes.




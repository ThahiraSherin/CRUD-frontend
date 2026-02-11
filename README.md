🚀 Lead Management System – Frontend
📁 Repository

CRUD-frontend

🎯 Project Description

This is the frontend application for the Lead Management System, built using React and Vite.
It provides a clean, responsive user interface to manage customer leads with full CRUD operations and JWT-based authentication.

The frontend communicates securely with the backend REST API using Axios.

🛠 Tech Stack

React.js

Vite

Axios

Tailwind CSS

JavaScript (ES6+)

HTML5 & CSS3

✨ Features

User Login & Logout

JWT-based authentication

Create, edit, and delete leads

View leads in a table format

Form validation

Axios interceptor for token handling

Responsive UI using Tailwind CSS

📂 Project Structure
CRUD-frontend/
│
├── src/
│   ├── components/
│   │   └── LeadForm.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Leads.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js

⚙️ Setup & Installation (Vite)
1️⃣ Create Vite Project

npm create vite@latest CRUD-frontend
cd CRUD-frontend


Select:

Framework: React

Variant: JavaScript

2️⃣ Install Dependencies
npm install

3️⃣ Install Required Packages
npm install axios react-router

4️⃣ Tailwind CSS Setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Add Tailwind directives in index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;

🔧 API Configuration (src/services/api.js)
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

▶️ How to Run the Frontend
npm run dev

🌐 Application Runs At
http://localhost:5173

🔐 Authentication Flow

User logs in

Backend returns JWT token

Token stored in localStorage

Axios interceptor sends token in headers

Protected routes access enabled

Logout clears token and redirects user

📸 UI Highlights

Clean Lead Form

Editable Lead Table

Login & Register pages

Logout button

Fully responsive Tailwind UI

🔗 Backend Dependency

Make sure the backend server is running at:

http://localhost:3001

👩‍💻 Author

Thahira Sherin
MERN Stack Developer
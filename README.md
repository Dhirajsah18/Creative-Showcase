#  Creative Showcase

Creative Showcase is a full-stack web application that allows users to upload, explore, and showcase creative images in a visually appealing **masonry (mosaic) layout**, similar to platforms like Pinterest or Unsplash.

It supports **public user profiles**, **random image discovery**, and a **personal dashboard** for managing uploads.

---

## Features
### Public Features
- Landing page with **randomly displayed images**
- Pinterest-style **masonry / mosaic gallery**
- **Public user profiles** accessible via `/profile/:username`
- View all images uploaded by a specific user
- Fully responsive design

### 🔐 Authenticated Features
- User authentication (Signup / Login)
- Personal dashboard
- Upload images
- Delete uploaded images
- View image dimensions
- Secure JWT-based access

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (Image Upload)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📸 Screenshots

### Landing Page
![Landing-page](https://github.com/user-attachments/assets/6b540717-d58d-4d2b-abda-09d86b12c848)


### Dashboard
![Dashboard](https://github.com/user-attachments/assets/e59e9552-a651-4acf-8e0a-bbbb0a813dca)


---

### PREREQUISITES

Before running this project locally, ensure the following software is installed
on your system:

- Node.js (version 18 or later recommended)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas)
- Git

You can verify installation using:

node -v
npm -v
git --version

---

## 📁 Project Structure

```
Creative_Showcase/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── index.js
│   ├── uploads/
│   └── package.json
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── utils/
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

### BACKEND INSTALLATION & EXECUTION

1. Clone the repository

git clone https://github.com/your-username/creative-showcase.git
cd creative-showcase/server

2. Install backend dependencies

npm install

3. Configure environment variables

Create a file named .env inside the server folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000

Note:
- Do not commit the .env file to GitHub.
- MongoDB Atlas connection strings are recommended.

4. Create uploads directory (required)

mkdir uploads

This folder is used to store uploaded images locally.

5. Start the backend server

npm run dev

If successful, the backend will run at:

http://localhost:8000


### FRONTEND INSTALLATION & EXECUTION

6. Open a new terminal and navigate to frontend

cd ../client

7. Install frontend dependencies

npm install

8. Configure frontend environment variables

Create a file named .env inside the client folder and add:

VITE_API_BASE_URL=http://localhost:5000

This connects the frontend to the backend API.

9. Start the frontend development server

npm run dev

If successful, the frontend will run at:

http://localhost:5173


### Author

Dhiraj Kumar Sah

---


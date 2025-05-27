# Blogging Web Application

A modern, full-stack blogging platform built with React, Node.js, and MongoDB. This application allows users to create, read, update, and delete blog posts, interact with other users through comments and likes, and manage their profiles.

## Features

- 🔐 User Authentication (Register, Login, Logout)
- 📝 Create, Read, Update, and Delete Blog Posts
- 💬 Comment System
- ❤️ Like/Unlike Posts
- 👤 User Profiles with Statistics
- 🖼️ Profile Image Upload
- 📱 Responsive Design
- 🔍 Search Functionality
- 🏷️ Tag System for Posts

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Bcrypt for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Muslim04/bloggingWebApp.git
cd bloggingWebApp
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_app
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
bloggingWebApp/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── context/       # Context providers
│       ├── pages/         # Page components
│       └── types/         # TypeScript types
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── uploads/          # Uploaded files
```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get user profile

### Posts
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create a new post
- GET `/api/posts/:id` - Get a specific post
- PUT `/api/posts/:id` - Update a post
- DELETE `/api/posts/:id` - Delete a post
- PUT `/api/posts/:id/like` - Like/Unlike a post

### Comments
- GET `/api/posts/:id/comments` - Get comments for a post
- POST `/api/posts/:id/comments` - Add a comment
- DELETE `/api/comments/:id` - Delete a comment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/Muslim04/bloggingWebApp](https://github.com/Muslim04/bloggingWebApp)

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/) 
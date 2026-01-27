# Contact Manager - CM+

A modern, full-stack contact management application built with **React**, **Node.js**, **Express**, and **MongoDB**. Manage your contacts efficiently with user authentication, intuitive UI, and real-time updates.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### User Management
- **User Registration** - Create new user accounts with validation
- **User Login** - Secure authentication with JWT tokens
- **Password Security** - Passwords hashed with bcrypt
- **Token-based Authentication** - JWT for secure API access

### Contact Management
- **Create Contacts** - Add new contacts with details
- **Read Contacts** - View all your contacts
- **Update Contacts** - Edit contact information
- **Delete Contacts** - Remove contacts
- **Protected Routes** - Only authenticated users can access contacts

### UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Components** - Built with Radix UI and Tailwind CSS
- **Dark Mode Support** - Theme switching capability
- **Toast Notifications** - Real-time feedback with Sonner
- **Icon Library** - Lucide React icons for intuitive interface

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Middleware**: Morgan (logging), CORS
- **Testing**: Node test runner

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **HTTP Client**: Axios
- **Theme**: next-themes
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Linting**: ESLint

### DevOps
- **Package Manager**: npm (workspaces)
- **Concurrent Development**: concurrently
- **Development Server**: Nodemon

---

## 📁 Project Structure

```
contact_manager/
├── backend/
│   ├── config/
│   │   └── dbConnection.js          # MongoDB connection
│   ├── controllers/
│   │   ├── contactController.js     # Contact CRUD logic
│   │   └── userController.js        # User auth logic
│   ├── middleware/
│   │   ├── errorHandler.js          # Global error handling
│   │   └── validateTokenHandler.js  # JWT verification
│   ├── models/
│   │   ├── contactModel.js          # Contact schema
│   │   └── userModel.js             # User schema
│   ├── routes/
│   │   ├── contactRoutes.js         # Contact endpoints
│   │   └── userRoutes.js            # User endpoints
│   ├── tests/
│   │   └── integration.test.js      # Integration tests
│   ├── constants.js                 # HTTP status codes
│   ├── server.js                    # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── apiClient.js         # Axios instance
│   │   │   ├── authService.js       # Auth API calls
│   │   │   └── contactService.js    # Contact API calls
│   │   ├── components/
│   │   │   ├── login-form.jsx       # Reusable auth form
│   │   │   ├── common/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── ui/                  # Radix/shadcn components
│   │   ├── context/
│   │   │   └── authContext.jsx      # Global auth state
│   │   ├── hooks/
│   │   │   └── useAuth.js           # Auth hook
│   │   ├── lib/
│   │   │   └── utils.js             # Utility functions
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Profile.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx        # Route configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── eslint.config.js
│   ├── jsconfig.json
│   └── package.json
│
├── package.json                     # Root workspace config
└── README.md

```

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/spiceyourcode/contact_manager.git
cd contact_manager
```

### 2. Install Dependencies

Install dependencies for all workspaces (backend and frontend):

```bash
npm install
```

This command installs:
- Root dependencies (concurrently)
- Backend dependencies
- Frontend dependencies

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/contact_manager
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact_manager

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Environment
NODE_ENV=development
```

### Frontend Configuration

Create a `.env.local` file in the `frontend/` directory (if needed):

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Application

### Development Mode (Both Frontend & Backend)

Run both backend and frontend simultaneously:

```bash
npm run dev
```

- **Backend**: Runs on `http://localhost:5000`
- **Frontend**: Runs on `http://localhost:5173`

### Backend Only

```bash
npm run dev -w backend
```

### Frontend Only

```bash
npm run dev -w frontend
```

### Production Build

```bash
npm run build
```

### Testing

```bash
npm test
```

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/users/register` | Register new user | ❌ |
| POST | `/api/users/login` | Login user | ❌ |
| GET | `/api/users/profile` | Get user profile | ✅ |
| PUT | `/api/users/update` | Update user info | ✅ |

### Contact Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/contacts` | Get all contacts | ✅ |
| GET | `/api/contacts/:id` | Get single contact | ✅ |
| POST | `/api/contacts` | Create contact | ✅ |
| PUT | `/api/contacts/:id` | Update contact | ✅ |
| DELETE | `/api/contacts/:id` | Delete contact | ✅ |

### Request/Response Examples

#### Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Create Contact
```bash
POST /api/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Tech Corp"
}

Response:
{
  "message": "Contact created",
  "contact": {
    "id": "...",
    "userId": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1 (555) 123-4567",
    "company": "Tech Corp",
    "createdAt": "2026-01-27T...",
    "updatedAt": "2026-01-27T..."
  }
}
```

---

## 🏗️ Project Architecture

### Authentication Flow

```
User Registration/Login
        ↓
    Backend validates credentials
        ↓
    JWT token generated
        ↓
    Token stored in localStorage
        ↓
    Frontend includes token in API requests
        ↓
    Backend validates token via middleware
        ↓
    Request processed/rejected
```

### Component Architecture

```
App
├── AuthProvider (Context)
├── BrowserRouter
│   └── AppRoutes
│       ├── Login (Public)
│       ├── Register (Public)
│       ├── ProtectedRoute
│       │   ├── Home
│       │   ├── Contacts
│       │   └── Profile
│       └── 404 (Not Found)
└── Toaster (Toast notifications)
```

### State Management

- **Global**: `AuthContext` - User authentication state
- **Local**: Component state with `useState`
- **API Cache**: Handled through service modules

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **CORS Protection** - Restricted origins
- **Protected Routes** - Unauthorized access prevention
- **Token Validation** - Middleware-based verification
- **Error Handling** - Centralized error management

---

## 📝 Available Scripts

### Root Level

```bash
npm run dev          # Run both backend and frontend
npm run start        # Start backend only
npm run build        # Build frontend for production
npm test             # Run tests
```

### Backend Specific

```bash
npm run dev -w backend      # Start backend with nodemon
npm run start -w backend    # Start backend production
npm test -w backend         # Run backend tests
```

### Frontend Specific

```bash
npm run dev -w frontend     # Start frontend dev server
npm run build -w frontend   # Build frontend
npm run lint -w frontend    # Run ESLint
npm run preview -w frontend # Preview production build
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas credentials are correct
- Check `MONGODB_URI` in `.env`
- Verify firewall/network settings

### CORS Errors
- Verify frontend URL is in backend CORS whitelist
- Check that origins match exactly (http vs https, port number)

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Token Expired
- Tokens expire after a set duration
- User needs to login again
- Consider implementing refresh tokens for better UX

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [JWT Guide](https://jwt.io/introduction)

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👤 Author

**spiceyourcode** - [GitHub](https://github.com/spiceyourcode)

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/spiceyourcode/contact_manager/issues).

---

## 🎯 Future Enhancements

- [ ] Contact groups/categories
- [ ] Import/Export contacts (CSV, vCard)
- [ ] Search and filtering
- [ ] Contact photo uploads
- [ ] Two-factor authentication (2FA)
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] API documentation (Swagger)
- [ ] Rate limiting
- [ ] Contact sharing/collaboration

---

**Last Updated**: January 27, 2026
**Version**: 1.0.0

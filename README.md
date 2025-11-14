# Role-Based Authentication Application

A full-stack web application with role-based authentication, built with Next.js and Express. This project demonstrates secure authentication flows, protected routes and a clean, modern UI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure Details](#project-structure-details)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This application provides a complete authentication system with role-based access control. Users can sign up as either a **User** or **Admin**, log in securely, and access a protected dashboard that displays personalized content based on their role.

### Key Highlights

- 🔐 Secure JWT-based authentication with HTTP-only cookies
- 👥 Role-based access control (User/Admin)
- 🎨 Modern, minimal UI with dark/light theme support
- 🛡️ Protected routes and middleware
- ✅ Form validation with Zod
- 🚀 Production-ready deployment setup

## ✨ Features

### Core Features

- **User Authentication**
  - Signup with role selection (User or Admin)
  - Secure login with email and password
  - Password hashing with bcrypt (10 salt rounds)
  - JWT token-based authentication
  - Automatic session management

- **Dashboard**
  - Role-based welcome message
  - Protected route (accessible only when authenticated)
  - User information display
  - Logout functionality

- **UI/UX**
  - Clean, minimal design
  - Dark and light theme toggle
  - Responsive design
  - Loading states with skeleton screens
  - Toast notifications for user feedback

### Optional Enhancements Implemented

- ✅ Logout functionality
- ✅ Form validation with Zod (frontend and backend)
- ✅ Theme toggle (dark/light mode)
- ✅ Loading states and error handling
- ✅ Protected route middleware

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Security**: HTTP-only cookies, CORS

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: ShadCN UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod resolver
- **HTTP Client**: Axios
- **Theme**: next-themes

## 📁 Project Structure

```
InbotiqAssignment/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & error middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Zod schemas
│   │   └── types/           # TypeScript type definitions
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
├── frontend/
│   ├── app/                 # Next.js app directory
│   │   ├── login/           # Login page
│   │   ├── signup/          # Signup page
│   │   ├── dashboard/       # Dashboard page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── ui/              # ShadCN UI components
│   │   ├── Header.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/                 # Utilities and helpers
│   │   ├── api.ts           # API client
│   │   ├── store/           # Zustand stores
│   │   └── validators/      # Zod schemas
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL database** (Supabase, Neon, or local instance)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/akshatbajetha/inbotiq-assignment
cd InbotiqAssignment
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables (see Environment Variables section)
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma Client
npx prisma generate

npx prisma db push

# Build TypeScript
npm run build
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend API URL
```


## ▶️ Running the Project

### Development Mode

**Backend:**
```bash
cd backend
npm run start
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# Application runs on http://localhost:3000
```

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📡 API Documentation

### Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://role-base-auth-backend.onrender.com`

### Authentication Endpoints

All endpoints are prefixed with `/api/auth`.

#### POST `/api/auth/signup`

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "USER" // or "ADMIN"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation error
- `409`: User with email already exists

#### POST `/api/auth/login`

Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

**Error Responses:**
- `400`: Validation error
- `401`: Invalid email or password

#### GET `/api/auth/me`

Get current authenticated user information.

**Headers:**
- Cookie: `auth_token` (automatically sent by browser)

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

**Error Responses:**
- `401`: Authentication required

#### POST `/api/auth/logout`

Logout the current user.

**Headers:**
- Cookie: `auth_token` (automatically sent by browser)

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

## 🚢 Deployment

The application is deployed and publicly accessible:

- **Backend**: Deployed on [Render.com](https://render.com) at [https://role-base-auth-backend.onrender.com](https://role-base-auth-backend.onrender.com)
- **Frontend**: Deployed on [Vercel](https://vercel.com) at [https://role-based-auth-inbotiq.vercel.app](https://role-based-auth-inbotiq.vercel.app)

## 📂 Project Structure Details

### Backend Architecture

```
backend/src/
├── config/
│   └── env.ts              # Environment variable validation with Zod
├── controllers/
│   └── auth.controller.ts  # Request handlers for auth endpoints
├── middleware/
│   ├── authMiddleware.ts   # JWT verification middleware
│   └── errorHandler.ts     # Global error handling
├── routes/
│   └── auth.routes.ts      # Route definitions
├── services/
│   └── auth.service.ts     # Business logic (user creation, validation)
├── utils/
│   ├── AppError.ts         # Custom error class
│   ├── cookies.ts          # Cookie management utilities
│   ├── db.ts               # Prisma client instance
│   └── jwt.ts              # JWT signing and verification
├── validators/
│   └── authSchemas.ts      # Zod validation schemas
└── types/
    └── express.d.ts        # Express Request type extensions
```

### Frontend Architecture

```
frontend/
├── app/
│   ├── login/page.tsx      # Login page component
│   ├── signup/page.tsx     # Signup page component
│   ├── dashboard/page.tsx  # Protected dashboard page
│   └── layout.tsx          # Root layout with theme provider
├── components/
│   ├── Header.tsx           # Global header with logout
│   ├── ProtectedRoute.tsx  # Route protection wrapper
│   ├── ThemeToggle.tsx     # Dark/light theme toggle
│   └── ui/                  # ShadCN UI components
└── lib/
    ├── api.ts               # Axios API client
    ├── store/
    │   └── authStore.ts     # Zustand authentication store
    └── validators/
        └── auth.ts          # Zod validation schemas
```

## 🔒 Security Features

### Backend Security

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token generation with expiration
- **HTTP-Only Cookies**: Prevents XSS attacks
- **CORS Configuration**: Restricts origins to frontend URL
- **Input Validation**: Zod schemas validate all inputs
- **Error Handling**: No sensitive information leaked in errors
- **Environment Variables**: Validated on startup

### Frontend Security

- **Protected Routes**: Authentication check before rendering
- **Secure Cookie Handling**: Cookies managed by browser
- **Input Validation**: Client-side validation with Zod
- **Type Safety**: TypeScript throughout
- **Error Handling**: User-friendly error messages

## 🧪 Testing

### Manual Testing Checklist

- [ ] User signup with USER role
- [ ] User signup with ADMIN role
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access dashboard when authenticated
- [ ] Redirect to login when not authenticated
- [ ] Logout functionality
- [ ] Theme toggle (dark/light)
- [ ] Protected route access
- [ ] Form validation errors

## 📊 Assignment Requirements Fulfilled

This project fulfills all mandatory requirements for the Full-Stack Mini Project Assignment:

### ✅ Core Requirements

1. **Authentication with Roles**
   - ✅ Signup page with role selection (User or Admin)
   - ✅ Login page
   - ✅ Secure password storage using bcrypt
   - ✅ JWT-based authentication

2. **Dashboard**
   - ✅ Automatic redirect to dashboard after login
   - ✅ Dashboard displays: "Welcome, [Name] (User)" or "Welcome, [Name] (Admin)"
   - ✅ Same page with different header text based on role
   - ✅ Protected route (accessible only when logged in)

3. **Deployment**
   - ✅ Frontend deployed on Vercel
   - ✅ Backend deployed on Render
   - ✅ `.env.example` files included

### ✅ Technical Stack Requirements

**Backend:**
- ✅ Node.js with Express
- ✅ PostgreSQL with Prisma (Supabase)
- ✅ Password hashing: bcrypt
- ✅ Auth: JWT-based
- ✅ Required endpoints: POST `/api/auth/signup`, POST `/api/auth/login`, GET `/api/auth/me`

**Frontend:**
- ✅ Next.js with TypeScript
- ✅ ShadCN UI and TailwindCSS
- ✅ Form handling: react-hook-form
- ✅ Required pages: Signup, Login, Dashboard (protected route)

### ✅ Optional Enhancements Implemented

- ✅ Logout functionality
- ✅ Form validation with Zod (frontend and backend)
- ✅ Theme toggle (dark/light mode)
- ✅ Loading states and error handling
- ✅ Protected route middleware

## 🔗 Live Deployment

- **Backend**: [https://role-base-auth-backend.onrender.com](https://role-base-auth-backend.onrender.com) (deployed on Render.com)
- **Frontend**: [https://role-based-auth-inbotiq.vercel.app](https://role-based-auth-inbotiq.vercel.app) (deployed on Vercel)

## 📚 Implementation Highlights

### Architecture Decisions

1. **JWT with HTTP-Only Cookies**: Chosen for enhanced security compared to localStorage, preventing XSS attacks
2. **Zustand for State Management**: Lightweight solution for authentication state management
3. **ShadCN UI**: Provides accessible, customizable components with excellent TypeScript support
4. **Zod Validation**: Type-safe validation ensuring consistency between frontend and backend
5. **Environment Validation**: Zod-based validation ensures all required environment variables are present at startup

### Code Organization

- **Backend**: MVC-like structure with clear separation (routes → controllers → services → database)
- **Frontend**: Component-based architecture with reusable UI components
- **Type Safety**: TypeScript throughout for better developer experience and fewer runtime errors
- **Error Handling**: Centralized error handling middleware with consistent error responses

## 🎓 Learning Outcomes

This assignment demonstrates proficiency in:

- Full-stack development (frontend + backend integration)
- Authentication and authorization implementation
- Database design and ORM usage (Prisma)
- API design and RESTful principles
- Deployment and DevOps practices (Vercel, Render)
- Code organization and best practices
- Security considerations (password hashing, JWT, HTTP-only cookies, CORS)
- TypeScript and type safety
- Modern React patterns (Next.js App Router, hooks, state management)

## 🙏 Technologies & Libraries

- [Next.js](https://nextjs.org/) - React framework for production
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js
- [ShadCN UI](https://ui.shadcn.com/) - Beautifully designed components
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [React Hook Form](https://react-hook-form.com/) - Performant form library
- [Supabase](https://supabase.com/) - PostgreSQL hosting

---

**Assignment Submission**: This project was completed as part of the Full-Stack Mini Project Assignment, demonstrating proficiency in full-stack development, authentication systems, and deployment practices.

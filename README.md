## Description

# 🚀 NestJS Authentication API

## 📌 Project Overview
This project is a **NestJS-based authentication API** that provides user authentication, JWT-based authorization, and refresh token functionality. It includes:
- **User Registration & Login**
- **JWT Access & Refresh Token Mechanism**
- **Role-Based Access Control (RBAC)**
- **Swagger API Documentation**

---

## 🔧 Setup & Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/pareshnaik96/nestjs-user-backend.git
cd nestjs-user-backend
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the project root and add the required environment variables:
```sh
DATABASE_URL=postgresql://postgres:Paresh@25@localhost:5432/user_db

```

### **4. Set Up Database**
Run the following commands to set up the database schema using Prisma:
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### **5. Start the Server**
```sh
npm run start:dev
```

The API will be available at `http://localhost:3000`

---

## 📌 API Endpoints
### **Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and get JWT + Refresh Token |
| `POST` | `/auth/refresh-token` | Refresh the access token |

### **User Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/profile` | Get user details |

### **Admin Routes (Requires Admin Role)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/users` | Get all registered users |

---

## 🏗 Architecture & Design Decisions
### **1. NestJS Modules & Services**
- **AuthModule** → Handles authentication and JWT token management.
- **UserModule** → Manages user-related operations.
- **PrismaModule** → Interacts with the database using Prisma ORM.

### **2. Role-Based Access Control (RBAC)**
Implemented using custom **Guards** that check the user’s role before accessing certain routes.

### **3. JWT Authentication with Refresh Tokens**
- **Access Token**: Short-lived token (`15m` expiration) used for API requests.
- **Refresh Token**: Long-lived token (`7d` expiration) used to obtain a new access token.

### **4. Prisma ORM for Database Management**
- Uses **PostgreSQL** as the database.

---

## 📜 Swagger API Documentation
This project uses **Swagger** for API documentation.
You can access the API docs at:
📌 `http://localhost:3000/api`

### **Example Screenshots:**


---






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
### **Register User**
![admin_register-1](https://github.com/user-attachments/assets/b94866ef-43af-4009-bccb-4cbb6d29cdca)

![admin_register-2](https://github.com/user-attachments/assets/b74a34be-5d9f-430f-840d-3c9dd401369b)

### **Login User**
![login-3](https://github.com/user-attachments/assets/c12fd08d-1b3e-4960-a2c9-169abb8e53d0)


### **User**
![get-user-7](https://github.com/user-attachments/assets/956d22e4-2e86-4b46-94dd-d497f5ee2f68)


### **Admin**
![get-all-user-8](https://github.com/user-attachments/assets/ba295766-8420-4192-b425-d105875e7bd9)

---






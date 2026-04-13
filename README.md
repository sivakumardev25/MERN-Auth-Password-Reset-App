## 📄 Summary

This project is a full-stack authentication system that implements secure user registration and login using JWT, along with a complete password reset flow via email verification. The system generates a time-limited reset token, sends it to the user’s email, and allows password updates only after proper validation. Built using the MERN stack (MongoDB, Express, React, Node.js), with responsive UI using Bootstrap.
A full-stack authentication system that allows users to register, login, and securely reset their password via email using a token-based workflow.

## 🚀 Short Description (For GitHub subtitle)

JWT Auth + Password Reset (MERN Stack)
Secure Login System with Email Reset Flow
Full-Stack Auth System with Token-Based Reset

## 🎯 Features Section (Add in README)

🔐 JWT-based Authentication (Login/Register)
📧 Email-based Password Reset
⏳ Token Expiry for Security
🔑 Secure Password Hashing (bcrypt)
⚛️ React + Bootstrap UI
🌐 REST API using Node.js & Express
🗄️ MongoDB Database

## 🛠️ Tech Stack

🖥️ Frontend

React.js
Bootstrap
Axios
React Router

⚙️ Backend

Node.js
Express.js
MongoDB (Mongoose)
JWT (JSON Web Token)
bcryptjs (Password hashing)
dotenv
Nodemailer (Email Service)
Postman (API Testing)

## 📡 API Endpoints

Register user - /api/auth/register
Login user - /api/auth/login
Send reset email - /api/auth/forgot-password
Reset password - /api/auth/reset-password/:token

## 🔐 Authentication Flow

User registers / logs in
Clicks Forgot Password
Receives email with reset link
Clicks link → opens reset page
Sets new password
Token is verified and password updated

## 📧 Email Configuration (Gmail)

Enable 2-Step Verification
Generate App Password
Use in .env:
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_digit_app_password

## ⚠️ Common Issues & Fixes

❌ Network Error
Ensure backend is running on correct port

❌ Token Invalid
Check token expiry time

❌ Email not sent
Verify Gmail app password

❌ CORS issue
Configure CORS in backend

## 🌍 Deployment (Recommended)

Push project to GitHub
Deploy using Render
Add environment variables in Render dashboard

Backend → Render
Frontend → Netlify

## github:

https://github.com/sivakumardev25/MERN-Auth-Password-Reset-App/

## Render

Render deployed URL : https://mern-auth-password-reset-app.onrender.com/

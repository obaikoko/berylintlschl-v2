# Beryl International School Management System

A comprehensive, modern school management system built with Next.js, TypeScript, and Node.js. This system provides a complete solution for managing students, staff, results, events, and administrative tasks for educational institutions.

## 🏫 Overview

Beryl International School Management System is a full-stack web application designed to streamline school operations, enhance communication between stakeholders, and provide a seamless experience for administrators, teachers, students, and parents.

## ✨ Features

### 🎯 Core Features

- **Multi-Role Authentication System** (Admin, Teacher, Student)
- **Student Management** - Registration, profiles, academic records
- **Staff Management** - Teacher profiles, qualifications, assignments
- **Result Management** - Grade tracking, report generation, PDF exports
- **Event Management** - School events, announcements, calendar
- **Admission Management** - Application processing, enrollment tracking
- **Academic Planning** - Scheme of work, timetables, curriculum management
- **Communication Tools** - Announcements, notifications, email integration

### 🎨 User Interface

- **Modern, Responsive Design** - Works on all devices
- **Dark/Light Mode** - User preference support
- **Smooth Animations** - Enhanced user experience with Framer Motion
- **Accessible Design** - WCAG compliant components
- **Real-time Updates** - Live data synchronization

### 🔧 Technical Features

- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **Prisma ORM** - Database management
- **MongoDB** - Scalable NoSQL database
- **Cloudinary** - Image and file storage
- **JWT Authentication** - Secure user sessions
- **PDF Generation** - Report and document creation

## 🏗️ Architecture

```
berylintlschl-v2/
├── client/                 # Next.js Frontend
│   ├── app/               # App Router pages
│   ├── components/        # Reusable UI components
│   ├── src/              # Redux store and API slices
│   └── schemas/          # Zod validation schemas
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Authentication & validation
│   │   ├── routes/       # API endpoints
│   │   └── services/     # Business logic
│   └── prisma/          # Database schema
└── docs/                # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd berylintlschl-v2
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   Create `.env` files in both `backend/` and `client/` directories:

   **Backend (.env)**

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   PORT=5000
   ```

   **Client (.env.local)**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Database Setup**

   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

5. **Run the application**

   ```bash
   # Start backend server
   cd backend
   npm run server

   # Start frontend (in new terminal)
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 👥 User Roles & Access

### 🏢 Administrator

- Full system access
- User management (create, edit, delete)
- System configuration
- Data analytics and reports
- School-wide announcements

### 👨‍🏫 Teacher/Staff

- Student management
- Result entry and management
- Scheme of work creation
- Timetable management
- Class-specific announcements

### 👨‍🎓 Student

- View personal information
- Access academic results
- View timetables and events
- Download reports

## 📱 Key Pages & Features

### Public Pages

- **Homepage** - School information and services
- **About** - School history and mission
- **Events** - School events and activities
- **Admission** - Online application form
- **Gallery** - School photos and media

### Admin Dashboard

- **Dashboard** - Overview and analytics
- **Students** - Student management
- **Staff** - Staff management
- **Results** - Academic result management
- **Events** - Event management
- **Announcements** - Communication tools

### Teacher Dashboard

- **Dashboard** - Class overview
- **Students** - Class student list
- **Results** - Grade entry and management
- **Scheme of Work** - Curriculum planning
- **Timetable** - Class schedules

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **MongoDB** - Database
- **JWT** - Authentication
- **Cloudinary** - File storage
- **Nodemailer** - Email service

## 📚 Documentation

- [User Guide](./docs/USER_GUIDE.md) - Complete user manual
- [API Documentation](./docs/API_DOCUMENTATION.md) - Backend API reference
- [Development Guide](./docs/DEVELOPMENT_GUIDE.md) - Developer documentation
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md) - Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in the `docs/` folder

## 🔄 Version History

- **v2.0.0** - Complete rewrite with Next.js 15 and modern architecture
- **v1.0.0** - Initial release with basic features

---

**Built with ❤️ for educational excellence**

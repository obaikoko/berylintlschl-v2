# Development Guide - Beryl International School Management System

This guide provides comprehensive information for developers working on the Beryl International School Management System, including setup, architecture, coding standards, and best practices.

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Environment](#development-environment)
4. [Coding Standards](#coding-standards)
5. [Frontend Development](#frontend-development)
6. [Backend Development](#backend-development)
7. [Database Management](#database-management)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or cloud)
- Git
- VS Code (recommended)

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd berylintlschl-v2

# Install dependencies
cd backend && npm install
cd ../client && npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp client/.env.example client/.env.local

# Start development servers
cd backend && npm run server
cd ../client && npm run dev
```

## 🏗️ Project Structure

```
berylintlschl-v2/
├── client/                     # Next.js Frontend
│   ├── app/                   # App Router (Next.js 15)
│   │   ├── (admin)/          # Admin routes
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (root)/           # Public routes
│   │   ├── (student)/        # Student routes
│   │   └── (user)/           # Teacher routes
│   ├── components/           # Reusable components
│   │   ├── shared/          # Shared components
│   │   └── ui/              # UI components (shadcn/ui)
│   ├── src/                 # Redux store and API
│   │   ├── app/            # Redux store configuration
│   │   └── features/       # Redux slices
│   ├── schemas/            # Zod validation schemas
│   ├── validators/         # Form validation
│   └── types/              # TypeScript type definitions
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── validators/     # Request validation
│   ├── prisma/            # Database schema
│   └── config/            # Configuration files
└── docs/                  # Documentation
```

## 🛠️ Development Environment

### Environment Variables

**Backend (.env)**

```env
# Database
MONGO_URI=mongodb://localhost:27017/beryl_school

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

**Client (.env.local)**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Beryl International School
```

### Development Scripts

**Backend**

```bash
npm run server      # Start development server with hot reload
npm run build       # Build for production
npm run start       # Start production server
npm run db:generate # Generate Prisma client
npm run db:push     # Push schema to database
npm run db:studio   # Open Prisma Studio
```

**Frontend**

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

## 📝 Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use type guards for runtime type checking
- Avoid `any` type - use `unknown` instead

### Naming Conventions

- **Files**: kebab-case (`user-controller.ts`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces**: PascalCase with `I` prefix (`IUser`)

### Code Organization

```typescript
// File structure
import React from 'react';
import { useState, useEffect } from 'react';

// Types
interface Props {
  // ...
}

// Component
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    // JSX
  );
};
```

### Error Handling

```typescript
// Backend
try {
  const result = await someAsyncOperation();
  return res.json({ success: true, data: result });
} catch (error) {
  console.error("Error:", error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

// Frontend
try {
  const response = await apiCall();
  setData(response.data);
} catch (error) {
  console.error("Error:", error);
  toast.error("Something went wrong");
}
```

## 🎨 Frontend Development

### Component Structure

```typescript
// components/shared/students/StudentCard.tsx
"use client";

import { useState } from "react";
import { Student } from "@/types/student";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    onEdit?.(student);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    setIsLoading(true);
    try {
      await onDelete?.(student.id);
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">{/* Component content */}</CardContent>
    </Card>
  );
};
```

### Redux Toolkit Usage

```typescript
// src/features/students/studentApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Student } from "@/types/student";

export const studentApiSlice = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "students",
      providesTags: ["Student"],
    }),
    createStudent: builder.mutation<Student, Partial<Student>>({
      query: (student) => ({
        url: "students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const { useGetStudentsQuery, useCreateStudentMutation } =
  studentApiSlice;
```

### Form Handling

```typescript
// Using React Hook Form with Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "@/schemas/studentSchema";

export const StudentForm = () => {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      await createStudent(data).unwrap();
      toast.success("Student created successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to create student");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
    </Form>
  );
};
```

## 🔧 Backend Development

### Controller Structure

```typescript
// src/controllers/student-controller.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../middleware/asyncHandler";

const prisma = new PrismaClient();

export const getStudents = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search, level } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where = {
    ...(search && {
      OR: [
        { firstName: { contains: search as string, mode: "insensitive" } },
        { lastName: { contains: search as string, mode: "insensitive" } },
      ],
    }),
    ...(level && { level: level as string }),
  };

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      students,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    },
  });
});
```

### Middleware

```typescript
// src/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

### Validation

```typescript
// src/validators/studentValidators.ts
import { z } from "zod";

export const createStudentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().datetime(),
  level: z.string().min(1, "Level is required"),
  gender: z.enum(["Male", "Female"]),
});

export const updateStudentSchema = createStudentSchema.partial();
```

## 🗄️ Database Management

### Prisma Schema

```prisma
// prisma/schema.prisma
model Student {
  id                   String    @id @default(auto()) @map("_id") @db.ObjectId
  firstName            String
  lastName             String
  otherName            String?
  dateOfBirth          DateTime
  level                String
  subLevel             String
  gender               String
  studentId            String?   @unique
  stateOfOrigin        String
  localGvt             String
  homeTown             String?
  sponsorName          String?
  sponsorRelationship  String?
  sponsorPhoneNumber   String?
  sponsorEmail         String?
  imageUrl             String?
  imagePublicId        String?
  password             String
  isPaid               Boolean   @default(false)
  resetPasswordToken   String?
  resetPasswordExpires DateTime?

  userId String? @db.ObjectId
  user   User?   @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  results   Result[]
}
```

### Database Operations

```typescript
// Example database operations
export const createStudent = async (data: CreateStudentData) => {
  return await prisma.student.create({
    data: {
      ...data,
      studentId: await generateStudentId(data.level),
    },
  });
};

export const getStudentsWithPagination = async (
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit;

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.count(),
  ]);

  return { students, total };
};
```

## 🧪 Testing

### Frontend Testing

```typescript
// __tests__/components/StudentCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { StudentCard } from "@/components/shared/students/StudentCard";

const mockStudent = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  level: "Primary 5",
};

describe("StudentCard", () => {
  it("renders student information correctly", () => {
    render(<StudentCard student={mockStudent} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Primary 5")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const mockOnEdit = jest.fn();
    render(<StudentCard student={mockStudent} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByText("Edit"));
    expect(mockOnEdit).toHaveBeenCalledWith(mockStudent);
  });
});
```

### Backend Testing

```typescript
// __tests__/controllers/student-controller.test.ts
import request from "supertest";
import { app } from "../../src/app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Student Controller", () => {
  beforeEach(async () => {
    await prisma.student.deleteMany();
  });

  it("should create a new student", async () => {
    const studentData = {
      firstName: "John",
      lastName: "Doe",
      level: "Primary 5",
      gender: "Male",
    };

    const response = await request(app)
      .post("/api/students")
      .send(studentData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.firstName).toBe("John");
  });
});
```

## 🚀 Deployment

### Environment Setup

```bash
# Production environment variables
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### Build Process

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd client
npm run build
npm start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection

```bash
# Check MongoDB connection
mongo --eval "db.runCommand('ping')"

# Reset Prisma client
npx prisma generate
npx prisma db push
```

#### Build Errors

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# TypeScript errors
npm run type-check
```

#### Development Server Issues

```bash
# Kill processes on port
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9

# Restart servers
npm run dev
```

### Performance Optimization

#### Frontend

- Use React.memo for expensive components
- Implement lazy loading for routes
- Optimize images with next/image
- Use proper caching strategies

#### Backend

- Implement database indexing
- Use connection pooling
- Add request rate limiting
- Implement proper error handling

### Security Best Practices

- Validate all inputs
- Sanitize user data
- Use HTTPS in production
- Implement proper authentication
- Regular security audits

---

**Last Updated**: December 2024  
**Version**: 2.0.0

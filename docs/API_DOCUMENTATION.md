# API Documentation - Beryl International School Management System

This document provides comprehensive documentation for the REST API endpoints of the Beryl International School Management System.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Error Handling](#error-handling)
5. [Endpoints](#endpoints)
6. [Data Models](#data-models)
7. [Examples](#examples)

## 🌐 Overview

The API is built with Node.js, Express.js, and Prisma ORM, providing RESTful endpoints for managing school operations. All endpoints return JSON responses and use JWT for authentication.

### API Version

- **Current Version**: v1.0.0
- **Base Path**: `/api/v1`

## 🔐 Authentication

### JWT Token

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Format

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "admin|teacher|student",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Getting a Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## 🌍 Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

## ⚠️ Error Handling

### Standard Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "statusCode": 400
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📡 Endpoints

### Authentication Endpoints

#### POST /auth/login

Authenticate user and return JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    }
  }
}
```

#### POST /auth/register

Register a new user (Admin only).

**Request Body:**

```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "teacher"
}
```

#### POST /auth/forgot-password

Send password reset email.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

#### POST /auth/reset-password

Reset password using token.

**Request Body:**

```json
{
  "token": "reset_token",
  "password": "new_password"
}
```

### User Management Endpoints

#### GET /users

Get all users (Admin only).

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `role` - Filter by role
- `search` - Search by name or email

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

#### GET /users/:id

Get user by ID.

#### PUT /users/:id

Update user information.

#### DELETE /users/:id

Delete user (Admin only).

### Student Management Endpoints

#### GET /students

Get all students.

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `level` - Filter by level
- `search` - Search by name or student ID

**Response:**

```json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": "student_id",
        "firstName": "John",
        "lastName": "Doe",
        "studentId": "STU2024001",
        "level": "Primary 5",
        "subLevel": "A",
        "gender": "Male",
        "imageUrl": "https://cloudinary.com/image.jpg"
      }
    ],
    "pagination": {...}
  }
}
```

#### POST /students

Create new student.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "otherName": "Smith",
  "dateOfBirth": "2010-05-15",
  "level": "Primary 5",
  "subLevel": "A",
  "gender": "Male",
  "stateOfOrigin": "Lagos",
  "localGvt": "Ikeja",
  "homeTown": "Lagos",
  "sponsorName": "Jane Doe",
  "sponsorRelationship": "Mother",
  "sponsorPhoneNumber": "+2348012345678",
  "sponsorEmail": "jane@example.com",
  "password": "student123"
}
```

#### GET /students/:id

Get student by ID.

#### PUT /students/:id

Update student information.

#### DELETE /students/:id

Delete student.

#### POST /students/:id/upload-image

Upload student profile image.

**Request:** Multipart form data with image file.

### Staff Management Endpoints

#### GET /staff

Get all staff members.

#### POST /staff

Create new staff member.

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "otherName": "Mary",
  "dateOfBirth": "1985-03-20",
  "qualification": "B.Ed",
  "category": "Teaching",
  "role": "Class Teacher",
  "gender": "Female",
  "maritalStatus": "Married",
  "stateOfOrigin": "Lagos",
  "localGvt": "Ikeja",
  "homeTown": "Lagos",
  "residence": "Lagos",
  "phone": "+2348012345678",
  "email": "jane.smith@school.com"
}
```

#### GET /staff/:id

Get staff member by ID.

#### PUT /staff/:id

Update staff information.

#### DELETE /staff/:id

Delete staff member.

### Result Management Endpoints

#### GET /results

Get all results.

**Query Parameters:**

- `studentId` - Filter by student
- `level` - Filter by level
- `term` - Filter by term
- `session` - Filter by session

#### POST /results

Create new result.

**Request Body:**

```json
{
  "studentId": "student_id",
  "level": "Primary 5",
  "subLevel": "A",
  "term": "First Term",
  "session": "2024/2025",
  "subjectResults": [
    {
      "subject": "Mathematics",
      "testScore": 15,
      "examScore": 60,
      "totalScore": 75,
      "grade": "A"
    }
  ],
  "affectiveAssessment": [
    {
      "aCategory": "Punctuality",
      "grade": "A"
    }
  ],
  "psychomotor": [
    {
      "pCategory": "Handwriting",
      "grade": "B"
    }
  ],
  "teacherRemark": "Excellent performance",
  "principalRemark": "Keep it up"
}
```

#### GET /results/:id

Get result by ID.

#### PUT /results/:id

Update result.

#### DELETE /results/:id

Delete result.

#### POST /results/:id/publish

Publish result.

#### GET /results/:id/download

Download result as PDF.

### Event Management Endpoints

#### GET /events

Get all events.

**Query Parameters:**

- `page` - Page number
- `limit` - Items per page
- `date` - Filter by date

#### POST /events

Create new event.

**Request Body:**

```json
{
  "title": "Annual Sports Day",
  "description": "Annual sports competition for all students",
  "date": "2024-12-15T09:00:00Z"
}
```

#### GET /events/:id

Get event by ID.

#### PUT /events/:id

Update event.

#### DELETE /events/:id

Delete event.

### Announcement Endpoints

#### GET /announcements

Get all announcements.

**Query Parameters:**

- `target` - Filter by target audience
- `page` - Page number

#### POST /announcements

Create new announcement.

**Request Body:**

```json
{
  "title": "Important Notice",
  "message": "School will be closed tomorrow",
  "target": "all"
}
```

#### GET /announcements/:id

Get announcement by ID.

#### PUT /announcements/:id

Update announcement.

#### DELETE /announcements/:id

Delete announcement.

### Scheme of Work Endpoints

#### GET /scheme-of-work

Get all schemes of work.

**Query Parameters:**

- `subject` - Filter by subject
- `level` - Filter by level
- `term` - Filter by term

#### POST /scheme-of-work

Create new scheme of work.

**Request Body:**

```json
{
  "subject": "Mathematics",
  "level": "Primary 5",
  "term": "First Term",
  "topics": [
    {
      "week": 1,
      "topic": ["Numbers and Numeration", "Place Value"]
    }
  ]
}
```

#### GET /scheme-of-work/:id

Get scheme by ID.

#### PUT /scheme-of-work/:id

Update scheme.

#### DELETE /scheme-of-work/:id

Delete scheme.

### Timetable Endpoints

#### GET /timetable

Get all timetables.

**Query Parameters:**

- `level` - Filter by level
- `subLevel` - Filter by sub-level
- `day` - Filter by day

#### POST /timetable

Create new timetable.

**Request Body:**

```json
{
  "level": "Primary 5",
  "subLevel": "A",
  "day": "Monday",
  "periods": [
    {
      "subject": "Mathematics",
      "startTime": "08:00",
      "endTime": "09:00"
    }
  ]
}
```

#### GET /timetable/:id

Get timetable by ID.

#### PUT /timetable/:id

Update timetable.

#### DELETE /timetable/:id

Delete timetable.

### Admission Endpoints

#### GET /admissions

Get all admission applications.

#### POST /admissions

Submit admission application.

**Request Body:**

```json
{
  "firstName": "Parent First Name",
  "lastName": "Parent Last Name",
  "email": "parent@example.com",
  "phone": "+2348012345678",
  "childName": "Child Name",
  "dateOfBirth": "2015-08-10",
  "gender": "Male",
  "level": "Primary 1"
}
```

#### GET /admissions/:id

Get admission by ID.

#### PUT /admissions/:id

Update admission status.

#### DELETE /admissions/:id

Delete admission.

## 📊 Data Models

### User Model

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "teacher" | "student";
  status: "active" | "inactive";
  level?: string;
  subLevel?: string;
  isAdmin: boolean;
  userType?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Student Model

```typescript
interface Student {
  id: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  dateOfBirth: Date;
  level: string;
  subLevel: string;
  gender: string;
  studentId?: string;
  stateOfOrigin: string;
  localGvt: string;
  homeTown?: string;
  sponsorName?: string;
  sponsorRelationship?: string;
  sponsorPhoneNumber?: string;
  sponsorEmail?: string;
  imageUrl?: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Result Model

```typescript
interface Result {
  id: string;
  userId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  level: string;
  subLevel: string;
  term: string;
  session: string;
  position?: string;
  totalScore?: number;
  averageScore?: number;
  numberInClass?: number;
  teacherRemark?: string;
  principalRemark?: string;
  isPaid: boolean;
  isPublished: boolean;
  subjectResults: SubjectResult[];
  affectiveAssessment: AffectiveAssessment[];
  psychomotor: Psychomotor[];
  createdAt: Date;
  updatedAt: Date;
}
```

## 💡 Examples

### Creating a Student with Image Upload

```javascript
const formData = new FormData();
formData.append("firstName", "John");
formData.append("lastName", "Doe");
formData.append("dateOfBirth", "2010-05-15");
formData.append("level", "Primary 5");
formData.append("image", imageFile);

const response = await fetch("/api/students", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});
```

### Getting Results with Filters

```javascript
const response = await fetch(
  "/api/results?level=Primary 5&term=First Term&session=2024/2025",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
```

### Downloading Result PDF

```javascript
const response = await fetch("/api/results/result_id/download", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "result.pdf";
a.click();
```

## 🔧 Rate Limiting

- **Requests per minute**: 100
- **Burst limit**: 200 requests per minute
- **Rate limit header**: `X-RateLimit-Remaining`

## 📝 Notes

- All dates are in ISO 8601 format
- File uploads support: JPG, PNG, PDF (max 5MB)
- Pagination is available for list endpoints
- Search functionality supports partial matching
- All responses are in JSON format

---

**Last Updated**: December 2024  
**API Version**: v1.0.0

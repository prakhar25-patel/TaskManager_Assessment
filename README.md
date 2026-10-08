# Task Management System

A full-stack Task Management System built with **React.js** and **Node.js + Express.js**. The application allows users to create, view, update, delete, search, filter, and sort tasks through a responsive web interface.

The project uses an **in-memory array for data storage**, as required by the assignment. No database or Firebase is used.

---

## 🚀 Features

### Task Management
- Create new tasks
- View all tasks
- View task details
- Edit existing tasks
- Delete tasks
- Task status management
- Task priority management
- Due date support
- Created and updated timestamps

### Search & Filtering
- Search tasks by title or description
- Filter by status
- Filter by priority
- Sort by:
  - Newest
  - Oldest
  - Priority
  - Due date

### UI/UX
- Responsive design for desktop and mobile
- Loading states
- Empty states
- Error handling
- Form validation
- Confirmation before deleting a task
- Reusable React components
- Modal-based task creation/editing and task details

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- REST API
- CORS
- dotenv

### Development Tools
- Git
- GitHub
- VS Code
- Postman

---

## 📁 Project Structure

```text
task-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── task.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── routes/
│   │   │   └── task.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── task.service.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PriorityBadge.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskDetailsModal.jsx
│   │   │   └── TaskForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── taskApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── API.md
│   └── task-management.postman_collection.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-management-system.git
cd task-management-system
```

---

## 🔧 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend in development mode:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

## 💻 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔌 REST API

Base URL:

```text
http://localhost:5000/api
```

### Get All Tasks

```http
GET /api/tasks
```

Returns all tasks.

### Get Task By ID

```http
GET /api/tasks/:id
```

Returns a specific task.

### Create Task

```http
POST /api/tasks
```

Example request:

```json
{
  "title": "Complete Assignment",
  "description": "Finish the task management system assignment",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-10-15"
}
```

### Update Task

```http
PUT /api/tasks/:id
```

Example:

```json
{
  "title": "Complete Full Stack Assignment",
  "description": "Finish frontend and backend implementation",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2026-10-15"
}
```

### Delete Task

```http
DELETE /api/tasks/:id
```

Deletes the specified task.

---

## 📋 Task Structure

Each task contains the following fields:

```json
{
  "id": "unique-task-id",
  "title": "Complete Assignment",
  "description": "Complete the project",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-10-15",
  "createdAt": "2026-10-08T10:00:00.000Z",
  "updatedAt": "2026-10-08T10:00:00.000Z"
}
```

### Status Values

```text
pending
in_progress
completed
```

### Priority Values

```text
low
medium
high
```

---

## 🧱 Backend Architecture

The backend follows a layered structure:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
In-Memory Data
```

### Routes
Defines API endpoints and HTTP methods.

### Controllers
Handles HTTP requests and responses.

### Services
Contains task-related business logic and data operations.

### Middleware
Provides centralized error handling.

This separation keeps the backend modular and easier to maintain.

---

## 🖥️ Frontend Architecture

The frontend is divided into reusable components:

```text
Dashboard
├── TaskCard
├── TaskForm
├── TaskDetailsModal
├── StatusBadge
└── PriorityBadge
```

The API communication is separated into:

```text
src/services/taskApi.js
```

This keeps API logic separate from UI components.

---

## ✅ Validation & Error Handling

The application includes:

- Required title validation
- Required description validation
- Status validation
- Priority validation
- Due date validation
- API error handling
- 404 handling for missing tasks
- Centralized backend error handling
- Loading states
- Empty states
- Delete confirmation

HTTP status codes are used appropriately:

| Operation | Status |
|---|---|
| Successful GET | 200 |
| Successful POST | 201 |
| Successful PUT | 200 |
| Successful DELETE | 200 |
| Invalid request | 400 |
| Task not found | 404 |
| Server error | 500 |

---

## 🗄️ Data Storage

This project intentionally uses an **in-memory JavaScript array** for task storage.

No database is used.

```text
Application
     ↓
Express API
     ↓
In-Memory Array
```

Because the data is stored in memory, tasks will be reset whenever the backend server restarts.

---

## 📮 Postman API Collection

A Postman collection is included in:

```text
docs/task-management.postman_collection.json
```

You can import this file into Postman to test all available REST APIs.

Detailed API documentation is available in:

```text
docs/API.md
```

---

## 🔐 Environment Variables

Environment files are not committed to GitHub.

Example files are provided:

```text
backend/.env.example
frontend/.env.example
```

### Backend

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Running the Project

You need two terminals.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## 📸 Screenshots

Add screenshots of the application here after completing the project.

Example:

```text
screenshots/
├── dashboard.png
├── create-task.png
├── task-details.png
└── edit-task.png
```

---

## 🔮 Future Improvements

Possible future improvements include:

- Database integration
- User authentication
- Pagination
- Advanced search
- Dark mode
- Drag-and-drop task management
- Task notifications
- Role-based access control
- Cloud deployment

---

## 👨‍💻 Author

**Prakhar Patel**

B.Tech — Electronics & Communication Engineering

Interested in:

- Software Development
- Backend Development
- AI/ML
- Generative AI
- Full-Stack Development

---

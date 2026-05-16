# 📄 ResumeForge — Full Stack Resume Builder

A complete, production-ready Resume Builder with React frontend, Node.js/Express backend, and MongoDB database. Features JWT auth, live preview, 3 templates, PDF export, and auto-save.

---

## 🗂 Project Structure

```
resume-builder/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, profile
│   │   └── resumeController.js    # CRUD for resumes
│   ├── middleware/
│   │   ├── auth.js                # JWT protect middleware
│   │   └── errorHandler.js        # Global error handler
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt, JWT)
│   │   └── Resume.js              # Resume schema (all sections)
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   └── resumeRoutes.js        # /api/resumes/*
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Express entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Auth/
        │   │   └── ProtectedRoute.jsx
        │   ├── Layout/
        │   │   ├── Header.jsx
        │   │   └── Sidebar.jsx
        │   ├── Resume/
        │   │   ├── ResumeSections.jsx    # All form sections
        │   │   ├── ResumePreview.jsx     # Live preview
        │   │   ├── ResumeTemplates.jsx   # Modern/Minimal/Professional
        │   │   └── TemplateSelector.jsx
        │   └── Shared/
        │       ├── InputField.jsx
        │       └── SectionCard.jsx
        ├── context/
        │   ├── AuthContext.js      # JWT auth state
        │   └── ResumeContext.js    # Resume data + API calls
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── DashboardPage.jsx
        │   └── BuilderPage.jsx
        ├── services/
        │   └── api.js             # Axios instance + services
        ├── styles/
        │   └── global.css         # Full CSS with dark mode
        ├── utils/
        │   └── pdfExport.js       # html2canvas + jsPDF
        ├── App.js
        └── index.js
```

---

## ⚙️ Prerequisites

- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** v8+

---

## 🚀 Installation & Setup

### Step 1 — Clone and enter project

```bash
git clone <your-repo-url>
cd resume-builder
```

---

### Step 2 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/resume_builder
JWT_SECRET=your_very_strong_secret_key_here_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

> **MongoDB Atlas**: Replace MONGO_URI with your Atlas connection string:
> `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/resume_builder`

```bash
# Start backend (development with auto-reload)
npm run dev

# Or production
npm start
```

Backend runs at → `http://localhost:5000`
Health check → `http://localhost:5000/api/health`

---

### Step 3 — Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
# Start frontend
npm start
```

Frontend runs at → `http://localhost:3000`

---

## 🌍 API Endpoints

### Auth Routes — `/api/auth`

| Method | Route              | Access   | Description          |
|--------|--------------------|----------|----------------------|
| POST   | `/api/auth/register` | Public | Create account       |
| POST   | `/api/auth/login`    | Public | Login, get JWT       |
| GET    | `/api/auth/me`       | Private | Get current user     |
| PUT    | `/api/auth/update`   | Private | Update profile       |

### Resume Routes — `/api/resumes`

| Method | Route                        | Access   | Description          |
|--------|------------------------------|----------|----------------------|
| GET    | `/api/resumes`               | Private  | All user resumes     |
| POST   | `/api/resumes`               | Private  | Create resume        |
| GET    | `/api/resumes/:id`           | Private  | Get resume by ID     |
| PUT    | `/api/resumes/:id`           | Private  | Update resume        |
| DELETE | `/api/resumes/:id`           | Private  | Delete resume        |
| POST   | `/api/resumes/:id/duplicate` | Private  | Duplicate resume     |

---

## 🗄️ MongoDB Setup (Local)

### Option A — MongoDB Community (local)

```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt install mongodb
sudo systemctl start mongodb

# Windows
# Download installer from mongodb.com/try/download/community
```

### Option B — MongoDB Atlas (Cloud, free tier)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free cluster
3. Get connection string → paste into `.env` as `MONGO_URI`

---

## ✨ Features

### Frontend
- ✅ JWT authentication (register/login/logout)
- ✅ 6 resume sections with Add/Edit/Delete
- ✅ Live real-time preview
- ✅ 3 professional templates (Modern, Minimal, Professional)
- ✅ Template switching
- ✅ Dark mode toggle
- ✅ PDF download (html2canvas + jsPDF)
- ✅ Auto-save (3 second debounce)
- ✅ Form validation with error messages
- ✅ Sidebar navigation
- ✅ Mobile responsive
- ✅ Toast notifications
- ✅ Empty states
- ✅ Resume dashboard with create/delete/duplicate

### Backend
- ✅ REST API (Express.js)
- ✅ MongoDB + Mongoose
- ✅ JWT authentication
- ✅ bcrypt password hashing
- ✅ Protected routes middleware
- ✅ CORS configuration
- ✅ Global error handling
- ✅ MVC architecture
- ✅ Input validation
- ✅ Environment variables

---

## 🔑 Usage

1. Open `http://localhost:3000`
2. Click **Create one free** → Register account
3. From Dashboard → click **New Resume**
4. Fill in your details in the form panels
5. Switch templates with the template selector
6. Click **Save Resume** to persist to MongoDB
7. Click **Download PDF** to export

---

## 🏗️ Build for Production

```bash
# Frontend build
cd frontend
npm run build
# → Creates optimized build in frontend/build/

# Backend (set NODE_ENV=production in .env)
cd backend
NODE_ENV=production npm start
```

To serve the React build from Express, add to `server.js`:
```js
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));
```

---

## 🛠 Tech Stack

| Layer     | Tech                                    |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router 6, Context API  |
| Styling   | Pure CSS with CSS Variables + dark mode |
| HTTP      | Axios with interceptors                 |
| PDF       | html2canvas + jsPDF                     |
| Toasts    | react-hot-toast                         |
| Backend   | Node.js + Express.js                   |
| Database  | MongoDB + Mongoose                      |
| Auth      | JWT + bcryptjs                          |
| Dev tools | nodemon                                 |

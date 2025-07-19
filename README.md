# ResumeForge Express Backend

A Node.js/Express backend for a resume-building platform with Google and GitHub OAuth authentication, PDF generation, and MySQL database integration. Built with TypeScript for type safety and maintainability.

---

## Project Summary

ResumeForge Express provides secure, passwordless authentication via Google and GitHub, allowing users to create, save, and generate PDF resumes. The backend is modular, using Express.js, Passport.js, Knex.js, and Puppeteer for PDF rendering. All user data is stored in a MySQL database.

---

## Features

- **Google & GitHub OAuth authentication** (no password login)
- **MySQL database integration** with Knex.js
- **PDF generation** from user-provided HTML using Puppeteer
- **Session management** with secure cookies
- **Role-based and resource-based access control**
- **CORS support** for frontend integration
- **TypeScript** for type safety
- **Database migrations** for schema management

---

## Security Practices

- No password storage or password-based login (reduces risk of brute-force and credential leaks)
- All authentication via trusted OAuth providers (Google, GitHub)
- Session cookies are set to `secure` in production and use `httpOnly`
- Input validation and sanitization for user-provided HTML
- Rate limiting middleware for authentication endpoints
- CORS origin restricted via environment variable

**Areas for Improvement:**
- Ensure all secrets (session, OAuth) are set via environment variables
- Enforce HTTPS in production
- Consider adding global rate limiting
- Unify database access (prefer Knex.js over raw MySQL)
- Add automated tests for critical flows

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=resumeforge
DB_PORT=3306
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret_key_here
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a MySQL database named `resumeforge`
2. Run migrations to create tables:
   ```bash
   npm run migrate
   ```
3. (Optional) Run seeds to populate initial data:
   ```bash
   npm run seed
   ```

### 4. OAuth Setup

- Set up OAuth credentials for Google and GitHub in their respective developer consoles.
- Add authorized redirect URIs:
  - `http://localhost:8080/auth/google/callback`
  - `http://localhost:8080/auth/github/callback`

### 5. Run the Application

```bash
npm run dev
```

The server will start on `http://localhost:8080`

---

## API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth login
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/login` - Login page (returns available providers)
- `GET /auth/logout` - Logout user
- `GET /auth/` - Root route, redirects based on auth status

### Resume Data & PDF
- `POST /generate` - Generate PDF from HTML (requires Google & GitHub login)
- `POST /resume/save` - Save or update user resume data (requires authentication)
- `GET /resume/data` - Fetch user resume data (requires authentication)

---

## Project Structure

```
src/
├── controllers/
│   ├── auth.ts          # Authentication controllers
│   └── resume.ts        # Resume data and PDF generation controllers
├── routes/
│   ├── auth.ts          # Authentication routes
│   └── resume.ts        # Resume/PDF routes
├── models/
│   ├── User.ts          # User model
│   └── Resume.ts        # Resume data model
├── db/
│   ├── db.ts            # MySQL2 connection setup
│   ├── knex.ts          # Knex configuration
│   └── migrations/      # Database migrations
├── middlewares/
│   └── auth.ts          # Authentication and access control middleware
├── types/
│   ├── interface.user.ts        # User type definitions
│   ├── interface.resume.ts      # Resume data type definitions
│   └── types.controller-type.ts # Controller type definitions
├── utils/
│   └── helper.ts         # Utility functions (e.g., HTML formatting)
└── index.ts              # Main application entry point
```

---

## Database Schema

### Users Table
- `id` (VARCHAR) - Primary key
- `google_id` (VARCHAR) - Google OAuth ID (unique)
- `github_id` (VARCHAR) - GitHub OAuth ID (unique)
- `email` (VARCHAR) - User email (unique)
- `name` (VARCHAR) - User display name
- `avatar` (TEXT) - User avatar URL
- `created_at` (TIMESTAMP) - Account creation time
- `updated_at` (TIMESTAMP) - Last update time

### user_resumeData Table
- `id` (VARCHAR) - Primary key
- `user_id` (VARCHAR) - Foreign key to users.id
- `resume_data` (TEXT/JSON) - Resume content
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

---

## Troubleshooting

- **CORS Errors:** Ensure `FRONTEND_URL` in `.env` matches your frontend URL and requests include `credentials: 'include'`.
- **Database Connection Errors:** Verify MySQL is running, credentials are correct, and the database exists.
- **OAuth Errors:** Check credentials and redirect URIs in your provider consoles and `.env` file.

---

## License

Polyform Noncommercial License
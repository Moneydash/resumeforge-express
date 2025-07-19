import express from "express";
import cors from "cors";
import pdfRouter from "./routes/resume";
import authRouter from "./routes/auth";
import { config as configDotenv } from "dotenv";
import session from 'express-session';
import passport from 'passport';
import { testConnection } from './db/db';

configDotenv();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/resume', pdfRouter);

// Initialize database and start server
const startServer = async () => {
  try {
    await testConnection();

    app.listen(port, () => {
      console.log(`Server is running and listening to port: ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
import express from "express";
import { fetchResumeData, generate_pdf, save_userData } from '../controllers/resume';
import { isAuthenticated, validateSocialLogin } from '../middlewares/auth';

const pdfRouter = express.Router();

// Apply authentication middleware to ensure user is logged in with Google or GitHub
pdfRouter.post('/generate',
  isAuthenticated,
  validateSocialLogin(['google', 'github']),
  generate_pdf
);

pdfRouter.post('/save-data',
  isAuthenticated,
  validateSocialLogin(['google', 'github']),
  save_userData
);

pdfRouter.get('/fetch-data/:userId',
  isAuthenticated,
  validateSocialLogin(['google', 'github']),
  fetchResumeData
);

export default pdfRouter;
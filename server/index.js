import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import leadRoutes from './routes/leads.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);

// Error handling
app.use(errorHandler);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LeadWave™ API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 LeadWave™ Server running on port ${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});

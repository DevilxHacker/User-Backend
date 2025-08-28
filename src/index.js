import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './utilities/swaggerOptions.js';
import ip from 'ip';
import { rateLimit } from 'express-rate-limit';
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

// ✅ Allow only your frontend + localhost
const allowedOrigins = [
  "http://localhost:5173",                // Local dev (Vite)
  "https://user-frontend-snowy.vercel.app" // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // only if you send cookies/auth headers
}));

// 🔒 Rate limiter
const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 30 seconds
  max: 5 // limit each IP to 5 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(express.text());

// Swagger docs
const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Router
app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  console.log(req.user);
  const ipaddr = ip.address();
  return res.json({ message: 'pong ' + ipaddr });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});

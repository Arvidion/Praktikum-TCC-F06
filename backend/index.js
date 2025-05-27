import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import route from "./routes/route.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000", 
    "http://localhost:5000",
    "yojo-f06-dot-f-06-450706.uc.r.appspot.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api', route);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

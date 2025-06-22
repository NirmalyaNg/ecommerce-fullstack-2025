import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/category.js';
import productRouter from './routes/product.js';
import orderRouter from './routes/order.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // <== Required to allow cookies
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

// Mongodb connection
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});

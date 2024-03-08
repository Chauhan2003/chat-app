import express from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';

import dbConnect from './config/db.js';
import userRoutes from './routes/user.js';
import conversationRoutes from './routes/conversation.js';
import messageRoutes from './routes/message.js';


dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Database:
dbConnect();

// API:
app.use('/api/v1', userRoutes);
app.use('/api/v2', conversationRoutes);
app.use('/api/v3', messageRoutes);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`.bgCyan.white));

// Error Handling:
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})
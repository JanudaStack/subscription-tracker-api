import express from 'express';
import cookieParser from "cookie-parser";

import {PORT} from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from './routes/subscription.routes.js';
import authRouter from "./routes/auth.routes.js";

import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Allows your app to handle JSON data sent in request or API calls
app.use(express.json());

// Helps to process the form data sent via HTML forms in a simple format
app.use(express.urlencoded({extended: false}));

// Reads cookies from incoming requests
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!')
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`)

    await connectToDatabase();
});

export default app;
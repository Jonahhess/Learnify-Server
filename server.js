require('dotenv').config();
const express = require("express");
const connectDB = require("./db");
const logger = require("./middleware/logger");
const limiter = require("./middleware/rateLimiter");
const apiRoutes = require("./routes/api");
const { errorHandler } = require("./middleware/errorHandler");

const cookieParser = require("cookie-parser");
const app = express();

app.use(logger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

connectDB();

// Use the API routes
app.use('/', apiRoutes);

// Centralized error handler
app.use(errorHandler);

app.listen(4000, () => console.log("Server running on port 4000"));

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('../backend/db/db');
const userRouter = require('./router/userRouter');
const expenseRouter = require('./router/expenseRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', userRouter);
app.use('/expenses', expenseRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

// Connect to the database
connectDb();

// Set the port (either from environment variable or default to 4000)
const port = process.env.PORT_NO || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server on: http://localhost:${port}`);
});
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
const expensesRoute = require('./routes/expenses');
app.use('/expenses', expensesRoute);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Vizune Management Studio API is running 🚀');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
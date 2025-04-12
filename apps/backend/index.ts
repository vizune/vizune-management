import express from 'express';
import incomeRoutes from './routes/income';
import expensesRoutes from './routes/expenses';

const app = express();
app.use(express.json());

app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expensesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
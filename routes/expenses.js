const express = require('express');
const router = express.Router();

// In-memory array to store expenses
const expenses = [];
const EXPENSE_CATEGORIES = ['Education', 'Design', 'Artwork', 'Software', 'Other'];

// POST /expenses
router.post('/', (req, res) => {
  const { date, amount, vendor, category, notes } = req.body;

  if (!date || !amount || !vendor || !category) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const newExpense = {
    id: expenses.length + 1,
    date,
    amount,
    vendor,
    category: EXPENSE_CATEGORIES.includes(category) ? category : 'Other',
    notes: notes || ''
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// GET /expenses
router.get('/', (req, res) => {
  res.json(expenses);
});

router.get('/types', (req, res) => {
  res.json(EXPENSE_CATEGORIES);
});

// DELETE /expenses/:id
router.delete('/:id', (req, res) => {
  const expenseId = parseInt(req.params.id);
  const index = expenses.findIndex(exp => exp.id === expenseId);

  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  const deleted = expenses.splice(index, 1)[0];
  res.json({ message: 'Expense deleted.', expense: deleted });
});

module.exports = router;
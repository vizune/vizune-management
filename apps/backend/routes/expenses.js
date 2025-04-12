const express = require('express');
const { db } = require('../db/db'); // your drizzle instance
const { expenses } = require('../schema'); // your expenses table schema

const router = express.Router();

const EXPENSE_CATEGORIES = ['Education', 'Design', 'Artwork', 'Software', 'Other'];

// POST /expenses
router.post('/', async (req, res) => {
  const { date, amount, vendor, category, notes } = req.body;

  if (!date || !amount || !vendor || !category) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const safeCategory = EXPENSE_CATEGORIES.includes(category) ? category : 'Other';

  try {
    const result = await db
      .insert(expenses)
      .values({ date, amount, vendor, category: safeCategory, notes })
      .returning();

    const newExpense = result[0];

    res.status(201).json(newExpense);
  } catch (err) {
    console.error('Error inserting expense:', err);
    res.status(500).json({ error: 'Failed to insert expense.' });
  }
});

// GET /expenses
router.get('/', async (req, res) => {
  try {
    const allExpenses = await db.select().from(expenses);
    res.json(allExpenses);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ error: 'Failed to fetch expenses.' });
  }
});

// GET /expenses/types
router.get('/types', (req, res) => {
  res.json(EXPENSE_CATEGORIES);
});

// DELETE /expenses/:id
router.delete('/:id', async (req, res) => {
  const expenseId = parseInt(req.params.id);

  try {
    const result = await db
      .delete(expenses)
      .where(expenses.id.eq(expenseId))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    res.json({ message: 'Expense deleted.', id: expenseId });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ error: 'Failed to delete expense.' });
  }
});

module.exports = router;

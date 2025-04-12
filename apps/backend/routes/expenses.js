const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/vizune.db');  

// In-memory array to store expenses
const EXPENSE_CATEGORIES = ['Education', 'Design', 'Artwork', 'Software', 'Other'];

// POST /expenses
router.post('/', (req, res) => {
  const { date, amount, vendor, category, notes } = req.body;

  if (!date || !amount || !vendor || !category) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const stmt = db.prepare(`
    INSERT INTO expenses (date, amount, vendor, category, notes)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    date,
    amount,
    vendor,
    EXPENSE_CATEGORIES.includes(category) ? category : 'Other',
    notes || ''
  );

  const newExpense = {
    id: result.lastInsertRowid,
    date,
    amount,
    vendor,
    category: EXPENSE_CATEGORIES.includes(category) ? category : 'Other',
    notes: notes || ''
  };

  res.status(201).json(newExpense);
});

// GET /expenses
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM expenses').all();
  res.json(rows);
});

router.get('/types', (req, res) => {
  res.json(EXPENSE_CATEGORIES);
});

// DELETE /expenses/:id
router.delete('/:id', (req, res) => {
  const expenseId = parseInt(req.params.id);

  const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
  const result = stmt.run(expenseId);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Expense not found.' });
  }

  res.json({ message: 'Expense deleted.', id: expenseId });
});

module.exports = router;

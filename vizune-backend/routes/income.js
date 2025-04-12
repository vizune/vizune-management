const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/vizune.db'); 

// In-memory array to store income entries
const INCOME_TYPES = ['Contribution', 'Grant', 'Sale', 'Donation', 'Other'];

// POST /income
router.post('/', (req, res) => {
  const { date, amount, source, type, notes } = req.body;

  if (!date || !amount || !source) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const stmt = db.prepare(`
    INSERT INTO income (date, amount, source, type, notes)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(date, amount, source, INCOME_TYPES.includes(type) ? type : 'Other', notes || '');

  const newIncome = {
    id: result.lastInsertRowid,
    date,
    amount,
    source,
    type: INCOME_TYPES.includes(type) ? type : 'Other',
    notes: notes || ''
  };

  res.status(201).json(newIncome);
});

// GET /income
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM income').all();
  res.json(rows);
});

router.get('/types', (req, res) => {
  res.json(INCOME_TYPES);
});

// DELETE /income/:id
router.delete('/:id', (req, res) => {
  const incomeId = parseInt(req.params.id);

  const stmt = db.prepare('DELETE FROM income WHERE id = ?');
  const result = stmt.run(incomeId);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Income record not found.' });
  }

  res.json({ message: 'Income deleted.', id: incomeId });
});

module.exports = router;
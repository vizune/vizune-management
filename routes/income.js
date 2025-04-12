const express = require('express');
const router = express.Router();

// In-memory array to store income entries
const income = [];
const INCOME_TYPES = ['Contribution', 'Grant', 'Sale', 'Donation', 'Other'];

// POST /income
router.post('/', (req, res) => {
  const { date, amount, source, type, notes } = req.body;

  if (!date || !amount || !source) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const newIncome = {
    id: income.length + 1,
    date,
    amount,
    source,
    type: INCOME_TYPES.includes(type) ? type : 'Other',
    notes: notes || ''
  };

  income.push(newIncome);
  res.status(201).json(newIncome);
});

// GET /income
router.get('/', (req, res) => {
  res.json(income);
});

router.get('/types', (req, res) => {
  res.json(INCOME_TYPES);
});

module.exports = router;
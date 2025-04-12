const express = require('express');
const router = express.Router();
const { db } = require('../db/db'); // your drizzle instance
const { income } = require('../schema'); // your income table schema

const INCOME_TYPES = ['Contribution', 'Grant', 'Sale', 'Donation', 'Other'];

// POST /income
router.post('/', async (req, res) => {
  const { date, amount, source, type, notes } = req.body;

  if (!date || !amount || !source) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const safeType = INCOME_TYPES.includes(type) ? type : 'Other';

  try {
    const result = await db
      .insert(income)
      .values({ date, amount, source, type: safeType, notes })
      .returning();

    const newIncome = result[0];

    res.status(201).json(newIncome);
  } catch (err) {
    console.error('Error inserting income:', err);
    res.status(500).json({ error: 'Failed to insert income record.' });
  }
});

// GET /income
router.get('/', async (req, res) => {
  try {
    const allIncome = await db.select().from(income);
    res.json(allIncome);
  } catch (err) {
    console.error('Error fetching income:', err);
    res.status(500).json({ error: 'Failed to fetch income records.' });
  }
});

// GET /income/types
router.get('/types', (req, res) => {
  res.json(INCOME_TYPES);
});

// DELETE /income/:id
router.delete('/:id', async (req, res) => {
  const incomeId = parseInt(req.params.id);

  try {
    const result = await db
      .delete(income)
      .where(income.id.eq(incomeId))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: 'Income record not found.' });
    }

    res.json({ message: 'Income deleted.', id: incomeId });
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ error: 'Failed to delete income record.' });
  }
});

module.exports = router;

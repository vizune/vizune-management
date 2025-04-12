import { Router, Request, Response } from 'express';
import { db } from '../db/db';
import { expenses } from '../schema';
import { eq } from 'drizzle-orm';

const router = Router();

const EXPENSE_CATEGORIES = ['Education', 'Design', 'Artwork', 'Software', 'Other'] as const;
type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

interface ExpenseInput {
  date: string;
  amount: number;
  vendor: string;
  category: string;
  notes?: string;
}

router.post('/', (req: Request, res: Response): void => {
  void (async () => {
    const { date, amount, vendor, category, notes } = req.body as ExpenseInput;

    if (!date || !amount || !vendor || !category) {
      res.status(400).json({ error: 'Missing required fields.' });
      return;
    }

    const safeCategory: ExpenseCategory = EXPENSE_CATEGORIES.includes(category as ExpenseCategory)
      ? (category as ExpenseCategory)
      : 'Other';

    try {
      const result = await db.insert(expenses).values({
        date,
        amount,
        vendor,
        category: safeCategory,
        notes,
      }).returning();

      res.status(201).json(result[0]);
    } catch (err) {
      console.error('Error inserting expense:', err);
      res.status(500).json({ error: 'Failed to insert expense.' });
    }
  })();
});

router.get('/', (req: Request, res: Response): void => {
  void (async () => {
    try {
      const allExpenses = await db.select().from(expenses);
      res.json(allExpenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      res.status(500).json({ error: 'Failed to fetch expenses.' });
    }
  })();
});

router.get('/types', (_req: Request, res: Response) => {
  res.json(EXPENSE_CATEGORIES);
});

router.delete('/:id', (req: Request, res: Response): void => {
  void (async () => {
    const idParam = req.params?.id;
    const id = parseInt(idParam || '');

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    try {
      const result = await db.delete(expenses).where(eq(expenses.id, id)).returning();

      if (result.length === 0) {
        res.status(404).json({ error: 'Record not found.' });
        return;
      }

      res.json({ message: 'Deleted successfully.', id });
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: 'Failed to delete expense.' });
    }
  })();
});

export default router;

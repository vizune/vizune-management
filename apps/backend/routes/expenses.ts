import { Router, Request, Response } from 'express';
import { db } from '../db/db';
import { expenses } from '../schema';
import { eq } from 'drizzle-orm';
import {
  ExpenseInputSchema,
  ExpenseInput,
  EXPENSE_CATEGORIES,
  ExpenseCategory,
} from '@vizune/shared/zod-schemas';

const router = Router();

router.post('/', (req: Request, res: Response): void => {
  void (async () => {
    const parsed = ExpenseInputSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { date, amount, vendor, category, notes } = parsed.data;

    const safeCategory: ExpenseCategory = EXPENSE_CATEGORIES.includes(category as ExpenseCategory)
      ? (category as ExpenseCategory)
      : 'Other';

    try {
      const result = await db
        .insert(expenses)
        .values({ date, amount, vendor, category: safeCategory, notes })
        .returning();

      res.status(201).json(result[0]);
    } catch (err) {
      console.error('Error inserting expense:', err);
      res.status(500).json({ error: 'Failed to insert expense.' });
    }
  })();
});

router.get('/', (_req: Request, res: Response): void => {
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

router.get('/types', (_req: Request, res: Response): void => {
  res.json(EXPENSE_CATEGORIES);
});

router.delete('/:id', (req: Request, res: Response): void => {
  void (async () => {
    const id = parseInt(req.params.id || '');

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
      const result = await db.delete(expenses).where(eq(expenses.id, id)).returning();

      if (result.length === 0) {
        return res.status(404).json({ error: 'Record not found.' });
      }

      res.json({ message: 'Deleted successfully.', id });
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ error: 'Failed to delete expense.' });
    }
  })();
});

export default router;

import { Router, Request, Response } from 'express';
import { db } from '../db/db';
import { income } from '../schema';
import { eq } from 'drizzle-orm';

const router = Router();

const INCOME_TYPES = ['Contribution', 'Grant', 'Sale', 'Donation', 'Other'] as const;
type IncomeType = (typeof INCOME_TYPES)[number];

interface IncomeInput {
  date: string;
  amount: number;
  source: string;
  type: string;
  notes?: string;
}

router.post('/', (req: Request, res: Response): void => {
  void (async () => {
    const { date, amount, source, type, notes } = req.body as IncomeInput;

    if (!date || !amount || !source) {
      res.status(400).json({ error: 'Missing required fields.' });
      return;
    }

    const safeType: IncomeType = INCOME_TYPES.includes(type as IncomeType)
      ? (type as IncomeType)
      : 'Other';

    try {
      const result = await db.insert(income).values({
        date,
        amount,
        source,
        type: safeType,
        notes,
      }).returning();

      res.status(201).json(result[0]);
    } catch (err) {
      console.error('Error inserting income:', err);
      res.status(500).json({ error: 'Failed to insert income record.' });
    }
  })();
});

router.get('/', (_req: Request, res: Response): void => {
  void (async () => {
    try {
      const allIncome = await db.select().from(income);
      res.json(allIncome);
    } catch (err) {
      console.error('Error fetching income:', err);
      res.status(500).json({ error: 'Failed to fetch income records.' });
    }
  })();
});

router.get('/types', (_req: Request, res: Response): void => {
  res.json(INCOME_TYPES);
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
      const result = await db.delete(income).where(eq(income.id, id)).returning();

      if (result.length === 0) {
        res.status(404).json({ error: 'Record not found.' });
        return;
      }

      res.json({ message: 'Deleted successfully.', id });
    } catch (err) {
      console.error('Error deleting income:', err);
      res.status(500).json({ error: 'Failed to delete income record.' });
    }
  })();
});

export default router;

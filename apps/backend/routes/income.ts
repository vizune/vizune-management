import { Router, Request, Response } from 'express';
import { db } from '../db/db';
import { income } from '../schema';
import { eq } from 'drizzle-orm';
import {
  IncomeInputSchema,
  INCOME_TYPES,
  IncomeType
} from '../../../packages/shared/zod-schemas'

const router = Router();

router.post('/', (req: Request, res: Response): void => {
  void (async () => {
    const parsed = IncomeInputSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { date, amount, source, type, notes } = parsed.data;

    const safeType: IncomeType = INCOME_TYPES.includes(type as IncomeType)
      ? (type as IncomeType)
      : 'Other';

    try {
      const result = await db
        .insert(income)
        .values({ date, amount, source, type: safeType, notes })
        .returning();

      res.status(201).json(result[0]);
    } catch (err) {
      console.error('💥 Full error:', err);
      console.error('🧨 Type:', typeof err);
    
      res.status(500).json({
        error: 'Failed to insert expense.',
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : '',
        raw: JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
      });
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
    const id = parseInt(req.params.id || '');

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
      const result = await db.delete(income).where(eq(income.id, id)).returning();

      if (result.length === 0) {
        return res.status(404).json({ error: 'Record not found.' });
      }

      res.json({ message: 'Deleted successfully.', id });
    } catch (err) {
      console.error('Error deleting income:', err);
      res.status(500).json({ error: 'Failed to delete income record.' });
    }
  })();
});

export default router;

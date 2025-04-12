import { z } from 'zod';

export const EXPENSE_CATEGORIES = ['Education', 'Design', 'Artwork', 'Software', 'Other'] as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const ExpenseInputSchema = z.object({
  date: z.string(),
  amount: z.number(),
  vendor: z.string(),
  category: z.string(),
  notes: z.string().optional(),
});
export type ExpenseInput = z.infer<typeof ExpenseInputSchema>;

export const INCOME_TYPES = ['Contribution', 'Grant', 'Sale', 'Donation', 'Other'] as const;
export type IncomeType = (typeof INCOME_TYPES)[number];

export const IncomeInputSchema = z.object({
  date: z.string(),
  amount: z.number(),
  source: z.string(),
  type: z.string(),
  notes: z.string().optional(),
});
export type IncomeInput = z.infer<typeof IncomeInputSchema>;

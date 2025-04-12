import { pgTable, serial, text, real } from 'drizzle-orm/pg-core';

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  vendor: text('vendor').notNull(),
  category: text('category').default('Other'),
  notes: text('notes'),
});

export const income = pgTable('income', {
  id: serial('id').primaryKey(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  source: text('source').notNull(),
  type: text('type').default('Other'),
  notes: text('notes'),
});
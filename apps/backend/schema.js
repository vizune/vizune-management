const { pgTable, serial, text, real } = require('drizzle-orm/pg-core');

const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  vendor: text('vendor').notNull(),
  category: text('category').default('Other'),
  notes: text('notes'),
});


const income = pgTable('income', {
  id: serial('id').primaryKey(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  source: text('source').notNull(),
  type: text('type').default('Other'),
  notes: text('notes'),
});

module.exports = { income, expenses };

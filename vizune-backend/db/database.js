const Database = require('better-sqlite3');
const db = new Database('vizune.db');

// Create income table
db.prepare(`
  CREATE TABLE IF NOT EXISTS income (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    amount REAL NOT NULL,
    source TEXT NOT NULL,
    type TEXT DEFAULT 'Other',
    notes TEXT
  )
`).run();

// Create expenses table
db.prepare(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    amount REAL NOT NULL,
    vendor TEXT NOT NULL,
    category TEXT DEFAULT 'Other',
    notes TEXT
  )
`).run();

module.exports = db;
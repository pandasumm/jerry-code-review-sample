import { connectDB } from './db.js';

const db = await connectDB();

// Ensure table has a status column (idempotent)
await db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    price INTEGER NOT NULL,
    section TEXT NOT NULL,
    count INTEGER NOT NULL,
    date TEXT NOT NULL,
    show_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open'
  );
`);

const { c } = await db.get(`SELECT COUNT(*) AS c FROM tickets`);
if (c === 0) {
  const rows = [
    [50,  'first', 100, '2025-12-01', 'Winter Gala'],
    [75,  'second',120, '2025-12-01', 'Winter Gala'],
    [60,  'first', 80,  '2025-12-05', 'Comedy Night'],
    [90,  'second',60,  '2025-12-05', 'Comedy Night'],
    [120, 'first', 40,  '2025-12-10', 'Rock Concert'],
    [150, 'second',30,  '2025-12-10', 'Rock Concert']
  ];
  const stmt = await db.prepare(
    `INSERT INTO tickets (price, section, count, date, show_name) VALUES (?, ?, ?, ?, ?)`
  );
  try {
    for (const r of rows) {
      await stmt.run(...r);
    }
  } finally {
    await stmt.finalize();
  }
  console.log('Seeded tickets table');
} else {
  console.log('Tickets already seeded');
}

const all = await db.all(`SELECT * FROM tickets`);
console.log(all);
process.exit(0);
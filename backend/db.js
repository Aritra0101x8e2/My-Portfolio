const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'reviews.db');
const db = new Database(dbPath);

const createTable = `
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.exec(createTable);

module.exports = db;

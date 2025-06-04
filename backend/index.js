const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/reviews', (req, res) => {
  const { name, role, rating, comment } = req.body;

  if (!name || !role || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const stmt = db.prepare(
      `INSERT INTO reviews (name, role, rating, comment, timestamp) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`
    );

    const info = stmt.run(name, role, rating, comment);

    const insertedReview = db
      .prepare('SELECT * FROM reviews WHERE id = ?')
      .get(info.lastInsertRowid);

    res.status(201).json(insertedReview);
  } catch (error) {
    console.error('Error inserting review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/reviews', (req, res) => {
  try {
    const reviews = db
      .prepare('SELECT * FROM reviews ORDER BY timestamp DESC')
      .all();

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const db = require('./db'); // your db.js file path

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow all origins for dev
app.use(express.json()); // Parse JSON request body

// POST /reviews - Insert a new review
app.post('/reviews', (req, res) => {
  const { name, role, rating, comment } = req.body;

  if (!name || !role || !rating || !comment) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const stmt = db.prepare(
      `INSERT INTO reviews (name, role, rating, comment) VALUES (?, ?, ?, ?)`
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

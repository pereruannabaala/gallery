// routes/index.js
import express from 'express';

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the Dark Room Gallery!');
});

// Example additional routes
router.get('/about', (req, res) => {
  res.send('This is a gallery application built with Node.js, Express, and MongoDB.');
});


export default router;

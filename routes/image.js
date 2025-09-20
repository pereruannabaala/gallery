// routes/image.js
import express from 'express';

const router = express.Router();

// Example route for listing images
router.get('/', (req, res) => {
  res.send('Image route works!');
});

// Add more image-related routes here as needed
// e.g., router.post('/upload', ...)

export default router;

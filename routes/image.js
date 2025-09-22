// routes/image.js
import express from 'express';
import Image from '../models/images.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      // If running tests, return JSON instead of rendering
      if (process.env.NODE_ENV === 'test') {
        return res.status(404).json({ error: 'Image not found' });
      }
      // Normal server: render 404 page
      return res.status(404).render('404', { title: 'Image Not Found' });
    }

    // If running tests, return JSON
    if (process.env.NODE_ENV === 'test') {
      return res.json(image);
    }

    // Normal server: render EJS view
    res.render('singleImage', { title: 'Single Image', image });
  } catch (err) {
    console.error(err);
    if (process.env.NODE_ENV === 'test') {
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(500).render('500', { title: 'Server Error', error: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const image = await Image.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true }
    );

    if (!image) return res.status(404).send('Image not found');

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Image.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) return res.status(404).send('Image not found');

    res.redirect('/index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;

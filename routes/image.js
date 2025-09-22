import express from 'express';
import Image from '../models/images.js';  // add .js extension for ESM

const router = express.Router();

// GET single image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).send('Image not found');
    res.render('singleImage', { title: 'Single Image', image });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT update image by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedImage = await Image.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name },
      { new: true }
    );
    if (!updatedImage) return res.status(404).send('Image not found');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE image by ID
router.delete('/:id', async (req, res) => {
  try {
    await Image.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;

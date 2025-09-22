import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from './upload.js';
import Image from '../models/images.js';

const router = express.Router();

// GET /
router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.render('index', { images, msg: req.query.msg || null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST /upload
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.redirect(`/?msg=${err}`);
    if (!req.file) return res.redirect('/?msg=Error: No file selected!');

    try {
      const newImage = new Image({
        name: req.file.filename,
        size: req.file.size,
        path: 'images/' + req.file.filename,
      });
      await newImage.save();
      res.redirect('/?msg=File uploaded successfully');
    } catch (saveErr) {
      console.error(saveErr);
      res.redirect('/?msg=Error saving file to database!');
    }
  });
});

export default router;

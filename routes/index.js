// routes/index.js
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from './upload.js';  // make sure upload.js is also ESM
import Image from '../models/images.js'; // ensure images.js model is ESM

const router = express.Router();

// GET all images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.render('index', { images });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST upload image
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.redirect(`/?msg=${err}`);
    } else {
      console.log(req.file);
      if (!req.file) {
        res.redirect('/?msg=Error: No file selected!');
      } else {
        // create new image
        const newImage = new Image({
          name: req.file.filename,
          size: req.file.size,
          path: 'images/' + req.file.filename,
        });

        // save the uploaded image to the database
        try {
          await newImage.save();
          res.redirect('/?msg=File uploaded successfully');
        } catch (saveErr) {
          console.error(saveErr);
          res.redirect('/?msg=Error saving file!');
        }
      }
    }
  });
});

export default router;

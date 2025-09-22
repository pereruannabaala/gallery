import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create schema
const imageSchema = new Schema({
  name: String,
  path: String,
  size: Number,
  date: { type: Date, default: Date.now }  // use Date.now to avoid fixed time at load
});

// Convert schema to Model
const Image = mongoose.model('Image', imageSchema);

export default Image;

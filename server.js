// server.js
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import index from './routes/index.js';
import image from './routes/image.js';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the app
const app = express();

// View Engine
app.set("view engine", "ejs");

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Database & Server
async function startServer(port = 5000) {
  try {
    await mongoose.connect(
      "mongodb+srv://pereruannabaala:Pn%400757364069@gallerycluster.nspe8xq.mongodb.net/darkroom?retryWrites=true&w=majority&appName=galleryCluster"
    );
    console.log("✅ Database connected successfully");

    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`🚀 Server listening on http://localhost:${port}`);
      });
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

startServer();

// Export app for testing
export default app;

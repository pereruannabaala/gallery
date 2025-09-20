const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Connect to DB and start server
async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://pereruannabaala:Pn%400757364069@gallerycluster.nspe8xq.mongodb.net/darkroom?retryWrites=true&w=majority&appName=galleryCluster"
    );
    console.log("✅ Database connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

startServer();

// serverTest.mjs
process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

const MONGODB_URI = "mongodb+srv://pereruannabaala:Pn%400757364069@gallerycluster.nspe8xq.mongodb.net/darkroom?retryWrites=true&w=majority&appName=galleryCluster";

describe('Photos', function () {
  this.timeout(10000); // shorter timeout now that we optimize connection

  // Connect to MongoDB once before all tests
  before(async function () {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('✅ MongoDB connected for tests');
    }
  });

  // Disconnect after all tests
  after(async function () {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected after tests');
  });

  it('should list ALL photos on / GET', async function () {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.type).to.equal('text/html');
    expect(res.text).to.include('<!DOCTYPE html>');
  });

  it('should return 404 for non-existent image', async function () {
    const res = await request(app).get('/image/000000000000000000000000');
    expect(res.status).to.equal(404);
  });
});

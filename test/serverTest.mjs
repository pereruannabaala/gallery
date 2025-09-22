// serverTest.mjs
process.env.NODE_ENV = 'test';

import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('Photos', function () {
  this.timeout(60000); // increase timeout for slow startup

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


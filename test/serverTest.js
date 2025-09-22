process.env.NODE_ENV = 'test';

import { expect } from 'chai'; // Named import for expect
import chaiHttp from 'chai-http';
import server from '../server.js';

// Initialize chai-http
import chai from 'chai';
chai.use(chaiHttp);

describe('Photos', function () {
  it('should list ALL photos on / GET', function (done) {
    this.timeout(60000);
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Photos', function () {
  it('should list ALL photos on / GET', function (done) {
    this.timeout(60000);
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.body).to.be.a('object');
        done();
      });
  });
});


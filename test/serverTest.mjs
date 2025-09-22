import request from "supertest";
import { expect } from "chai";
import app from "../server.js";

describe("Photos", function () {
  it("should list ALL photos on / GET", async function () {
    this.timeout(60000);

    const res = await request(app).get("/");

    expect(res.status).to.equal(200);
    expect(res.type).to.match(/html/);
    expect(res.body).to.be.an("object");
  });
});

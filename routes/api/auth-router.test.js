import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";
import app from "../../app.js";
import User from "../../models/user.js";

const { PORT, DB_HOST_TEST } = process.env;

describe("test register route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test register with correct data", async () => {
    const signupData = {
      email: "nastiapast@gmail.com",
      password: "987654",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/register")
      .send(signupData);

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(signupData.email);
    expect(body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });

    const user = await User.findOne({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
  });

  test("test login with correct data", async () => {
    const signinData = {
      email: "nastiapast@gmail.com",
      password: "987654",
    };

    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(signinData);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body).toMatchObject({
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });

    await User.deleteMany({});
  });
});

import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create category controller.", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at) 
      VALUES('${id}', 'Admin', 'admin@foobar.com', '${password}', '1234567890', true, 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@foobar.com", password: "admin" });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Categories supertest",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a category with an existing name", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@foobar.com", password: "admin" });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Categories supertest",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});

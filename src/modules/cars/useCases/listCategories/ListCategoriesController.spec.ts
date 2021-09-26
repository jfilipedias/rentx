import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List category controller.", () => {
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

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@foobar.com", password: "admin" });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Categories supertest",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category supertest");
    expect(response.body[0].description).toEqual("Categories supertest");
  });
});

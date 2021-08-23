import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, is_admin, created_at) 
    VALUES('${id}', 'Admin', 'admin@foobar.com', '${password}', '1234567890', true, 'now()')`
  );

  await connection.close();
}

create().then(() => console.log("Admin user created!"));

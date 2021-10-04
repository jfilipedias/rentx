import { app } from "./app";

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || "3333";

app.listen(port, () =>
  console.log(`Server is running in ${host}:${port}...`)
);

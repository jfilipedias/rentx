import { app } from "./app";

const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || "3333";

app.listen(process.env.PORT, () =>
  console.log(`Server is running in ${host}:${port}...`)
);

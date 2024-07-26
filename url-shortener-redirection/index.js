import express from "express";
import router from "./routes/routes.js";
import "./database/connection.js";

const app = express();
const PORT = 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(router);

app.listen(PORT, () => {
  const name = process.env.npm_package_name;
  const version = process.env.npm_package_version;
  const message = `${name} ${version} is running on port ${PORT}`;
  console.log(message);
});

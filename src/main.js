import cors from "cors";
import 'dotenv/config';
import express from "express";
import { fileURLToPath } from "url";
import routes from "./app/modules/routes.js";
import db from "./config/db.js"

import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Serves images
app.use(express.static(__dirname + "/assets"));

app.get("/", (req, res) => {
  res.json({ status: "API is running on /api" });
});

app.all("*",(req, res, next)=>{
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  if (err && err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: "error",
      message: "missing authorization credentials",
    });
  } else if (err && err.errorCode) {
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();
  console.info(`server up on port ${PORT}`);
});

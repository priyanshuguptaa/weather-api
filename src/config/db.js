import sqlite3 from "sqlite3";
import logger from "./logger.js";

const dbName = "weather.sqlite";
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    logger.error({
      message: err?.message,
      stack: err?.stack,
      type: 'DATABASE'
    })
    process.exit(1);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE,
            lat DECIMAL(9,6) NOT NULL,
            long DECIMAL(9,6) NOT NULL
        )`,
      (error) => {
        if (error) {
          logger.error({
            message: error?.message,
            stack: error?.stack,
            type: 'DATABASE'
          })
          process.exit(1);
        } else {
          console.log("DATABASE connected successfully");
        }
      }
    );
  }
});

export default db;

import sqlite3 from "sqlite3";

const dbName = "weather.sqlite"
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  } else {
    console.log("Connected to the Database");
    db.run(
      `CREATE TABLE IF NOT EXISTS locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            lat DECIMAL(9,6) NOT NULL,
            long DECIMAL(9,6) NOT NULL
        )`,
      (error) => {
        if (error) {
          console.error(error.message);
          process.exit(1);
        } else {
          console.log("Table created");
        }
      }
    );
  }
});

export default db;

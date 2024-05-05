import db from "../../../config/db.js";

export default class LocationDbService {
  /**
   * Inserts a new location record into the database.
   * @param {Object} data - The data of the location to be inserted.
   * @returns {Promise} A promise that resolves with the result of the insertion.
   */
  static async insert(data) {
    try {
      const sql = `INSERT INTO locations (name, lat, long) VALUES (?, ?, ?);`;
      const values = [data.name, data.lat, data.long];

      const result = await new Promise((resolve, reject) => {
        db.run(sql, values, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this);
          }
        });
      });

      return result;
    } catch (error) {
      // Handle the error
      console.error("Error inserting data:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  /**
   * Updates an existing location record in the database.
   * @param {number} id - The ID of the location to be updated.
   * @param {Object} updates - The updates to be applied to the location.
   * @returns {Promise} A promise that resolves with the number of rows updated.
   */
  static async update(id, updates) {
    try {
      if (!updates || Object.keys(updates).length === 0) {
        throw new Error("No column is provided to update");
      }

      const setValues = [];
      const setStatements = [];

      for (const key in updates) {
        setStatements.push(`${key} = ?`);
        setValues.push(updates[key]);
      }

      const setClause = setStatements.join(", ");

      const sql = `UPDATE locations SET ${setClause} WHERE id = ?;`;
      const values = [...setValues, id];

      const result = await new Promise((resolve, reject) => {
        db.run(sql, values, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });

      return result;
    } catch (error) {
      // Handle the error
      console.error("Error updating data:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  /**
   * Deletes a location record from the database.
   * @param {number} id - The ID of the location to be deleted.
   * @returns {Promise} A promise that resolves with the number of rows deleted.
   */
  static async delete(id) {
    try {
      const sql = `DELETE FROM locations WHERE id = ?;`;
      const values = [id];

      const result = await new Promise((resolve, reject) => {
        db.run(sql, values, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });

      return result;
    } catch (error) {
      // Handle the error
      console.error("Error deleting data:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  /**
   * Fetches a page of location records from the database.
   * @param {number} pageSize - The number of records per page.
   * @param {number} pageNumber - The page number to fetch.
   * @returns {Promise} A promise that resolves with the fetched records.
   */
  static async fetch(pageSize, pageNumber) {
    try {
      const offset = (pageNumber - 1) * pageSize;
      const sql = `SELECT * FROM locations LIMIT ? OFFSET ?;`;
      const values = [pageSize, offset];

      const rows = await new Promise((resolve, reject) => {
        db.all(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      return rows;
    } catch (error) {
      // Handle the error
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  /**
   * Counts the total number of location records in the database.
   * @returns {Promise} A promise that resolves with the total count of records.
   */
  static async count() {
    try {
      const sql = "SELECT COUNT(*) AS total_count FROM locations;";
      const row = await new Promise((resolve, reject) => {
        db.get(sql, [], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      return row.total_count;
    } catch (error) {
      // Handle the error
      console.error("Error counting data:", error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  }
}

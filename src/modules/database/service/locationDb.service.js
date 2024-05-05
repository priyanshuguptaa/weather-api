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
      
      console.error("Error inserting data:", error);
      error.type = "DATABASE"
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
      console.log("db update", id, updates)
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
    
      console.error("Error updating data:", error);
      error.type = "DATABASE"
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
      error.type = "DATABASE"
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  /**
   * Fetches a page of location records from the database.
   * @param {number} pageSize - The number of records per page.
   * @param {number} pageNumber - The page number to fetch.
   * @returns {Promise} A promise that resolves with the fetched records.
   */
  static async fetchAll(skip, limit) {
    try {
      console.log(skip,limit, "fetchall")
      const sql = `SELECT * FROM locations LIMIT ? OFFSET ?;`;
      const values = [limit, skip];

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
      error.type = "DATABASE"
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
      error.type = "DATABASE"
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

  /**
   * Fetches location records from the database based on name.
   * @param {string} name - The name to search for.
   * @returns {Promise} A promise that resolves with the array of location records.
   */
  static async fetchByName(name) {
    try {
      const sql = "SELECT * FROM locations WHERE name = ?;";
      const rows = await new Promise((resolve, reject) => {
        db.all(sql, [name], (err, rows) => {
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
      console.error("Error fetching data by name:", error);
      error.type = "DATABASE"
      throw error; // Re-throw the error to propagate it to the caller
    }
  }

    /**
   * Fetches location records from the database based on name.
   * @param {string} id - The id to search for.
   * @returns {Promise} A promise that resolves with the array of location records.
   */
    static async fetchById(id) {
      try {
        const sql = "SELECT * FROM locations WHERE id = ?;";
        const rows = await new Promise((resolve, reject) => {
          db.all(sql, [id], (err, rows) => {
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
        console.error("Error fetching data by name:", error);
        error.type = "DATABASE"
        throw error; // Re-throw the error to propagate it to the caller
      }
    }
}

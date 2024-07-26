import database from "../database/connection.js";

const createUrlsTableSQL = `
CREATE TABLE IF NOT EXISTS urls (
    id serial PRIMARY KEY,
    short_url varchar(255) UNIQUE,
    destination_url varchar(255),
    created_by integer REFERENCES users(id),
    visit_count integer DEFAULT 0,
    is_active Boolean DEFAULT TRUE
);
`;

async function createUrlsTable() {
  try {
    await database.query(createUrlsTableSQL);
    console.log("Urls table created");
  } catch (error) {
    return console.log("Error creating todos table", error);
  }
}

export default createUrlsTable;

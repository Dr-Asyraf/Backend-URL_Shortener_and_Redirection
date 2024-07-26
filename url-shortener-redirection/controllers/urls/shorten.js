import database from "../../database/connection.js";
import { nanoid } from "nanoid"; //npm package to generate random characters

const query = `
INSERT INTO urls (short_url, destination_url, created_by) VALUES ($1, $2, $3) RETURNING id, short_url, destination_url, created_by
`;

async function createShortUrl(req, res) {
  try {
    const { destinationUrl } = req.body;
    if (!destinationUrl) {
      return res.status(400).json({ error: "Url is required" });
    }
    const created_by = req.user.id;
    const shortUrl = nanoid(8); // Set to 8 characters

    const values = [shortUrl, destinationUrl, created_by];

    const dbRes = await database.query(query, values);
    const url = dbRes.rows[0];
    const data = {
      message: "Short url created successfully",
      data: url,
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default createShortUrl;

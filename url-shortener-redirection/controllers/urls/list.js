import database from "../../database/connection.js";

const query = `
SELECT id, short_url, destination_url FROM urls WHERE created_by = $1
`;

async function listUrls(req, res) {
  try {
    const createdBy = req.user.id;
    const dbRes = await database.query(query, [createdBy]);
    const urls = dbRes.rows;
    const data = {
      message: "Urls listed succesfully",
      data: urls,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default listUrls;

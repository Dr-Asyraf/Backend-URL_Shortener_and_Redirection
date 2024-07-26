import database from "../../database/connection.js";

const query = `
SELECT visit_count FROM urls WHERE id = $1 AND created_by = $2
`;

async function analytics(req, res) {
  try {
    const urlId = req.params.id;
    const userId = req.user.id;

    const dbRes = await database.query(query, [urlId, userId]);
    const url = dbRes.rows[0];

    if (!url) {
      return res.status(400).json({ message: "Url not found" });
    }
    return res.json({ visit_count: url.visit_count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default analytics;

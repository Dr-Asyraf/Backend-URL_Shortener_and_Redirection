import database from "../../database/connection.js";

const getUrlQuery = `
SELECT * FROM urls WHERE id = $1 AND created_by = $2;
`;

const updateQuery = `
UPDATE urls
SET destination_url = $1 WHERE id = $2 AND created_by = $3
`;

async function updateUrl(req, res) {
  try {
    //   update field from body
    const destinationUrl = req.body.destinationUrl;
    const urlId = req.params.id;
    const userId = req.user.id;

    // get default url from db
    const getUrlDb = await database.query(getUrlQuery, [urlId, userId]);
    const defaultUrl = getUrlDb.rows[0];

    if (!defaultUrl) {
      return res.status(404).json({ error: "Url not found" });
    }

    // update url
    const values = [
      destinationUrl || defaultUrl.destination_url,
      urlId,
      userId,
    ];
    const dbRes = await database.query(updateQuery, values);

    if (dbRes.rowCount === 0) {
      return res.status(404).json({ error: "Url not found" });
    }

    const data = {
      message: `Url updated id ${urlId} successfully`,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default updateUrl;

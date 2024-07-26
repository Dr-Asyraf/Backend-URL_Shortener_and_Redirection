import database from "../../database/connection.js";

async function redirectUrl(req, res) {
  try {
    const { shortUrl } = req.params;
    const result = await database.query(
      "SELECT * FROM urls WHERE short_url = $1",
      [shortUrl]
    );
    const url = result.rows[0];

    if (!url) {
      return res.status(404).send("URL not found");
    }

    //Increment visit count to track analytics
    await database.query(
      "UPDATE urls SET visit_count = visit_count + 1 WHERE short_url = $1",
      [shortUrl]
    );

    return res.redirect(url.destination_url);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default redirectUrl;

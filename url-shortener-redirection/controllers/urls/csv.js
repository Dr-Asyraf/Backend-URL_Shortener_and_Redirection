import database from "../../database/connection.js";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const query = `
SELECT * FROM urls
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCsv(req, res) {
  try {
    const dbRes = await database.query(query);
    const urls = dbRes.rows;

    //Define the file path for the csv
    const filePath = path.join(__dirname, "urls_report.csv");

    //Define the csv writer
    //Set up the csv writer with the file path and column headers
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: "short_url", title: "Short Url" },
        { id: "destination_url", title: "Destination URL" },
        { id: "created_by", title: "Created By" },
        { id: "visit_count", title: "Visit Count" },
      ],
    });

    //Write the csv file
    //Write the data to the csv file
    await csvWriter.writeRecords(urls);

    //Send the csv file to the user as a download
    res.download(filePath, "urls_report.csv", (err) => {
      if (err) {
        return res.status(500).json({ error: "Error generating report" });
      }
      // Delete the csv file after sending it to avoid leaving temporary files on the server
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default generateCsv;

import path from 'path';
import fs from 'fs';

export default (req, res) => {
    try {
        console.log("Fetching data with filters:", req.query);

        const publicDir = path.join(process.cwd(), 'public');
        const jsonData = JSON.parse(fs.readFileSync(path.join(publicDir, 'integratedData.json')));

        let query = {};

        if (req.query.region) {
            query.Region = new RegExp(req.query.region, 'i');
        }
        if (req.query.constellation) {
            query.Constellation = new RegExp(req.query.constellation, 'i');
        }
        if (req.query.system) {
            query.System = new RegExp(req.query.system, 'i');
        }
        if (req.query.resource) {
            query.Resource = new RegExp(req.query.resource, 'i');
        }

        console.log("Constructed query:", query);

        let filteredData = jsonData.filter(item => {
            return Object.keys(query).every(key => query[key].test(item[key]));
        });

        // If there's a Resource in the query, sort by proximity
        if (req.query.resource) {
            filteredData.sort((a, b) => {
                return calculateProximity(a, query) - calculateProximity(b, query);
            });
        }
        console.log("Sample Results:", filteredData.slice(0, 5));

        return res.status(200).json(filteredData.slice(0, 50));  // Limit the results to 50

    } catch (error) {
        console.error("Error in fetchData:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

function calculateProximity(dataItem, query) {
    let score = 0;

    // Check each attribute. If it matches exactly, increase the score
    if (dataItem.Region && query.Region && dataItem.Region.toLowerCase() === query.Region.source.toLowerCase()) score += 3;
    if (dataItem.Constellation && query.Constellation && dataItem.Constellation.toLowerCase() === query.Constellation.source.toLowerCase()) score += 2;
    if (dataItem.System && query.System && dataItem.System.toLowerCase() === query.System.source.toLowerCase()) score += 1;

    return -score;  // We return negative score to sort in descending order (higher scores first)
}

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

        console.log("Constructed query:", query);  // Added this for debugging

        let filteredData = jsonData.filter(item => {
            for (let key in query) {
                if (!query[key].test(item[key])) return false;
            }
            return true;
        });

        return res.status(200).json(filteredData.slice(0, 100));  // Limit the results to 100

    } catch (error) {
        console.error("Error in fetchData:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

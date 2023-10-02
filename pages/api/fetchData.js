import Datastore from 'nedb-promises';

const db = Datastore.create({ filename: 'mydatabase.db', autoload: true });

export default async (req, res) => {
    try {
        console.log("Fetching data with filters:", req.query);

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

        console.log("Constructed query:", query);

        const data = await db.find(query);

        return res.status(200).json(data);

    } catch (error) {
        console.error("Error in fetchData:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

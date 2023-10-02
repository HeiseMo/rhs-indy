import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import Datastore from 'nedb-promises';

const parseCSV = filepath => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

export default async (req, res) => {
    try {
        const db = new Datastore({ filename: path.join(process.cwd(), 'mydatabase.db'), autoload: true });

        const publicDir = path.join(process.cwd(), 'public');

        const planetData = await parseCSV(path.join(publicDir, 'PlanetaryProduction.csv'));
        const systemData = await parseCSV(path.join(publicDir, 'Systems.csv'));

        let integratedData = planetData.map(planet => {
            const relatedSystem = systemData.find(system => system.Name === planet.System);
            return {
                PlanetID: planet.PlanetID,
                Region: planet.Region,
                Constellation: planet.Constellation,
                System: planet.System,
                PlanetName: planet.PlanetName,
                PlanetType: planet.PlanetType,
                Resource: planet.Resource,
                Richness: planet.Richness,
                Output: planet.Output,
                DistanceToJita: relatedSystem?.DistanceToJita,
                ID: relatedSystem?.ID,
                Neighbors: relatedSystem?.Neighbors,
                Planets: relatedSystem?.Planets,
                Security: relatedSystem?.Security
            };
        });

        // Clear previous data and insert the new integratedData into the database
        await db.remove({}, { multi: true });
        await db.insert(integratedData);

        res.status(200).json({ success: true, message: "Data loaded successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

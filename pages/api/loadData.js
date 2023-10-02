import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

export default async (req, res) => {
    const publicDir = path.join(process.cwd(), 'public');

    const parseCSV = filepath => {
        const results = [];
        return new Promise((resolve) => {
            fs.createReadStream(filepath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results));
        });
    };

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

    fs.writeFileSync(path.join(publicDir, 'integratedData.json'), JSON.stringify(integratedData, null, 2));

    res.status(200).json({ message: 'Data successfully integrated and saved as JSON.' });
}

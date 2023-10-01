// pages/api/fetchData.js
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

export default async (req, res) => {
    const publicDir = path.join(process.cwd(), 'public');

    const parseCSV = filepath => {
        const results = [];
        return new Promise((resolve) => {
            fs.createReadStream(filepath)
                .pipe(csv({ headers: true, skip_empty_lines: true }))
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results));
        });
    };

    const planetData = (await parseCSV(path.join(publicDir, 'PlanetaryProduction.csv'))).slice(1);
    const systemData = (await parseCSV(path.join(publicDir, 'Systems.csv'))).slice(1);
    
let integratedData = planetData.map(planet => {
    const relatedSystem = systemData.find(system => system._4 === planet._3);
    return {
        PlanetID: planet._0,
        Region: planet._1,
        Constellation: planet._2,
        System: planet._3,
        PlanetName: planet._4,
        PlanetType: planet._5,
        Resource: planet._6,
        Richness: planet._7,
        Output: planet._8,
        DistanceToJita: relatedSystem?._1,
        ID: relatedSystem?._0,
        Neighbors: relatedSystem?._6,
        Planets: relatedSystem?._7,
        Security: relatedSystem?._5  // Added this line to integrate the Security attribute.
    };
});


    
    const { region, constellation, system } = req.query;
    if (region) {
        integratedData = integratedData.filter(item => item.Region?.toLowerCase().includes(region.toLowerCase()));
        console.log("i got to region")
    }

    if (constellation) {
        integratedData = integratedData.filter(item => item.Constellation?.toLowerCase().includes(constellation.toLowerCase()));
    }

    if (system) {
        integratedData = integratedData.filter(item => item.System?.toLowerCase().includes(system.toLowerCase()));
    }

    res.status(200).json(integratedData);
}

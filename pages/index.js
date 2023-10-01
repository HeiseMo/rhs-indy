import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import SearchFilter from '../app/components/SearchFilter';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';

function HomePage({ initialData }) {
  const [data, setData] = useState(initialData);

  const handleFilter = (filters) => {
    let filteredData = [...initialData];

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filteredData = filteredData.filter(item =>
          item[key]?.toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    setData(filteredData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Planetary Resources Finder
      </Typography>

      <SearchFilter onFilter={handleFilter} />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Security</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Constellation</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Planet Name</TableCell>
              <TableCell>Resource</TableCell>
              <TableCell>Output</TableCell>
              <TableCell>Planet Type</TableCell>
              <TableCell>Richness</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.PlanetID}>
                <TableCell>{item.Security > 0.4 ? 'High Sec' : (0.0 < item.Security && item.Security <= 0.4) ? 'Low Sec' : 'Null Sec'}</TableCell>
                <TableCell>{item.Region}</TableCell>
                <TableCell>{item.Constellation}</TableCell>
                <TableCell>{item.System}</TableCell>
                <TableCell>{item.PlanetName}</TableCell>
                <TableCell>{item.Resource}</TableCell>
                <TableCell>{item.Output}</TableCell>
                <TableCell>{item.PlanetType}</TableCell>
                <TableCell>{item.Richness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export async function getStaticProps() {
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

  const planetData = await parseCSV(path.join(publicDir, 'PlanetaryProduction.csv'));
  const systemData = await parseCSV(path.join(publicDir, 'Systems.csv'));

  const integratedData = planetData.map(planet => {
    const relatedSystem = systemData.find(system => system.Name === planet.System);
    return { ...planet, ...relatedSystem };
  });

  return {
    props: { initialData: integratedData }
  };
}

export default HomePage;

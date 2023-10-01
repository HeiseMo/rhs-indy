import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import SearchFilter from '../app/components/SearchFilter';

function HomePage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchDataFromAPI = async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/fetchData?${queryParams}`);
    const fetchedData = await response.json();
    setData(fetchedData);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Planetary Resources Finder

      </Typography>

      <SearchFilter onFilter={handleFilter} />
      <Button variant="contained" color="primary" onClick={() => fetchDataFromAPI(filters)}>
        Submit
      </Button>
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

export default HomePage;

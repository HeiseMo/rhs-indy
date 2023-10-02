import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Divider  } from '@mui/material';
import SearchFilter from '../app/components/SearchFilter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e5b50a', // Gold tone
    },
    background: {
      default: '#3d3d3d',
      paper: '#1e1f3281',
    },
    text: {
      primary: '#e5e5e5',
      secondary: '#e5b50a',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#c7d0df',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border
        },
      },
    },
  },
});

function HomePage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isDBLoaded, setIsDBLoaded] = useState(false);

  useEffect(() => {
    async function loadDataIfNeeded() {
      const checkRes = await fetch(`/api/checkDataExistence`);
      const checkData = await checkRes.json();
      if (!checkData.exists) {
        await fetch('/api/loadData');
      }
      setIsDBLoaded(true);
    }
    loadDataIfNeeded();
  }, []);

  const fetchDataFromAPI = async (filters) => {
    setData([]);  // Clear old data
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/fetchData?${queryParams}`);
    const fetchedData = await response.json();
    setData(fetchedData);
  };
  
    const handleFilter = (newFilters) => {
      setFilters(newFilters);
      fetchDataFromAPI(newFilters);  // Fetch data immediately after updating the filters
    };

    if(!isDBLoaded) {
      return <Typography>Loading...</Typography>
    }

  return(
    <ThemeProvider theme = { theme } >
    <CssBaseline />
    <Container>
      <Typography variant="h4" gutterBottom>
        Planetary Resources Finder
      </Typography>
      <Divider style={{ margin: '16px 0' }} />
      <SearchFilter onFilter={handleFilter} />
      <Divider style={{ margin: '16px 0' }} />
      <Button variant="contained" color="primary" onClick={() => fetchDataFromAPI(filters)}>
    Submit
</Button>
      <Divider style={{ margin: '16px 0' }} />
      <Paper style={{ backgroundColor: '#3d3d3d' }}>
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
    </ThemeProvider >
  );
}

export default HomePage;

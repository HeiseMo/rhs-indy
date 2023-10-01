import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const SearchFilter = ({ onFilter }) => {
    const [regionInput, setRegionInput] = useState('');
    const [constellationInput, setConstellationInput] = useState('');
    const [systemInput, setSystemInput] = useState('');

    const handleInputChange = (field, value) => {
        let updatedFilters = {
          region: regionInput,
          constellation: constellationInput,
          system: systemInput
        };
    
        if (field === 'region') updatedFilters.region = value;
        if (field === 'constellation') updatedFilters.constellation = value;
        if (field === 'system') updatedFilters.system = value;
    
        onFilter(updatedFilters);  // Use the updated filters directly, without waiting for state update
    
        // You can still update the state for controlled components
        if (field === 'region') setRegionInput(value);
        if (field === 'constellation') setConstellationInput(value);
        if (field === 'system') setSystemInput(value);
    
        console.log(updatedFilters, 'updatedFilters');
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Region"
                    variant="outlined"
                    value={regionInput}
                    onChange={(e) => {
                        console.log("Region input:", e.target.value); // Logging for debugging
                        handleInputChange('region', e.target.value);
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Constellation"
                    variant="outlined"
                    value={constellationInput}
                    onChange={(e) => {
                        console.log("Constellation input:", e.target.value); // Logging for debugging
                        handleInputChange('constellation', e.target.value);
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="System"
                    variant="outlined"
                    value={systemInput}
                    onChange={(e) => {
                        console.log("System input:", e.target.value); // Logging for debugging
                        handleInputChange('system', e.target.value);
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default SearchFilter;

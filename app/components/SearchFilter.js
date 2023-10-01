import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const SearchFilter = ({ onFilter }) => {
    const [regionInput, setRegionInput] = useState('');
    const [constellationInput, setConstellationInput] = useState('');
    const [systemInput, setSystemInput] = useState('');

    const handleInputChange = (field, value) => {
        if (field === 'region') setRegionInput(value);
        if (field === 'constellation') setConstellationInput(value);
        if (field === 'system') setSystemInput(value);

        onFilter({
            region: regionInput,
            constellation: constellationInput,
            system: systemInput
        });

        console.log({ regionInput, constellationInput, systemInput }); // Logging the current filter values
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

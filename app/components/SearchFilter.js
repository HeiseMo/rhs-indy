import React, { useState } from 'react';
import { TextField, Grid, Menu, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            width: '120px',
            borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border
        },
        '&:hover fieldset': {
            borderColor: '#e5b50a', // Gold tone for hover effect
        },
        '&.Mui-focused fieldset': {
            borderColor: '#e5b50a', // Gold tone when focused
        },
    },
    '& .MuiInputLabel-root': {
        color: '#e5e5e5',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#e5b50a', // Gold tone when label is above (after focusing)
    },
    '& .MuiInputBase-input': {
        color: '#e5e5e5',
    },
});


function SearchFilter({ onFilter }) {
    const [regionInput, setRegionInput] = useState('');
    const [constellationInput, setConstellationInput] = useState('');
    const [systemInput, setSystemInput] = useState('');
    const [resource, setResource] = useState('');

    const handleInputChange = (field, value) => {
        const updatedFilters = {
            region: regionInput,
            constellation: constellationInput,
            system: systemInput,
            resource: resource,
        };
        updatedFilters[field] = value;
        onFilter(updatedFilters);

        if (field === 'region') setRegionInput(value);
        if (field === 'constellation') setConstellationInput(value);
        if (field === 'system') setSystemInput(value);
        if (field === 'resource') setResource(value); // <-- Add this line

    };

return (
    <Grid container spacing={1}>
        <Grid item xs={8} sm={2}>
            <StyledTextField
                fullWidth
                label="Region"
                variant="outlined"
                value={regionInput}
                onChange={(e) => handleInputChange('region', e.target.value)}
            />
        </Grid>

        <Grid item xs={8} sm={2}>
            <StyledTextField
                fullWidth
                label="Constellation"
                variant="outlined"
                value={constellationInput}
                onChange={(e) => handleInputChange('constellation', e.target.value)}
            />
        </Grid>

        <Grid item xs={8} sm={2}>
            <StyledTextField
                fullWidth
                label="System"
                variant="outlined"
                value={systemInput}
                onChange={(e) => handleInputChange('system', e.target.value)}
            />
        </Grid>

        <Grid item xs={10} sm={3}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="resource-label">Resources</InputLabel>
                <Select
                    labelId="resource-label"
                    id="resource-select"
                    value={resource}
                    onChange={(event) => handleInputChange('resource', event.target.value)} // <-- Modify this line
                    label="Resources"
                >
                    <MenuItem value="Base Metals">Base Metals</MenuItem>
                    <MenuItem value="Condensates">Condensates</MenuItem>
                    <MenuItem value="Condensed Alloy">Condensed Alloy</MenuItem>
                    <MenuItem value="Construction Blocks">Construction Blocks</MenuItem>
                    <MenuItem value="Coolant">Coolant</MenuItem>
                    <MenuItem value="Crystal Compound">Crystal Compound</MenuItem>
                    <MenuItem value="Dark Compound">Dark Compound</MenuItem>
                    <MenuItem value="Fiber Composite">Fiber Composite</MenuItem>
                    <MenuItem value="Gleaming Alloy">Gleaming Alloy</MenuItem>
                    <MenuItem value="Glossy Compound">Glossy Compound</MenuItem>
                    <MenuItem value="Heavy Metals">Heavy Metals</MenuItem>
                    <MenuItem value="Heavy Water">Heavy Water</MenuItem>
                    <MenuItem value="Industrial Fibers">Industrial Fibers</MenuItem>
                    <MenuItem value="Ionic Solutions">Ionic Solutions</MenuItem>
                    <MenuItem value="Liquid Ozone">Liquid Ozone</MenuItem>
                    <MenuItem value="Lucent Compound">Lucent Compound</MenuItem>
                    <MenuItem value="Lustering Alloy">Lustering Alloy</MenuItem>
                    <MenuItem value="Motley Compound">Motley Compound</MenuItem>
                    <MenuItem value="Nanites">Nanites</MenuItem>
                    <MenuItem value="Noble Gas">Noble Gas</MenuItem>
                    <MenuItem value="Noble Metals">Noble Metals</MenuItem>
                    <MenuItem value="Opulent Compound">Opulent Compound</MenuItem>
                    <MenuItem value="Oxygen Isotopes">Oxygen Isotopes</MenuItem>
                    <MenuItem value="Plasmoids">Plasmoids</MenuItem>
                    <MenuItem value="Polyaramids">Polyaramids</MenuItem>
                    <MenuItem value="Precious Alloy">Precious Alloy</MenuItem>
                    <MenuItem value="Reactive Gas">Reactive Gas</MenuItem>
                    <MenuItem value="Reactive Metals">Reactive Metals</MenuItem>
                    <MenuItem value="Sheen Compound">Sheen Compound</MenuItem>
                    <MenuItem value="Silicate Glass">Silicate Glass</MenuItem>
                    <MenuItem value="Smartfab Units">Smartfab Units</MenuItem>
                    <MenuItem value="Supertensile Plastics">Supertensile Plastics</MenuItem>
                    <MenuItem value="Suspended Plasma">Suspended Plasma</MenuItem>
                    <MenuItem value="Toxic Metals">Toxic Metals</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={10} sm={3}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="resource-label">Blueprints</InputLabel>
                <Select
                    labelId="resource-label"
                    id="resource-select"
                    value={resource}
                    onChange={(event) => setResource(event.target.value)}
                    label="Resources"
                >
                    <MenuItem value="Base Metals">Base Metals</MenuItem>
                    <MenuItem value="Condensates">Condensates</MenuItem>
                    <MenuItem value="Condensed Alloy">Condensed Alloy</MenuItem>
                    <MenuItem value="Construction Blocks">Construction Blocks</MenuItem>
                    <MenuItem value="Coolant">Coolant</MenuItem>
                    <MenuItem value="Crystal Compound">Crystal Compound</MenuItem>
                    <MenuItem value="Dark Compound">Dark Compound</MenuItem>
                    <MenuItem value="Fiber Composite">Fiber Composite</MenuItem>
                    <MenuItem value="Gleaming Alloy">Gleaming Alloy</MenuItem>
                    <MenuItem value="Glossy Compound">Glossy Compound</MenuItem>
                    <MenuItem value="Heavy Metals">Heavy Metals</MenuItem>
                    <MenuItem value="Heavy Water">Heavy Water</MenuItem>
                    <MenuItem value="Industrial Fibers">Industrial Fibers</MenuItem>
                    <MenuItem value="Ionic Solutions">Ionic Solutions</MenuItem>
                    <MenuItem value="Liquid Ozone">Liquid Ozone</MenuItem>
                    <MenuItem value="Lucent Compound">Lucent Compound</MenuItem>
                    <MenuItem value="Lustering Alloy">Lustering Alloy</MenuItem>
                    <MenuItem value="Motley Compound">Motley Compound</MenuItem>
                    <MenuItem value="Nanites">Nanites</MenuItem>
                    <MenuItem value="Noble Gas">Noble Gas</MenuItem>
                    <MenuItem value="Noble Metals">Noble Metals</MenuItem>
                    <MenuItem value="Opulent Compound">Opulent Compound</MenuItem>
                    <MenuItem value="Oxygen Isotopes">Oxygen Isotopes</MenuItem>
                    <MenuItem value="Plasmoids">Plasmoids</MenuItem>
                    <MenuItem value="Polyaramids">Polyaramids</MenuItem>
                    <MenuItem value="Precious Alloy">Precious Alloy</MenuItem>
                    <MenuItem value="Reactive Gas">Reactive Gas</MenuItem>
                    <MenuItem value="Reactive Metals">Reactive Metals</MenuItem>
                    <MenuItem value="Sheen Compound">Sheen Compound</MenuItem>
                    <MenuItem value="Silicate Glass">Silicate Glass</MenuItem>
                    <MenuItem value="Smartfab Units">Smartfab Units</MenuItem>
                    <MenuItem value="Supertensile Plastics">Supertensile Plastics</MenuItem>
                    <MenuItem value="Suspended Plasma">Suspended Plasma</MenuItem>
                    <MenuItem value="Toxic Metals">Toxic Metals</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    </Grid>
);
}
export default SearchFilter;

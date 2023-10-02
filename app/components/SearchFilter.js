import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
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

    const handleInputChange = (field, value) => {
        const updatedFilters = {
            region: regionInput,
            constellation: constellationInput,
            system: systemInput,
        };
        updatedFilters[field] = value;
        onFilter(updatedFilters);

        if (field === 'region') setRegionInput(value);
        if (field === 'constellation') setConstellationInput(value);
        if (field === 'system') setSystemInput(value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
                <StyledTextField
                    fullWidth
                    label="Region"
                    variant="outlined"
                    value={regionInput}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <StyledTextField
                    fullWidth
                    label="Constellation"
                    variant="outlined"
                    value={constellationInput}
                    onChange={(e) => handleInputChange('constellation', e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <StyledTextField
                    fullWidth
                    label="System"
                    variant="outlined"
                    value={systemInput}
                    onChange={(e) => handleInputChange('system', e.target.value)}
                />
            </Grid>
        </Grid>
    );
}

export default SearchFilter;

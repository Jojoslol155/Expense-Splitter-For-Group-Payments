import React, { useEffect } from 'react'
import AddNewCard from './AddNewCard'
import { Grid } from '@mui/material'
function AddNew() {
    useEffect(() => {
        console.log('addbox');

    }, []);
    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <AddNewCard/>
        </Grid>
    );
}
export default AddNew;
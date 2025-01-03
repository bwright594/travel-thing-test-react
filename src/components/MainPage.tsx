import { Box, Divider, Grid2, Select } from '@mui/material';
import { DateTime } from 'luxon';
import { useState } from 'react';
import PictureGrid from './PictureGrid';

export default function MainPage() {
  const [ currentDate, setCurrentDate ] = useState<DateTime>(DateTime.now());

  return (
    <Box width='100%' height='100%'>
      <Box height='10%'>
        <Select label='Date' sx={{ m: 2 }}></Select>
      </Box>
      <Grid2 container height='90%'>
        <Grid2 size={{ xs: 4.5, md: 5.5 }} mx={2}>
          <PictureGrid/>
        </Grid2>
        <Grid2 size={0.2}>
          <Divider orientation='vertical'/>
        </Grid2>
        <Grid2 size={{ xs: 4.5, md: 5.5 }} mx={2}>
          <PictureGrid/>
        </Grid2>
      </Grid2>

    </Box>
  )
}

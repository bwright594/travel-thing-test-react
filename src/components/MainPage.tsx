import { AppBar, Box, Divider, Grid2, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import PictureGrid from './PictureGrid';

export default function MainPage() {
  const [ currentDate, setCurrentDate ] = useState<string>(DateTime.now().toISODate());
  const dates = Array.from({ length: 15 }, (_x, i) => DateTime.fromObject({ day: 5 + i, month: 1, year: 2025 }).toISODate());
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentDate(event.target.value);
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <Box width='100%' height='100%'>
      <AppBar position='static' enableColorOnDark sx={{ p: 2, width: windowWidth }}>
        <Typography variant='h4'>Trip Picture Tracker</Typography>
        <Box display='flex' alignItems={'center'}>
          <Typography variant='h5'>Pictures from: </Typography>
          <Select sx={{ mx: 2, mt: 1 }} value={currentDate} onChange={handleChange}>
            {dates.map(date => date ? <MenuItem key={date} value={date}>{date}</MenuItem> : <Typography key='empty'>how did that happen</Typography>)}
          </Select>
        </Box>
      </AppBar>
      <Grid2 container flexGrow={1} py={2}>
        <Grid2 size={{ xs: 4.9, md: 5.5 }} mx={2}>
          <PictureGrid person='Hailey' date={currentDate}/>
        </Grid2>
        <Grid2 size={0.2}>
          <Divider orientation='vertical'/>
        </Grid2>
        <Grid2 size={{ xs: 4.9, md: 5.5 }} mx={2}>
          <PictureGrid person='Bennett' date={currentDate}/>
        </Grid2>
      </Grid2>

    </Box>
  )
}

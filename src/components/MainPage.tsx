import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetPicturesQuery } from '../api-slice';
import PictureUploadDialog from './PictureUploadDialog';

export default function MainPage() {
  const { data: pictures, isError, isFetching } = useGetPicturesQuery();
  const [ pictureUploadOpen, setPictureUploadOpen ] = useState(false);
  return (
    <Box margin='auto' width='100%' display='flex' flexDirection='column' alignItems='center'>
      <PictureUploadDialog open={pictureUploadOpen} onClose={() => setPictureUploadOpen(false)}/>
      {!isFetching && !isError && pictures?.length === 0 && <Typography variant='h5'>No pictures found</Typography>}
      {isError && <Typography variant='h5'>Error fetching pictures</Typography>}
      {isFetching && <Typography variant='h5'>Loading...</Typography>}
      <Box display='flex'>
        {pictures?.map(picture => <img width='100px' height='100px' key={picture.id} src={picture.url}/>)}
      </Box>
      <Button variant="contained" component="span" onClick={() => setPictureUploadOpen(true)}>
        Add Picture
      </Button>
    </Box>
  )
}

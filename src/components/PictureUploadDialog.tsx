import { Backdrop, Box, Button, CircularProgress, Dialog, DialogTitle, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { defaultPicture, Picture, useAddPictureMutation } from '../api-slice';

export interface PictureUploadDialogProps {
  open: boolean;
  onClose: () => void;
  person: string;
  date: string;
}

export default function PictureUploadDialog({ open, onClose, person, date }: PictureUploadDialogProps) {
  const currentDefaultPicture = { ...defaultPicture, person, date };
  const [ picture, setPicture ] = useState<Picture>(currentDefaultPicture);
  const [ addPicture, { data, isLoading } ] = useAddPictureMutation();
  const handleSubmit = () => {
    console.log(picture);
    addPicture(picture)
      .then(() => console.log(data))
      .catch((e) => console.error(e))
      .finally(() => handleClose());
  }

  const handleClose = () => {
    onClose();
    setPicture(currentDefaultPicture);
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPicture((previous) => ({ ...previous, url: event.target?.result as string }));
      }
      reader.onerror = (event) => {
        console.error(event);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Upload Picture</DialogTitle>
      <TextField label='Name' onChange={(e) => setPicture((previous) => ({ ...previous, name: e.target.value }))}/>
      <input type='file' accept='image/*' onChange={handleUpload}/>
      <Box>
        {picture?.url && <Box><Typography> Preview </Typography><img width='100%' height='100%' src={picture.url} /></Box> }
        <Button onClick={handleClose} variant='contained'>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          Upload
        </Button>
      </Box>
      <Backdrop open={isLoading}>
        <CircularProgress/>
      </Backdrop>
    </Dialog>
  )
}

import { Box, Button, Dialog, DialogTitle, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { defaultPicture, Picture, useAddPictureMutation } from '../api-slice';

export interface PictureUploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function PictureUploadDialog({ open, onClose }: PictureUploadDialogProps) {
  const [ picture, setPicture ] = useState<Picture>(defaultPicture);
  const [ addPicture, data ] = useAddPictureMutation();
  const handleSubmit = () => {
    console.log(picture);
    addPicture(picture)
      .then(() => console.log(data))
      .catch((e) => console.error(e))
      .finally(() => handleClose());
  }

  const handleClose = () => {
    onClose();
    setPicture(defaultPicture);
  }

  useEffect(() => {
    console.log(picture);
  }, [open])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPicture((previous) => ({ ...previous, url: e.target?.result as string }));
      }
      reader.onerror = (e) => {
        console.error(e);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Upload Picture</DialogTitle>
      <TextField label='Name' onChange={(e) => setPicture((previous) => ({ ...previous, name: e.target.value }))}/>
      <TextField label='Person' onChange={(e) => setPicture((previous) => ({ ...previous, person: e.target.value }))}/>
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
    </Dialog>
  )
}

import { Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { defaultPicture, Picture, useAddPictureMutation } from '../api-slice';

export interface PictureUploadDialogProps {
  open: boolean;
  onClose: () => void;
  person: string;
  date: string;
}

export default function PictureUploadDialog({ open, onClose, person, date }: PictureUploadDialogProps) {
  const [ picture, setPicture ] = useState<Picture>({ ...defaultPicture, person, date });
  const [ addPicture, { data, isLoading } ] = useAddPictureMutation();

  const handleSubmit = () => {
    addPicture(picture)
      .then(() => console.log(data))
      .catch((e) => console.error(e))
      .finally(() => handleClose());
  }

  const handleClose = () => {
    onClose();
    setPicture({ ...defaultPicture, person, date });
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

  const uploadButtonTooltip = useMemo(() => {
    console.log(picture);
    let tooltip = '';
    if (!picture.name && picture.url) {
      tooltip = 'You must select a picture name';
    } else if (picture.name && !picture.url) {
      tooltip = 'You must select a picture';
    } else if (!picture.name && !picture.url) {
      tooltip = 'You must select a picture name and a picture';
    }
    console.log('tooltip', tooltip);
    return tooltip;
  }, [picture.name, picture.url]);

  useEffect(() => {
    setPicture(previous => ({ ...previous, date}));
  }, [date]);

  return (
    <Dialog onClose={() => {}} open={open}>
      <DialogTitle>Upload Picture</DialogTitle>
      <TextField label='Name' onChange={(e) => setPicture((previous) => ({ ...previous, name: e.target.value }))}/>
      <input type='file' accept='image/*' onChange={handleUpload}/>
      <DialogActions>
        {picture?.url && <Box><Typography> Preview </Typography><img width='100%' height='100%' src={picture.url} /></Box> }
        <Button onClick={handleClose} variant='contained'>
          Cancel
        </Button>
        <Tooltip title={uploadButtonTooltip} placement='top' disableInteractive>
          <span>
            <Button disabled={uploadButtonTooltip !== ''} variant='contained' onClick={handleSubmit}>
              Upload
            </Button>
          </span>
        </Tooltip>
      </DialogActions>
      <Backdrop open={isLoading}>
        <CircularProgress/>
      </Backdrop>
    </Dialog>
  )
}

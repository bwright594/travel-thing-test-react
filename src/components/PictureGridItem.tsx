import { Delete } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, Dialog, DialogTitle, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { Picture, useDeletePictureMutation } from "../api-slice";

export interface PictureGridItemProps {
  picture: Picture;
  onPictureClick: (picture: Picture) => void;
}

export default function PictureGridItem({ picture, onPictureClick }: PictureGridItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ deletePicture, { isLoading } ] = useDeletePictureMutation();

  const onDelete = () => {
    deletePicture(picture.id!).catch(e => console.error(e)).finally(() => setDeleteDialogOpen(false));
  }

  return (
    <Grid2 mx={2} size={{ xs: 12, md: 3 }}>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete "{picture.name}"?</DialogTitle>
        <Typography mx={3}>Are you sure you want to delete "{picture.name}"?</Typography>
        <Box p={2}>
          <Button variant='contained' onClick={() => setDeleteDialogOpen(false)} >Cancel</Button>
          <Button variant='contained' onClick={onDelete} sx={{ mx: 2 }}>Delete</Button>
        </Box>
      </Dialog>
      <Typography>{picture.name}</Typography>
      <img width='100%' src={picture.url} onClick={() => onPictureClick(picture)}/>
      <Button variant='contained' onClick={() => setDeleteDialogOpen(true)} color='error'><Delete/></Button>
      <Backdrop open={isLoading}>
        <CircularProgress/>
      </Backdrop>
    </Grid2>
  );
}

import { Button, Dialog, DialogTitle } from "@mui/material";
import { Picture } from "../api-slice";

export interface ViewPictureDialogProps {
  open: boolean;
  onClose: () => void;
  picture: Picture;
}

export default function ViewPictureDialog({ open, onClose, picture }: ViewPictureDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{picture.name}</DialogTitle>
      <img src={picture.url}/>
      <Button variant='contained' onClick={onClose}>Close</Button>
    </Dialog>
  )
}

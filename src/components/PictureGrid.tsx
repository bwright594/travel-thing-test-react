import { Button, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { defaultPicture, Picture, useGetPicturesQuery } from "../api-slice";
import PictureGridItem from "./PictureGridItem";
import PictureUploadDialog from "./PictureUploadDialog";
import ViewPictureDialog from "./ViewPictureDialog";

export interface PictureGridProps {
  person: string;
  date: string;
}

export default function PictureGrid({ person, date }: PictureGridProps) {
  const { data: pictures, isError, isFetching } = useGetPicturesQuery({ person, date });
  const [ pictureUploadOpen, setPictureUploadOpen ] = useState(false);
  const [ viewPictureOpen, setViewPictureOpen ] = useState(false);
  const [ currentPicture, setCurrentPicture ] = useState(defaultPicture);

  const openPictureDialog = (picture: Picture) => {
    setCurrentPicture(picture);
    setViewPictureOpen(true);
  }

  return (
    <>
      <PictureUploadDialog open={pictureUploadOpen} onClose={() => setPictureUploadOpen(false)} person={person} date={date}/>
      <ViewPictureDialog open={viewPictureOpen} onClose={() => setViewPictureOpen(false)} picture={currentPicture}/>
      <Typography variant='h4'>{person}'s Pictures</Typography>
      {!isFetching && !isError && pictures?.length === 0 && <Typography variant='h5'>No pictures found for {person} on {date}</Typography>}
      {isError && <Typography variant='h5'>Error fetching pictures.</Typography>}
      {isFetching && <Typography variant='h5'>Loading...</Typography>}
      <Grid2 container columnGap={3} rowGap={2}>
        {pictures?.map(picture => <PictureGridItem key={picture.id} picture={picture} onPictureClick={openPictureDialog}/>)}
      </Grid2>
      <Button variant="contained" component="span" onClick={() => setPictureUploadOpen(true)} sx={{ m: 2 }}>
        Add Picture
      </Button>
    </>
  );
}

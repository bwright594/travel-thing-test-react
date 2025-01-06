import { Button, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { useGetPicturesQuery } from "../api-slice";
import PictureUploadDialog from "./PictureUploadDialog";

export interface PictureGridProps {
  person: string;
  date: string;
}

export default function PictureGrid({ person, date } : PictureGridProps) {
  const { data: pictures, isError, isFetching } = useGetPicturesQuery({ person, date });
  const [ pictureUploadOpen, setPictureUploadOpen ] = useState(false);

  return (
    <>
      <PictureUploadDialog open={pictureUploadOpen} onClose={() => setPictureUploadOpen(false)} person={person} date={date}/>
      <Typography variant='h4'>{person}'s Pictures</Typography>
      {!isFetching && !isError && pictures?.length === 0 && <Typography variant='h5'>No pictures found for {person} on {date}</Typography>}
      {isError && <Typography variant='h5'>Error fetching pictures.</Typography>}
      {isFetching && <Typography variant='h5'>Loading...</Typography>}
      <Grid2 container columnGap={3} rowGap={2}>
        {pictures?.map(picture => <Grid2 key={picture.id} mx={2} size={{ xs: 12, md: 3 }}><Typography>{picture.name}</Typography><img width='100%' key={picture.id} src={picture.url}/></Grid2>)}
      </Grid2>
      <Button variant="contained" component="span" onClick={() => setPictureUploadOpen(true)} sx={{ m: 2 }}>
        Add Picture
      </Button>
    </>
  );
}

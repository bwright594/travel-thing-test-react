import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Picture {
  id?: number;
  name: string;
  person: string;
  // it's jank as hell, but url is the data url (e.g data:image/png;base64,....) when we upload it,
  // but downloading it it's an https url to display the image
  url: string;
  mediaType?: string;
  date: string;
}

export const defaultPicture : Picture = {
  name: '',
  person: '',
  url: '',
  date: ''
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/travel-thing-474ce/us-central1/api',
    baseUrl: 'https://us-central1-travel-thing-474ce.cloudfunctions.net/api',
  }),
  tagTypes: ['pictures'],
  endpoints: (build) => ({
    getPictures: build.query<Picture[], { person: string, date: string }>({
      query: (args) => ({
        url: '/pictures/', params: { person: args.person, date: args.date }
      }),
      providesTags: ['pictures']
    }),
    addPicture: build.mutation<Picture, Partial<Picture>>({
      query: (body) => ({
        url: '/pictures',
        method: 'POST',
        body
      }),
      invalidatesTags: ['pictures']
    })
  })
});

export const { useGetPicturesQuery, useAddPictureMutation } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Picture {
  id?: number;
  name: string;
  person: string;
  url: string;
}

export const defaultPicture : Picture = {
  name: '',
  person: '',
  url: ''
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/travel-thing-474ce/us-central1/api',
    baseUrl: 'https://us-central1-travel-thing-474ce.cloudfunctions.net/api',
  }),
  tagTypes: ['pictures'],
  endpoints: (build) => ({
    getPictures: build.query<Picture[], void>({
      query: () => "/pictures",
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

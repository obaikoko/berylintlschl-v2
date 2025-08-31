import { ANNOUNCEMENT_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const announcementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCEMENT_URL}/add`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Announcement'],
    }),
    getAnnouncementById: builder.query({
      query: (announcementId) => ({
        url: `${ANNOUNCEMENT_URL}/${announcementId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Announcement'],
      keepUnusedDataFor: 5,
    }),
    getAllAnnouncement: builder.query({
      query: () => ({
        url: `${ANNOUNCEMENT_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Announcement'],
      keepUnusedDataFor: 5,
    }),
    updateAnnouncement: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCEMENT_URL}/${data.announcementId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Announcement'],
    }),

    deleteAnnouncement: builder.mutation({
      query: (announcementId) => ({
        url: `${ANNOUNCEMENT_URL}/${announcementId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Announcement'],
    }),
  }),
});

export const {
  useCreateAnnouncementMutation,
  useGetAllAnnouncementQuery,
  useGetAnnouncementByIdQuery,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApiSlice;

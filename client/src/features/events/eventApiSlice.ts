import { EVENTS_URL } from '../constants';
import { apiSlice } from '../apiSlice';
import { EventSchema } from '@/schemas/eventSchema';

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventSchema[], void>({
      query: () => ({
        url: `${EVENTS_URL}`,
      }),
      providesTags: ['Events'],
      keepUnusedDataFor: 5,
    }),
    addEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Events'],
    }),
    updateEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/${data.eventId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Events'],
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENTS_URL}/${eventId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;

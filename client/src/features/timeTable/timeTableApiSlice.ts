import { TIMETABLE_URL } from '../constants';
import { apiSlice } from '../apiSlice';
import { TimeTableSchema } from '@/schemas/timeTableSchema';

export const timeTableApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTimeTable: builder.mutation({
      query: (data) => ({
        url: `${TIMETABLE_URL}/add`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['TimeTable'],
    }),
    getTimeTableById: builder.query({
      query: (timeTableId) => ({
        url: `${TIMETABLE_URL}/${timeTableId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['TimeTable'],
      keepUnusedDataFor: 5,
    }),
    getAllTimeTable: builder.query<TimeTableSchema[], void>({
      query: () => ({
        url: `${TIMETABLE_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['TimeTable'],
      keepUnusedDataFor: 5,
    }),
    getTimeTableForClass: builder.query<
      TimeTableSchema[],
      { level: string | null; subLevel: string | null }
    >({
      query: ({ level, subLevel }) => ({
        url: `${TIMETABLE_URL}/search/?level=${level}&subLevel=${subLevel}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['TimeTable'],
      keepUnusedDataFor: 5,
    }),
    updateTimeTable: builder.mutation({
      query: (data) => ({
        url: `${TIMETABLE_URL}/edit`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['TimeTable'],
    }),

    deleteTimeTable: builder.mutation({
      query: (timeTableId) => ({
        url: `${TIMETABLE_URL}/${timeTableId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['TimeTable'],
    }),
  }),
});

export const {
  useCreateTimeTableMutation,
  useGetAllTimeTableQuery,
  useGetTimeTableByIdQuery,
  useGetTimeTableForClassQuery,
  useUpdateTimeTableMutation,
  useDeleteTimeTableMutation,
} = timeTableApiSlice;

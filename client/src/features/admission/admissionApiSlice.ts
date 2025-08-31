import { ADMISSION_URL } from '../constants';
import { apiSlice } from '../apiSlice';

export const admissionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAdmission: builder.mutation({
      query: (data) => ({
        url: `${ADMISSION_URL}`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Admission'],
    }),
    getSingleAdmission: builder.query({
      query: (admissionId) => ({
        url: `${ADMISSION_URL}/${admissionId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Admission'],
      keepUnusedDataFor: 5,
    }),
    getAllAdmission: builder.query({
      query: () => ({
        url: `${ADMISSION_URL}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Admission'],
      keepUnusedDataFor: 5,
    }),

    deleteAdmission: builder.mutation({
      query: (admissionId) => ({
        url: `${ADMISSION_URL}/${admissionId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Admission'],
    }),
  }),
});

export const {
  useCreateAdmissionMutation,
  useGetSingleAdmissionQuery,
  useGetAllAdmissionQuery,
  useDeleteAdmissionMutation,
} = admissionApiSlice;

import { SUBJECTS_URL } from "../constants";
import { apiSlice } from "../apiSlice";

export const subjectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubject: builder.mutation({
      query: (data) => ({
        url: `${SUBJECTS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Subjects"],
    }),

    getSubjects: builder.query({
      query: () => ({
        url: `${SUBJECTS_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Subjects"],
      keepUnusedDataFor: 5,
    }),
    deleteSubjects: builder.mutation({
      query: (subjectId) => ({
        url: `${SUBJECTS_URL}/${subjectId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Subjects"],
    }),
  }),
});

export const {
  useCreateSubjectMutation,
  useGetSubjectsQuery,
  useDeleteSubjectsMutation,
} = subjectsApiSlice;

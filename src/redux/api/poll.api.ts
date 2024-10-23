import {
  DeletePollParams,
  GetPollParams,
  Poll,
  PollSet,
  VotePollParams,
} from '@/types/slices.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
  reducerPath: 'pollApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ['currentPoll', 'allPolls'],
  endpoints: (builder) => ({
    getPollAll: builder.query<Poll[], void>({
      query: () => ``,
      providesTags: ['allPolls'],
    }),
    setPoll: builder.mutation<Poll, PollSet>({
      query: (body) => ({
        url: ``,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['allPolls'],
    }),
    deletePoll: builder.mutation<Poll[], DeletePollParams>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allPolls'],
    }),
    getPoll: builder.query<Poll, GetPollParams>({
      query: ({ id }) => `${id}`,
      providesTags: ['currentPoll'],
    }),
    votePoll: builder.mutation<Poll[], VotePollParams>({
      query: ({ pollId, optionId: id }) => ({
        url: `${pollId}/vote`,
        method: 'POST',
        body: {
          id,
        },
      }),
      invalidatesTags: ['currentPoll', 'allPolls'],
    }),
  }),
});

// Export hooks for usage in functional components, which are

export const {
  useGetPollAllQuery,
  useVotePollMutation,
  useDeletePollMutation,
  useSetPollMutation,
  useGetPollQuery,
  useLazyGetPollQuery,
} = pollApi;

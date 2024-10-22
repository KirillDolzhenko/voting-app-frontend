import { DeletePollParams, Poll, PollSet, VotePollParams } from '@/types/slices.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pollApi = createApi({
  reducerPath: 'pollApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (builder) => ({
    getPollAll: builder.query<Poll[], void>({
      query: () => ``,
    }),
    setPoll: builder.mutation<Poll[], PollSet>({
      query: (body) => ({
        url: ``,
        method: 'POST',
        body,
      }),
    }),
    deletePoll: builder.mutation<Poll[], DeletePollParams>({
      query: ({ id }) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
    }),
    votePoll: builder.mutation<Poll[], VotePollParams>({
      query: ({ pollId, optionId: id }) => ({
        url: `${pollId}/vote`,
        method: 'POST',
        body: {
          id,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPollAllQuery,
  useVotePollMutation,
  useDeletePollMutation,
  useSetPollMutation,
} = pollApi;

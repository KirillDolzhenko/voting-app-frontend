import {
  DeletePollParams,
  GetPollParams,
  Poll,
  PollSet,
  VotePollParams,
} from '@/types/slices.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pollApi = createApi({
  reducerPath: 'pollApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ['currentPoll', 'allPolls'],
  endpoints: (builder) => ({
    getPollAll: builder.query<Poll[], number | void>({
      query: (page = 0) => `?page=${page}`,

      // Кешируется по значению 'getPollAll' так что при следующих вызовах, даже с другими аргументами, относится к этому же кэшу
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Так как кэш всега будет одинаков, то при изменении параметров ничего не будет менятся, поэтому добавляем следующую проверку на рефетч, по изменению аргументов
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      // Как мы обновили данные снова, то соединяем текущий кэш с новыми данными в новый кэш
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      keepUnusedDataFor: 0,
      providesTags: ['allPolls'],
    }),
    getPoll: builder.query<Poll, GetPollParams>({
      query: ({ id }) => `${id}`,
      providesTags: ['currentPoll'],
      keepUnusedDataFor: 0,
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

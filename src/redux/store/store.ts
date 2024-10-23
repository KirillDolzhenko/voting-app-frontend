import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import pollSlice from './slices/pollSlice';
import listSlice from './slices/listSlice';
import { pollApi } from '../api/poll.api';

export const store = configureStore({
  reducer: {
    pollSlice,
    listSlice,
    [pollApi.reducerPath]: pollApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pollApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

// setupListeners(store.dispatch)

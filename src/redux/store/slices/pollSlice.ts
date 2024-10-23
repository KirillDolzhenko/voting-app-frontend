import { IStatePollSlice, Poll } from '@/types/slices.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IStatePollSlice = {};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<number>) => {
      state.checkedOption = action.payload;
    },
    setPoll: (state, action: PayloadAction<Poll>) => {
      state.poll = action.payload;
    },
  },
});

export const { setChecked, setPoll } = pollSlice.actions;

export default pollSlice.reducer;

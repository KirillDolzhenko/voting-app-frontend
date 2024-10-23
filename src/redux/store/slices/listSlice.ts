import { IStateListSlice, Poll } from '@/types/slices.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IStateListSlice = {
  polls: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setCheckedPoll: (state, action: PayloadAction<number>) => {
      state.checked = action.payload;
    },
    setList: (state, action: PayloadAction<Poll[]>) => {
      state.polls = action.payload;
    },
  },
});

export const { setCheckedPoll, setList } = listSlice.actions;

export default listSlice.reducer;

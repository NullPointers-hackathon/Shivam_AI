// titleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const titleSlice = createSlice({
  name: 'title',
  initialState: {
    value: '',
  },
  reducers: {
    setTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTitle } = titleSlice.actions;

export default titleSlice.reducer;
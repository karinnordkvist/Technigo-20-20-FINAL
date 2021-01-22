import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
};

export const location = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

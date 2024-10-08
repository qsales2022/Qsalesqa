import { createSlice } from '@reduxjs/toolkit';

export interface GlobalSliceInterface {
  token: string;
}
const initialState: GlobalSliceInterface = {
  token: null,
};
export const tokenSlice = createSlice({
  name: 'tokenReducer',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;
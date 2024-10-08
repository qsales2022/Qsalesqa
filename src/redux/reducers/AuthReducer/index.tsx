import {createSlice} from '@reduxjs/toolkit';

export interface GlobalSliceInterface {
  language: string;
}
const initialState: GlobalSliceInterface = {
  language: 'en',
};
export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});
export const { updateLanguage } = authSlice.actions;
export default authSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export interface GlobalSliceInterface {
  count: number;
}
const initialState: GlobalSliceInterface = {
  count: 0,
};
export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    updateCount: (state, action) => {
      state.count = action.payload;
    },
  },
});
export const {updateCount} = cartSlice.actions;
export default cartSlice.reducer;

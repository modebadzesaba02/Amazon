import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = state.items.find((item) => item.id===action.payload.id)
        ?  [...state.items]
        : [...state.items, action.payload];
    },
  removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});
export const { addItem, removeItem } = CartSlice.actions;
export default CartSlice.reducer;  
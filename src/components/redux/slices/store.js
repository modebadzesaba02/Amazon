import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import tokenReducer from './TokenSlice';
export const store = configureStore({
  reducer: {
    cart: CartSlice,
    token: tokenReducer,
  },
});  
export default store;
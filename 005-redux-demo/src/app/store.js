import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "../features/Slider/sliderSlice";
import fabricsReducer from "../features/Fabrics/fabricsSlice";
import cartReducer from "../features/Cart/cartSlice"

export const store = configureStore({
  reducer: {
    slider: slideReducer,
    fabrics: fabricsReducer,
    cart: cartReducer,
  },
});

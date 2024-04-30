import { configureStore } from '@reduxjs/toolkit';
import slideReducer from '../features/Slider/sliderSlice'

export const store = configureStore({
  reducer: {
    slider: slideReducer
  },
});

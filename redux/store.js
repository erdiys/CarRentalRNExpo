import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducer/car/carSlice";
import carDetailsSlice from "./reducer/car/carDetailsSlice";
import authLoginSlice from "./reducer/auth/authLoginSlice";
import orderSlice from "./reducer/order/orderSlice";

// npm i @reduxjs/toolkit react-redux
export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetails: carDetailsSlice,
    login: authLoginSlice,
    order: orderSlice,
  },
  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(reactotron.createEnhancer())
      : getDefaultEnhancers()
});

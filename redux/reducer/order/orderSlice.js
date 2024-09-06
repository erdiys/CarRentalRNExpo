import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrder, deleteOrder } from "./orderAPI";

const initialState = {
  isLoading: false,
  data: {},
  carId: null,
  errorMessage: null,

  currentStep: null,
  selectedBank: null,
  promo: null,
  paymentCountdown: null,
  verificationCountdown: null
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    // post order
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.data = action.payload;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.data = { message: action.payload };
    });

    // put order slip
    builder.addCase(putOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.data = action.payload;
    });
    builder.addCase(putOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.data = { message: action.payload };
    });
  }
});

export { postOrder, putOrder, deleteOrder };
export const selectOrder = (state) => state.order; // selector
export const { resetState, setCarId, setStateByName } = orderSlice.actions;
export default orderSlice.reducer;

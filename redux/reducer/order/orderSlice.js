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
  verificationCountdown: null,

  status: null,
  activeStep: 0,
  imageDimension: {}
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
      state.status = null;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.data = action.payload;
      state.status = 'success';
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.data = { message: action.payload };
      state.status = 'error';
    });

    // put order slip
    builder.addCase(putOrder.pending, (state, action) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(putOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.data = action.payload;
      state.status = 'upload-success';
    });
    builder.addCase(putOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.data = { message: action.payload };
      state.status = 'error';
    });
  }
});

export { postOrder, putOrder, deleteOrder };
export const selectOrder = (state) => state.order; // selector
export const { resetState, setCarId, setStateByName } = orderSlice.actions;
export default orderSlice.reducer;

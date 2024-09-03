import { createSlice } from "@reduxjs/toolkit";
import { fetchRegister } from "./authAPI";

const authRegisterSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
    errorMessage: null
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.isError = true;
      state.errorMessage = action.error;
    });
  }
});

export const register = fetchRegister;
export const selectRegister = (state) => state.register; // selector
export default authRegisterSlice.reducer;

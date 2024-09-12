import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "./authAPI";
import * as SecureStored from "expo-secure-store";

const save = (key, value) => {
  SecureStored.setItem(key, value);
};

const delItem = async (key) => {
  await SecureStored.deleteItemAsync(key);
};

const load = (key) => {
  return SecureStored.getItem(key);
};

const authLoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: {},
    isLogin: false,
    isError: false,
    errorMessage: null,
    state: null,
    googleLogin: {}
  },
  reducers: {
    logout: (state) => {
      state.data = {};
      state.googleLogin = {};
      state.isLogin = false;
      delItem("user");
    },
    reLogin: (state) => {
      state.isLogin = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = JSON.parse(load("user"));
    },
    googleLogin: (state, action) => {
      console.log(action);
      state.googleLogin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.isError = false;
      state.errorMessage = null;
      state.data = action.payload;
      save("user", JSON.stringify(action.payload));
      state.state = "login";
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isLogin = false;
      state.errorMessage = action.payload;
      state.data = { message: action.payload };
      state.state = "failed";
    });
  }
});

export const login = fetchLogin;
export const selectLogin = (state) => state.login; // selector
export const { logout, reLogin, googleLogin } = authLoginSlice.actions;
export default authLoginSlice.reducer;

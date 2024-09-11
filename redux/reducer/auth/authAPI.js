import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRegister = createAsyncThunk(
  "fetchRegister",
  async ({ email, password }) => {
    const res = await fetch(
      `https://api-car-rental.binaracademy.org/customer/auth/register`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: "Customer"
        })
      }
    ); // signal digunakan untuk memasukkan 'controller'/'abort' untuk clean-up
    return res?.json();
  }
);

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api-car-rental.binaracademy.org/customer/auth/login`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
);

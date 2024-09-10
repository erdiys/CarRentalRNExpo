import { createAsyncThunk } from "@reduxjs/toolkit";

export const postOrder = createAsyncThunk(
  "postOrder",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api-car-rental.binaracademy.org/customer/order`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            access_token: token
          },
          body: JSON.stringify({
            start_rent_at: formData.start,
            finish_rent_at: formData.finish,
            car_id: formData.id
          })
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const putOrder = createAsyncThunk(
  "putOrder",
  async ({ token, formData, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api-car-rental.binaracademy.org/customer/order/${id}/slip`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            access_token: token
          },
          body: formData
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "deleteOrder",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://api-car-rental.binaracademy.org/customer/order/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            access_token: token
          }
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);

      return body;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

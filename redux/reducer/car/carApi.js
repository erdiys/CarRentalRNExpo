import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("fetchCars", async (signal) => {
  const res = await fetch(
    `https://api-car-rental.binaracademy.org/customer/car`,
    { signal: signal }
  ); // signal digunakan untuk memasukkan 'controller'/'abort' untuk clean-up
  return res?.json();
});

export const fetchCarsDetails = createAsyncThunk(
  "fetchCarsDetails",
  async ({payload, signal}) => {
    const res = await fetch(
      `https://api-car-rental.binaracademy.org/customer/car/${payload}`, {signal:signal}
    );
    return res?.json();
  }
);

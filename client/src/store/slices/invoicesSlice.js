
// store/slices/invoicesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInvoices: (state, action) => {
      state.items = action.payload;
    },
    addInvoice: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setLoading, setError, setInvoices, addInvoice } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;

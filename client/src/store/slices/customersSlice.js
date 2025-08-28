import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.items = action.payload;   // ✅ replace list when fetching
    },
    addCustomer: (state, action) => {
      state.items.push(action.payload);  // ✅ add new one
    },
    updateCustomer: (state, action) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteCustomer: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
      if (state.selectedCustomer?.id === action.payload) {
        state.selectedCustomer = null;
      }
    },
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const {
  setCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  selectCustomer,
} = customersSlice.actions;

export default customersSlice.reducer;

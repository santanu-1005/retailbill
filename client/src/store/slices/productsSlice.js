import { createSlice } from '@reduxjs/toolkit';
// import { mockProducts } from '../../data/mockData';

const initialState = {
  items: [],
  searchTerm: '',
  categoryFilter: '',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    updateProductStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find(p => p.id === productId);
      if (product) {
        product.stock = Math.max(0, product.stock - quantity);
      }
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const {
  setSearchTerm,
  setCategoryFilter,
  updateProductStock,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;

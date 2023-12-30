import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] , categorys: [] },

  reducers: {
    initProducts(state,action) {
      debugger
      state.products = action.payload.products;
      state.categorys = action.payload.categorys;
    },
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice;

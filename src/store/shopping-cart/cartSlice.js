import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem(state, action) {
      toast.success(`Item added in cart.`,{
        autoClose:500
      })
      // Take data from action
      const newItem = action.payload;
      //Filtered new data in the initial state
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      // Total quantity will increase by 1
      if(!existingItem){
        state.totalQuantity++;
      }
      // If there is no new item in existing item, push the data of the new one to the array
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.img,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      // If there is new item, this will increase the quantity of its as well as the total price
      // Total price is calculated as the total price of the new item and the price of current item
      else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    removeItem(state, action) {
     debugger
     toast.error(`Item removed from cart.`,{
      autoClose: 500
     })
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    deleteItem(state, action) {
      debugger
      toast.error(`Item removed from cart.`,{
        autoClose: 500
       })
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    resetCart(state,action){
      state.cartItems = [];
      state.totalQuantity= 0;
      state.totalAmount=0;
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

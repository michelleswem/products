import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed:false,
  },
  reducers:{
    replaceCart(state, action){
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exisitingItem = state.items.find(
        (item) => item.id === newItem.id
      );
      state.changed = true
      state.totalQuantity++;
      if (!exisitingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity:1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exisitingItem.quantity++
         exisitingItem.totalPrice = exisitingItem.totalPrice + newItem.price;
      } 
      
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const exisitingItem = state.items.find((item) => item.id === id);
      state.changed = true
      state.totalQuantity--;
      if (exisitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exisitingItem.quantity--;
        exisitingItem.totalPrice =
          exisitingItem.totalPrice - exisitingItem.price;
      }
    },
  },
});






export const cartActions = cartSlice.actions;

export default cartSlice;

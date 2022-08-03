import { createSlice } from "@reduxjs/toolkit";
import uiActions from "./ui";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalPrice: 0
  },
  reducers: {
    setCart(state, action) {
      state.items = action?.payload?.items;
      state.totalAmount = action?.payload?.totalAmount;
      state.totalPrice = action?.payload?.totalPrice;
      console.log("payload", action.payload);
    },
    addToCart(state, action) {
      const item = state?.items?.find(
        (product) => product.id === action.payload.id
      );
      if (!item) {
        state?.items?.push({ ...action.payload, amount: 1 });
        state.totalAmount += 1;
        state.totalPrice += action.payload.price;
      }
    },
    increment(state, action) {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          state.totalAmount += 1;
          state.totalPrice += item.price;
          return { ...item, amount: (item.amount += 1) };
        }
        return { ...item };
      });
    },
    decrement(state, action) {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload) {
            state.totalAmount -= 1;
            state.totalPrice -= item.price;

            return item.amount === 1
              ? undefined
              : { ...item, amount: (item.amount -= 1) };
          }
          return { ...item };
        })
        .filter((item) => item !== undefined);
    }
  }
});

export const sendData = (cart) => {
  return async (dispatch) => {
    const sending = async () => {
      const res = await fetch(
        "https://book-app-test-692f0-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart)
        }
      );
      if (!res.ok) throw new Error("something went wrong!");
      const data = await res.json();
      return data;
    };
    try {
      await sending();
    } catch (err) {
      dispatch(uiActions.change({ status: "fail", message: err.message }));
    }
  };
};
export const getData = (cart) => {
  return async (dispatch) => {
    const sending = async () => {
      const res = await fetch(
        "https://book-app-test-692f0-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) throw new Error("something went wrong!");
      const data = await res.json();
      console.log(data);
      data && dispatch(cartSlice.actions.setCart(data));
    };
    await sending();
  };
};
export default cartSlice.actions;
export const cartReducer = cartSlice.reducer;

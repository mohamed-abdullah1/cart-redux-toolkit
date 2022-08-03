import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui-slice",
  initialState: {
    status: undefined,
    message: undefined
  },
  reducers: {
    change(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
    }
  }
});

export default uiSlice.actions;
export const uiReducer = uiSlice.reducer;

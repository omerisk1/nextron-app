import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addFavoriList: (state, action) => {
      if (state.value.indexOf(action.payload.attributes.name) === -1) {
        state.value.push(action.payload.attributes.name);
      }
    },
    deleteFavorite: (state, action) => {
      state.value = state.value.filter((item) => item !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavoriList, deleteFavorite } = counterSlice.actions;

export default counterSlice.reducer;

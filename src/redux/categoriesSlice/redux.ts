import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "../../api/questions";
import { categoriesType } from "./type";
import { fetcCategories } from "../../api/categories";

const initialState: categoriesType = {
  isLoading: false,
  categories: null,
  error: "",
};

export const asyncCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetcCategories();

    if (response?.trivia_categories) {
      return response.trivia_categories;
    }
    throw new Error("Sometings gone wrong");
  }
);

export const categoriesRequest = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [asyncCategories.pending.type]: (state) => {
      state.isLoading = true;
    },
    [asyncCategories.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    [asyncCategories.rejected.type]: (
      state,
      action: PayloadAction<any, string, any, any>
    ) => {
      state.isLoading = false;
      state.error = action?.error?.message as string;
    },
  },
});

export default categoriesRequest;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { questionProps, questionsType, singleQuestion } from "./types";
import { fetchQuestions } from "../../api/questions";

const initialState: questionsType = {
  loading: false,
  questions: null,
  error: "",
  selectedCategory: null,
  selectedDifficulty: null,
  answeredQuestions: [],
  winOrLose: null,
};

export const asyncQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async ({ count, category, difficulty, type }: questionProps) => {
    const response = await fetchQuestions({
      count,
      category,
      difficulty,
      type,
    });

    if (response.results) {
      return response.results;
    }
    throw new Error("Sometings gone wrong");
  }
);

export const questionsRequest = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.selectedDifficulty = action.payload;
    },
    setAnsweredQuestions: (state, action: PayloadAction<singleQuestion>) => {
      state.answeredQuestions.push(action.payload);
    },
    clearAnsweredQuestions: (state) => {
      state.answeredQuestions = [];
    },
    setWinOrLose: (state, action: PayloadAction<boolean>) => {
      state.winOrLose = action.payload;
    },
  },
  extraReducers: {
    [asyncQuestions.pending.type]: (state) => {
      state.loading = true;
    },
    [asyncQuestions.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.questions = action.payload;
    },
    [asyncQuestions.rejected.type]: (
      state,
      action: PayloadAction<any, string, any, any>
    ) => {
      state.loading = false;
      state.error = action?.error?.message as string;
    },
  },
});

export const {
  setCategory,
  setDifficulty,
  setAnsweredQuestions,
  clearAnsweredQuestions,
  setWinOrLose,
} = questionsRequest.actions;
export default questionsRequest;

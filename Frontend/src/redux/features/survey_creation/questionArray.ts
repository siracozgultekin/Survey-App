import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Question } from "@/interfaces";
import { set } from "zod";

const initialState: Question[] = [];

const questionArraySlice = createSlice({
  name: "questionArray",
  initialState,
  reducers: {
    setQuestionArray: (state, action: PayloadAction<Question>) => {
      return [...state, action.payload];
    },
  },
});

export const { setQuestionArray } = questionArraySlice.actions;
export default questionArraySlice.reducer;

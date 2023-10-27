import { Survey } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: Survey = {
  id: uuidv4(),
  owner_id: "",
  title: "Untitled Document",
  description: "",
  creation_date: null,
  deadline: null,
  participants: [],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurveyId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setSurveyOwnerId: (state, action: PayloadAction<string>) => {
      state.owner_id = action.payload;
    },
    setSurveyTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSurveyDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setSurveyCreationDate: (state, action: PayloadAction<Date>) => {
      state.creation_date = action.payload;
    },
    setSurveyDeadline: (state, action: PayloadAction<Date>) => {
      state.deadline = action.payload;
    },
    setSurveyParticipants: (state, action: PayloadAction<string[]>) => {
      state.participants = action.payload;
    },
    resetSurvey: (state) => {
      state.id = uuidv4();
      state.owner_id = "";
      state.title = "Untitled Document";
      state.description = "";
      state.creation_date = null;
      state.deadline = null;
      state.participants = [];
    },
  },
});
export const {
  setSurveyId,
  setSurveyOwnerId,
  setSurveyTitle,
  setSurveyDescription,
  setSurveyCreationDate,
  setSurveyDeadline,
  setSurveyParticipants,
  resetSurvey,
} = surveySlice.actions;
export default surveySlice.reducer;

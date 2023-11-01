import { Survey } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { v4 as uuidv4 } from "uuid";

const initialState: Survey = {
  id: uuidv4(),
  owner_id: "",
  title: "",
  description: "",
  creation_date: new Date(),
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  participants: [],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setAllSurvey: (state, action: PayloadAction<Survey>) => {
      state.id = action.payload.id;
      state.owner_id = action.payload.owner_id;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.creation_date = action.payload.creation_date;
      state.deadline = action.payload.deadline;
      state.participants = action.payload.participants;
    },

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
  setAllSurvey,
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

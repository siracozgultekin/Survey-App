import { Question } from "@/interfaces";
import { create } from "zustand";

interface QuestionArrStore {
  //type definitions for the QuestionArrStore
  questionArr: Question[];

  //setters for the QuestionArrStore
  insertQuestion: (questionArr: Question) => void;
}
export const useQuestionArrStore = create<QuestionArrStore>((set) => ({
  //initial state of the QuestionArrStore
  questionArr: [],

  insertQuestion: (question: Question) =>
    set((state) => ({ questionArr: [...state.questionArr, question] })),
}));

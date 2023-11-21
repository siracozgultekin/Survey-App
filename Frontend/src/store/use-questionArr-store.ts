import { Question } from "@/interfaces";
import { create } from "zustand";

interface QuestionArrStore {
  //type definitions for the QuestionArrStore
  questionArr: Question[];

  //setters for the QuestionArrStore
  insertQuestion: (questionArr: Question) => void;
  setQuestion: (data: any) => void;
  setQuestionChoice: (data: any) => void;
  removeChoice: (data: any) => void;
  removeQuestion: (data: any) => void;
  addChoice: (data: any) => void;
  resetQuestionArr: () => void;
}
export const useQuestionArrStore = create<QuestionArrStore>((set) => ({
  //initial state of the QuestionArrStore
  questionArr: [],

  insertQuestion: (question: Question) =>
    set((state) => ({ questionArr: [...state.questionArr, question] })),
  setQuestion: (data: any) =>
    set((state) => ({
      questionArr: state.questionArr.map((questionObj) => {
        if (questionObj.id === data.id) {
          questionObj.question = data.questionstr;
        }
        return questionObj;
      }),
    })),
  removeQuestion: (data: any) =>
    set((state) => ({
      questionArr: state.questionArr.filter((questionObj) => {
        if (questionObj.id !== data.id) {
          return questionObj;
        }
      }),
    })),
  setQuestionChoice: (data: any) =>
    set((state) => ({
      questionArr: state.questionArr.map((questionObj) => {
        if (questionObj.id === data.id) {
          questionObj.choices[data.index] = data.choicestr;
        }
        return questionObj;
      }),
    })),
  removeChoice: (data: any) =>
    set(
      (state) => (
        console.log("removechoicefonksiyonu data=>", data),
        {
          questionArr: state.questionArr.map((questionObj) => {
            if (questionObj.id === data.id) {
              // questionObj.choices[data.index] ;
              questionObj.choices = questionObj.choices.filter(
                (choice, index) => {
                  if (index !== data.index) {
                    return choice;
                  }
                },
              );
            }
            return questionObj;
          }),
        }
      ),
    ),
  addChoice: (data: any) =>
    set((state) => ({
      questionArr: state.questionArr.map((questionObj) => {
        if (questionObj.id === data.id) {
          console.log("data.choicestr=> ", data.choicestr);
          questionObj.choices.push(data.choicestr);
        }
        return questionObj;
      }),
    })),

  resetQuestionArr: () =>
    set(() => ({
      questionArr: [],
    })),
}));

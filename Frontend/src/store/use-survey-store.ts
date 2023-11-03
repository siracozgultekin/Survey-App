import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface SurveyStore {
  //type definitions for the SurveyStore
  id: string;
  owner_id: string;
  title: string;
  description: string;
  creation_date: Date | null;
  deadline: Date | null;
  participants: string[];

  //setters for the SurveyStore

  setSurveyId: (id: string) => void;
  setSurveyOwnerId: (owner_id: string) => void;
  setSurveyTitle: (title: string) => void;
  setSurveyDescription: (description: string) => void;
  setSurveyCreationDate: (creation_date: Date | null) => void;
  setSurveyDeadline: (deadline: Date | null) => void;
  setSurveyParticipants: (participants: string[]) => void;
  resetsurveyStore: () => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  //initial state of the SurveyStore
  id: uuidv4(),
  owner_id: "",
  title: "",
  description: "",
  creation_date: new Date(),
  deadline: null,
  participants: [],

  setSurveyId: (id: string) => set({ id }),
  setSurveyOwnerId: (owner_id: string) => set({ owner_id }),
  setSurveyTitle: (title: string) => set({ title }),
  setSurveyDescription: (description: string) => set({ description }),
  setSurveyCreationDate: (creation_date: Date | null) => set({ creation_date }),
  setSurveyDeadline: (deadline: Date | null) => set({ deadline }),
  setSurveyParticipants: (participants: string[]) => set({ participants }),
  resetsurveyStore: () =>
    set({
      id: uuidv4(),
      owner_id: "",
      title: "",
      description: "",
      creation_date: new Date(),
      deadline: null,
      participants: [],
    }),
}));

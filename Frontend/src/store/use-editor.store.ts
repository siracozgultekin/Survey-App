import { Editor } from "@tiptap/core";
import { create } from "zustand";

interface EditorStore {
  editor: Editor | null;

  //setters for the EditorStore
  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,

  setEditor: (editor: Editor | null) => set({ editor }),
}));

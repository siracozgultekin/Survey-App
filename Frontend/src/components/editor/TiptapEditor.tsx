import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TiptapToolBar from "./TiptapToolbar";
import { useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditorStore } from "@/store/use-editor.store";

type Props = {
  editorState: string;
  setEditorState: (state: string) => void;
};

const TiptapEditor = ({ editorState, setEditorState }: Props) => {
  const [editorToggle, setEditorToggle] = useState<boolean>(false);
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Soru metni giriniz...",
      }),
    ],
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert min-h-[100px] min-w-full focus:outline-none p-3  bg-gray-200 dark:bg-slate-800  overflow-y-auto",
      },
    },
  });
  return (
    <div className="flex flex-col ">
      {}
      <EditorContent
        editor={editor}
        className="flex"
        onClick={() => setEditorToggle((prev) => !prev)}
      />
      <div className="flex">
        {editorToggle && editor && <TiptapToolBar editor={editor} />}
      </div>
    </div>
  );
};

export default TiptapEditor;

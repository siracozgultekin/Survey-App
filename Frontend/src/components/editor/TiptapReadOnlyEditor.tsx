import { useEditor, EditorContent } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";

type Props = {
  content: string;
};

const ReadOnlyTiptapEditor = ({ content }: Props) => {
  const editor = useEditor({
    editable: false,

    extensions: [StarterKit],

    content: content,

    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert min-w-full focus:outline-none text-foreground",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default ReadOnlyTiptapEditor;

"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import "highlight.js/styles/github.css";


import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";

import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";

const lowlight = createLowlight({
  javascript,
  python,
  cpp,
});

interface Props {
  value?: string; // controlled content
  onChange?: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {

  const [search, setSearch] = useState("");
  const editor = useEditor({
  immediatelyRender: false,
  extensions: [
    StarterKit.configure({
      codeBlock: false, // IMPORTANT: disable default code block
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Underline,
    TextStyle,
    Color,
    Highlight,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Link.configure({ openOnClick: false }),
  ],
  content: value || "<p>Start writing your blog...</p>",
  onUpdate({ editor }) {
    onChange?.(editor.getHTML());
  },
});


  // Update editor content when `value` prop changes (for editing)
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);
  

  if (!editor) return null;

  const getTextType = () => {
    if (editor.isActive("heading", { level: 1 })) return "title";
    if (editor.isActive("heading", { level: 2 })) return "header";
    if (editor.isActive("heading", { level: 3 })) return "subtitle";
    return "paragraph";
  };

  const setTextType = (value: string) => {
    const chain = editor.chain().focus();
    if (value === "title") chain.toggleHeading({ level: 1 }).run();
    else if (value === "header") chain.toggleHeading({ level: 2 }).run();
    else if (value === "subtitle") chain.toggleHeading({ level: 3 }).run();
    else chain.setParagraph().run();
  };

  const btnClass = (active: boolean) =>
    `rounded-md px-3 py-1 text-sm transition ${
      active ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="rounded-2xl border text-black border-gray-200 bg-gray-50 shadow-sm">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 space-y-2 border-b bg-gray-50 p-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1">
            {/* Inline code */}
            <button
              type="button"
              className={btnClass(editor.isActive("code"))}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              &lt;&gt;
            </button>

            {/* Code block */}
            <button
              type="button"
              className={btnClass(editor.isActive("codeBlock"))}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              {"</>"}
            </button>
            </div>

            {editor.isActive("codeBlock") && (
            <select
              onChange={(e) =>
                editor.chain().focus().setCodeBlock({ language: e.target.value }).run()
              }
              className="rounded-md border px-2 py-1 text-sm bg-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          )}


          <select
            value={getTextType()}
            onChange={(e) => setTextType(e.target.value)}
            className="rounded-md border bg-white text-black px-2 py-1 text-sm"
          >
            <option value="title">Title</option>
            <option value="header">Header</option>
            <option value="subtitle">Subtitle</option>
            <option value="paragraph">Normal</option>
          </select>

          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="h-8 w-8 cursor-pointer rounded border"
          />

          <div className="flex items-center gap-1 rounded-lg bg-white p-1 border">
          <button type="button" className={btnClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
          <button type="button" className={btnClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
          <button type="button" className={btnClass(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
          <button type="button" className={btnClass(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-white p-1 border">
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</button>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-white p-1 border">
          <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>⬅</button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>⬌</button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>➡</button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()}>☰</button>
          </div>

          <button type="button" onClick={() => {
            const url = prompt("Enter link");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}>🔗</button>

          <button type="button" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>…</button>
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="prose max-w-none min-h-[300px] p-6 focus:outline-none" />
    </div>
  );
}

"use client";
// //import StarterKit from "@tiptap/starter-kit";
// import axios from "axios";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// //import { useState } from "react";
// import React, { useState, useRef, useEffect } from "react";
// export default function TiptapEditor() {
//   const [imageUrl, setImageUrl] = useState("");
//   const [imageDescription, setImageDescription] = useState("");

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit,
//       Image.configure({
//         inline: false,
//       }),
//     ],
//     content: "<p>Start writing your blog...</p>",
//   });

//   if (!editor) return null;

//   const addImageWithDetails = () => {
//     // Insert image with description after current selection or heading
//     if (!imageUrl || !imageDescription) return;

//     const imageNode = editor.schema.nodes.image.create({ src: imageUrl });
//     const descriptionNode = editor.schema.text(imageDescription);
//     const paragraphNode = editor.schema.nodes.paragraph.create(
//       {},
//       descriptionNode
//     );

//     editor.chain().focus().insertContent([imageNode, paragraphNode]).run();

//     // Clear the inputs
//     setImageUrl("");
//     setImageDescription("");
//   };

//   return (
//     <div>
//       {/* Toolbar */}
//       <div className="mb-3 flex gap-2">
//         <input
//           type="text"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//           placeholder="Enter Image URL"
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           value={imageDescription}
//           onChange={(e) => setImageDescription(e.target.value)}
//           placeholder="Enter Image Description"
//           className="border p-2 rounded"
//         />
//         <button onClick={addImageWithDetails} className="border px-3 py-1">
//           Add Image with Details
//         </button>
//       </div>

//       {/* Editor */}
//       <div className="border p-4 rounded">
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }

//"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default function TiptapEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-gray-200 my-4 shadow-sm", // Tailwind classes for images
        },
      }),
    ],
    content: "<p>Start typing here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none border p-4 rounded-md min-h-[300px]",
      },
    },
  });

  const addImageLoop = () => {
    const url = window.prompt("Enter Image URL:");
    if (!url) return;

    // This command inserts the structured sequence in one go
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "image",
          attrs: { src: url },
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Enter your related paragraph here..." },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Next Topic Title" }],
        },
        {
          type: "image",
          attrs: { src: url }, // Repeat or use a different URL variable
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Enter the next related paragraph..." },
          ],
        },
      ])
      .run();
  };

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Toolbar */}
      <div className="flex gap-2 mb-4 border-b pb-2">
        <button
          onClick={addImageLoop}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Image & Topic Loop
        </button>
      </div>

      {/* Editor Surface */}
      <EditorContent editor={editor} />
    </div>
  );
};


import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// RTE without react-hook-form
export default function RTE({ label, value, onChange }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Editor
  apiKey="g75gfeeovb8qfs3v6mum5brrecob4gf98sq9i7qvghn9dl0e"
  value={value}
  init={{
    height: 500,
    menubar: true,
    plugins: [
      "image", "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor",
      "searchreplace", "visualblocks", "code", "fullscreen",
      "insertdatetime", "media", "table", "help", "wordcount"
    ],
    toolbar:
      "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image media | removeformat | code | help",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  }}
  onEditorChange={onChange}
/>

    </div>
  );
}

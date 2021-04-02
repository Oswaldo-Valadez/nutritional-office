import React from "react";

import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({ value, onEditorChange, disabled = false }) => {
  return (
    <Editor
      apiKey="xbvgobwyox7q7sqpft74lszz9nyc0h3oc48svvhwqpv269i8"
      disabled={disabled}
      value={value}
      init={{
        height: 300,
        menubar: false,
        plugins: ["paste code wordcount"],
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default RichTextEditor;

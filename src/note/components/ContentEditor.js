import { Editor } from "@tinymce/tinymce-react";
import React, { forwardRef } from "react";

export const ContentEditor = forwardRef(({ initialValue }, ref) => {
  return (
    <Editor
      apiKey="t8bzg0s7rwpxzp91ytu54b9rrhpy1uvs5a1dkd4npls3uxxa"
      onInit={(evt, editor) => (ref.current = editor)}
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
});

ContentEditor.initialValue = ""

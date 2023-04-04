import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'antd';
import React, { useRef } from 'react';

interface TinyMCEEditorProps {
  name: string;
  label: string;
  initialValue: string;
  onChange?: (value: string) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ name, label, initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const handleEditorChange = (content: string) => {
    onChange && onChange(content);
  };

  return (
    <Form.Item
      name={name}
      label={label}>
      <Editor
        apiKey="p6ztomd4w6uf6v89xty6ye1e33nibaikoi4a7wfw4eb5cibh"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        value={initialValue}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
              alignleft aligncenter alignright | \
              bullist numlist outdent indent | help',
        }}
      />
    </Form.Item>
  );
};

export default TinyMCEEditor;

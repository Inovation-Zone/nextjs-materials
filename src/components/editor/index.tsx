import dynamic from 'next/dynamic';
import { forwardRef, useImperativeHandle, useState } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export interface EditorRef {
  getValue: () => string;
  setValue: (value: string) => void;
}

const Editor = forwardRef<EditorRef>((props, ref) => {
  const [value, setValue] = useState<string>();

  const handleOnChange = (value: string) => {
    setValue(value);
  }

  useImperativeHandle(ref, () => ({
    getValue: (): string => value || '',
    setValue: (val: string) => setValue(val),
  }));

  return <QuillNoSSRWrapper
    onChange={handleOnChange}
    value={value}
    modules={modules}
    formats={formats}
    theme="snow" />
});

export default Editor;

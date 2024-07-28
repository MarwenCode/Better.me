import React, { useRef, useEffect } from 'react';
import './myeditor.scss'; // Import the CSS for styling the editor

const MyEditor = ({ initialContent, onChange, readOnly }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      editorRef.current.style.direction = isRightToLeft() ? 'rtl' : 'ltr';
    }
  }, [initialContent]);

  const execCommand = (command) => {
    document.execCommand(command, false, null);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const isRightToLeft = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(userLanguage.substring(0, 2));
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => execCommand('bold')} title="Bold"><b>B</b></button>
        <button onClick={() => execCommand('italic')} title="Italic"><i>I</i></button>
        <button onClick={() => execCommand('underline')} title="Underline"><u>U</u></button>
        <button onClick={() => execCommand('strikeThrough')} title="Strike-through"><s>S</s></button>
        <button onClick={() => execCommand('createLink')} title="Insert Link">Link</button>
        <button onClick={() => execCommand('insertOrderedList')} title="Ordered List">OL</button>
        <button onClick={() => execCommand('insertUnorderedList')} title="Unordered List">UL</button>
      </div>
      <div ref={editorRef} contentEditable={!readOnly} onInput={updateContent} className="editor" style={{ border: '1px solid #ddd', padding: '10px' }}/>
    </div>
  );
};

export default MyEditor;









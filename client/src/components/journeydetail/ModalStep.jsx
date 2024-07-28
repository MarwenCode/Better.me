import React, { useState, useEffect } from 'react';
import MyEditor from './MyEditor'; // Import the editor component
import './modalstep.scss'; // Import the CSS for styling the modal

const ModalStep = ({ step, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [editorContent, setEditorContent] = useState(step ? step.description : '');

  useEffect(() => {
    setEditorContent(step ? step.description : '');
  }, [step]);

  const handleContentChange = (content) => {
    setEditorContent(content);
    // Optionally, handle the content change here, e.g., save it or notify parent
  };

  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>Close</button>
      <button className="edit-button" onClick={() => setEditMode(prev => !prev)}>
        {editMode ? 'View' : 'Edit'}
      </button>
      <h2>Step Details</h2>
      <MyEditor
        initialContent={editorContent}
        onChange={handleContentChange}
        readOnly={!editMode} 
      />
    </div>
  </div>
  
  );
};

export default ModalStep;

















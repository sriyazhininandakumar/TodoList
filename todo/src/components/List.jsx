import React, { useState } from 'react';

const List = ({ text, id, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTask(id, editedText);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div className='flex gap-3'>
      <div className="task flex gap-3">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleInputChange}
            placeholder="Edit task"
          />
        ) : (
          <label>
            {text}
          </label>
        )}
        <button className='border border-black' onClick={handleUpdateClick}>Edit</button>
        <button className='border border-black' onClick={() => deleteTask(id)}>Delete</button>

        {isEditing && (
          <button onClick={handleSaveClick}>Save</button>
        )}
      </div>
    </div>
  );
};

export default List;

import React, { useState } from 'react';
import './TagModal.css';

const TagModal = ({ onClose, availableTags, selectedTags, setSelectedTags, onAddTag }) => {
  const [newTagInput, setNewTagInput] = useState('');

  const handleNewTagSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const tagName = newTagInput.trim();
      if (tagName && !availableTags.includes(tagName)) {
        onAddTag(tagName);
        setNewTagInput('');
      }
    }
  };

  const toggleTagSelection = (tagName) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tagName)) {
      newSelectedTags.delete(tagName);
    } else {
      newSelectedTags.add(tagName);
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="tag-modal-overlay" onClick={(e) => e.target.className === 'tag-modal-overlay' && onClose()}>
      <div className="tag-modal-content">
        <div className="tag-modal-header">
          <h3 className="tag-modal-title">ADD Tags</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="tag-modal-body">
          <input
            type="text"
            className="new-tag-input"
            placeholder="new tag..."
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyPress={handleNewTagSubmit}
          />
          
          <div className="tag-list">
            {availableTags.map(tagName => {
              const isSelected = selectedTags.has(tagName);
              return (
                <div key={tagName} className="tag-option">
                  <span className="tag-option-name">{tagName}</span>
                  <button 
                    className={`tag-toggle-btn ${isSelected ? 'remove' : 'add'}`}
                    onClick={() => toggleTagSelection(tagName)}
                  >
                    {isSelected ? '-' : '+'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
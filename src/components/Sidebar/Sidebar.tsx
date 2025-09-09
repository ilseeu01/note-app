import React, { useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  tags: string[];
  activeNavItem: string;
  setActiveNavItem: (item: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  onAddTag: (tagName: string) => void;
  onDeleteTag: (tagName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tags, activeNavItem, setActiveNavItem, selectedTag, setSelectedTag, onAddTag, onDeleteTag }) => {
  const [newTagInput, setNewTagInput] = useState('');

  const bottomNavItems = [
    { id: 'edit', icon: '✏️', text: 'Edit Notes' },
    { id: 'archive', icon: '📦', text: 'Archive' },
    { id: 'trash', icon: '🗑️', text: 'Trash' },
  ];

  const handleNavClick = (itemId: string): void => {
    setActiveNavItem(itemId);
    setSelectedTag(null);
  };

  const handleNotesClick = (): void => {
    setActiveNavItem('notes');
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string): void => {
    setActiveNavItem('notes');
    setSelectedTag(tag);
  };

  const handleDeleteTag = (e: React.MouseEvent, tag: string): void => {
    e.stopPropagation(); // Prevent tag selection when clicking delete
    onDeleteTag(tag);
  };

  const handleAddTag = (): void => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      onAddTag(newTagInput.trim());
      setNewTagInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Keep</h1>
      </div>
      
      <nav className="sidebar-nav">
        {/* Notes */}
        <div
          className={`nav-item ${activeNavItem === 'notes' && !selectedTag ? 'active' : ''}`}
          onClick={handleNotesClick}
        >
          <span className="icon">💡</span>
          <span className="text">Notes</span>
        </div>

        {/* Tags as individual nav items */}
        {tags.map(tag => (
          <div
            key={tag}
            className={`nav-item tag-nav-item ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            <span className="icon">🏷️</span>
            <span className="text">{tag}</span>
            <button
              className="delete-tag-btn"
              onClick={(e) => handleDeleteTag(e, tag)}
              title="태그 삭제"
            >
              ×
            </button>
          </div>
        ))}

        {/* Spacer */}
        <div className="nav-spacer"></div>

        {/* Bottom navigation items */}
        {bottomNavItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeNavItem === item.id && !selectedTag ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.text}</span>
          </div>
        ))}
      </nav>
      
      {/* Add tag form at bottom */}
      <div className="add-tag-form">
        <input
          type="text"
          className="add-tag-input"
          placeholder="새 태그 추가"
          value={newTagInput}
          onChange={(e) => setNewTagInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="add-tag-btn" onClick={handleAddTag}>
          추가
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
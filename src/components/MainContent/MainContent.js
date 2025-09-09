import React, { useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import './MainContent.css';

const MainContent = ({ pinnedNotes, unpinnedNotes, searchTerm, setSearchTerm, onAddNote, onEditNote, onDeleteNote, sortOption, setSortOption }) => {
  const [showSortModal, setShowSortModal] = useState(false);

  return (
    <div className="main-content">
      <div className="header">
        <h2>Notes</h2>
        <div className="header-buttons">
          <button className="sort-btn" onClick={() => setShowSortModal(true)}>
            정렬
          </button>
          <button className="add-note-btn" onClick={onAddNote}>+</button>
        </div>
      </div>

      <div className="content-area">
        <input
          type="text"
          className="search-bar"
          placeholder="노트의 제목을 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {pinnedNotes.length > 0 && (
          <div className="notes-section">
            <div className="section-header">
              <h3 className="section-title">Pinned Notes ({pinnedNotes.length})</h3>
            </div>
            <div className="notes-grid">
              {pinnedNotes.map(note => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onEdit={onEditNote}
                  onDelete={onDeleteNote}
                />
              ))}
            </div>
          </div>
        )}

        <div className="notes-section">
          <div className="section-header">
            <h3 className="section-title">All Notes ({unpinnedNotes.length})</h3>
          </div>
          <div className="notes-grid">
            {unpinnedNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={onEditNote}
                onDelete={onDeleteNote}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sort Modal */}
      {showSortModal && (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && setShowSortModal(false)}>
          <div className="sort-modal">
            <div className="sort-modal-header">
              <h3>정렬</h3>
              <button 
                className="clear-btn" 
                onClick={() => {
                  setSortOption('latest');
                  setShowSortModal(false);
                }}
              >
                CLEAR
              </button>
              <button className="close-btn" onClick={() => setShowSortModal(false)}>×</button>
            </div>
            
            <div className="sort-modal-body">
              <div className="sort-section">
                <h4>PRIORITY</h4>
                <div className="sort-options">
                  <label className="sort-option">
                    <input 
                      type="radio" 
                      name="sort" 
                      value="priority-low-high"
                      checked={sortOption === 'priority-low-high'}
                      onChange={(e) => setSortOption(e.target.value)}
                    />
                    Low to High
                  </label>
                  <label className="sort-option">
                    <input 
                      type="radio" 
                      name="sort" 
                      value="priority-high-low"
                      checked={sortOption === 'priority-high-low'}
                      onChange={(e) => setSortOption(e.target.value)}
                    />
                    High to Low
                  </label>
                </div>
              </div>

              <div className="sort-section">
                <h4>DATE</h4>
                <div className="sort-options">
                  <label className="sort-option">
                    <input 
                      type="radio" 
                      name="sort" 
                      value="latest"
                      checked={sortOption === 'latest'}
                      onChange={(e) => setSortOption(e.target.value)}
                    />
                    Sort by Latest
                  </label>
                  <label className="sort-option">
                    <input 
                      type="radio" 
                      name="sort" 
                      value="created"
                      checked={sortOption === 'created'}
                      onChange={(e) => setSortOption(e.target.value)}
                    />
                    Sort by Created
                  </label>
                  <label className="sort-option">
                    <input 
                      type="radio" 
                      name="sort" 
                      value="edited"
                      checked={sortOption === 'edited'}
                      onChange={(e) => setSortOption(e.target.value)}
                    />
                    Sort by Edited
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
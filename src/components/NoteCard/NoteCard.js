import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(date));
  };

  const handleNoteClick = () => {
    console.log('Note clicked:', note.title);
  };

  return (
    <div className={`note-card ${note.color}`} onClick={handleNoteClick}>
      {note.isPinned && <div className="pin-icon">📌</div>}
      
      <div className="note-header">
        <div>
          <div className="note-title">{note.title}</div>
          {note.priority !== 'low' && (
            <div className={`priority-badge priority-${note.priority}`}>{note.priority.toUpperCase()}</div>
          )}
        </div>
      </div>
      
      <div className="note-content">{note.content}</div>
      
      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="note-tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className="note-footer">
        <span>{formatDate(note.createdAt)}</span>
        <div className="note-actions">
          <button className="note-action" onClick={(e) => { e.stopPropagation(); onEdit(note); }}>
            ✏️
          </button>
          <button className="note-action" onClick={(e) => { e.stopPropagation(); console.log('Copy note'); }}>
            📋
          </button>
          <button className="note-action" onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
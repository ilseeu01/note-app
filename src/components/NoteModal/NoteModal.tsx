import React, { useState, useEffect } from 'react';
import { Note, NoteFormData } from '../../types';
import './NoteModal.css';

interface NoteModalProps {
  onClose: () => void;
  onSave: (noteData: any) => void;
  availableTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  onShowTagModal: () => void;
  editingNote: Note | null;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onSave, availableTags, selectedTags, setSelectedTags, onShowTagModal, editingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<'white' | 'pink' | 'blue' | 'red'>('white');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setColor(editingNote.color);
      setPriority(editingNote.priority);
    }
  }, [editingNote]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const noteData = {
      ...(editingNote && { id: editingNote.id }),
      title: title.trim(),
      content: content.trim(),
      tags: Array.from(selectedTags),
      color,
      priority,
    };

    onSave(noteData);
    onClose();
  };

  const handleColorChange = (selectedColor: 'white' | 'pink' | 'blue' | 'red') => {
    setColor(selectedColor);
    updateTextareaBackground(selectedColor);
  };

  const updateTextareaBackground = (selectedColor: string) => {
    const textarea = document.getElementById('note-content');
    if (textarea) {
      switch(selectedColor) {
        case 'white':
          textarea.style.backgroundColor = '#ffffff';
          break;
        case 'pink':
          textarea.style.backgroundColor = '#ffeaa7';
          break;
        case 'blue':
          textarea.style.backgroundColor = '#74b9ff';
          break;
        case 'red':
          textarea.style.backgroundColor = '#fab1a0';
          break;
        default:
          textarea.style.backgroundColor = '#ffffff';
      }
    }
  };

  const handleToolbarAction = (action) => {
    const textarea = document.getElementById('note-content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let newText = textarea.value;
    let insertBefore = '';
    let insertAfter = '';

    switch(action) {
      case 'bold':
        insertBefore = '**';
        insertAfter = '**';
        break;
      case 'italic':
        insertBefore = '*';
        insertAfter = '*';
        break;
      case 'underline':
        insertBefore = '<u>';
        insertAfter = '</u>';
        break;
      case 'strikethrough':
        insertBefore = '~~';
        insertAfter = '~~';
        break;
      case 'list':
        insertBefore = '\\n- ';
        insertAfter = '';
        break;
      case 'numbered-list':
        insertBefore = '\\n1. ';
        insertAfter = '';
        break;
      default:
        return;
    }

    newText = textarea.value.substring(0, start) + insertBefore + selectedText + insertAfter + textarea.value.substring(end);
    setContent(newText);

    setTimeout(() => {
      const newCursorPos = start + insertBefore.length + selectedText.length + insertAfter.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  useEffect(() => {
    updateTextareaBackground(color);
  }, [color]);

  return (
    <div className="modal-overlay" onClick={(e) => (e.target as HTMLElement).className === 'modal-overlay' && onClose()}>
      <div className="note-modal">
        <div className="modal-header">
          <h3 className="modal-title">{editingNote ? '노트 수정하기' : '노트 생성하기'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <input
              type="text"
              id="note-title"
              className="form-input"
              placeholder="노트1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <div className="toolbar">
              <button className="toolbar-btn" onClick={() => handleToolbarAction('list')} title="목록">☰</button>
              <button className="toolbar-btn" onClick={() => handleToolbarAction('numbered-list')} title="번호 목록">≡</button>
              <button className="toolbar-btn" onClick={() => handleToolbarAction('bold')} title="굵게"><strong>B</strong></button>
              <button className="toolbar-btn" onClick={() => handleToolbarAction('italic')} title="기울임"><em>I</em></button>
              <button className="toolbar-btn" onClick={() => handleToolbarAction('underline')} title="밑줄"><u>U</u></button>
              <button className="toolbar-btn" onClick={() => handleToolbarAction('strikethrough')} title="취소선"><s>S</s></button>
              <button className="toolbar-btn" title="크기">A</button>
              <button className="toolbar-btn" title="색상">🎨</button>
              <button className="toolbar-btn" title="이미지">📷</button>
              <button className="toolbar-btn" title="인용">""</button>
              <button className="toolbar-btn" title="코드">&lt;/&gt;</button>
            </div>
            <textarea
              id="note-content"
              className="form-textarea"
              placeholder="노트1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ transition: 'background-color 0.3s ease' }}
            />
          </div>
          
          <div className="form-row">
            <div className="form-col">
              <button className="btn btn-secondary" onClick={onShowTagModal}>
                Add Tag
              </button>
              <div className="selected-tags">
                {Array.from(selectedTags).map((tag, index) => (
                  <span key={index} className="tag-chip">{tag}</span>
                ))}
              </div>
            </div>
            <div className="form-col">
              <label className="form-label">배경색</label>
              <select
                className="form-select"
                value={color}
                onChange={(e) => handleColorChange(e.target.value as 'white' | 'pink' | 'blue' | 'red')}
              >
                <option value="white">White</option>
                <option value="pink">Pink</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
              </select>
            </div>
            <div className="form-col">
              <label className="form-label">우선순위</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>취소</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {editingNote ? '수정하기' : '+ 생성하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
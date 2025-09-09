import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import NoteModal from './components/NoteModal/NoteModal';
import TagModal from './components/TagModal/TagModal';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note 2 tit...",
      content: "Note 2 content",
      tags: ["exercise"],
      color: "pink",
      priority: "high",
      isPinned: true,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
    {
      id: 2,
      title: "Note 1 tit...",
      content: "Note 1 content",
      tags: ["coding"],
      color: "blue",
      priority: "high",
      isPinned: true,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
    {
      id: 3,
      title: "노트1",
      content: "노트1",
      tags: ["exercise"],
      color: "red",
      priority: "medium",
      isPinned: false,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    }
  ]);

  const [tags, setTags] = useState(new Set(['exercise', 'coding', 'quotes']));
  const [activeNavItem, setActiveNavItem] = useState('notes');
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedTagsForNote, setSelectedTagsForNote] = useState(new Set());
  const [editingNote, setEditingNote] = useState(null);
  const [sortOption, setSortOption] = useState('latest'); // 'latest', 'created', 'edited', 'priority-high-low', 'priority-low-high'

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
    };
    setNotes(prev => [...prev, newNote]);
    
    // Add new tags to the tags set
    noteData.tags.forEach(tag => {
      setTags(prev => new Set([...prev, tag]));
    });
  };

  const addTag = (tagName) => {
    setTags(prev => new Set([...prev, tagName]));
  };

  const deleteTag = (tagName) => {
    setTags(prev => {
      const newTags = new Set(prev);
      newTags.delete(tagName);
      return newTags;
    });
    
    // Remove the tag from all notes that have it
    setNotes(prev => prev.map(note => ({
      ...note,
      tags: note.tags.filter(tag => tag !== tagName)
    })));
    
    // If currently selected tag is being deleted, clear selection
    if (selectedTag === tagName) {
      setSelectedTag(null);
    }
  };

  const editNote = (noteData) => {
    setNotes(prev => prev.map(note => 
      note.id === noteData.id ? { ...note, ...noteData, updatedAt: new Date() } : note
    ));
    
    // Add new tags to the tags set
    noteData.tags.forEach(tag => {
      setTags(prev => new Set([...prev, tag]));
    });
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setSelectedTagsForNote(new Set(note.tags));
    setShowNoteModal(true);
  };

  const sortNotes = (notesToSort) => {
    return [...notesToSort].sort((a, b) => {
      switch(sortOption) {
        case 'latest':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'edited':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'priority-high-low':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'priority-low-high':
          const priorityOrderReverse = { high: 3, medium: 2, low: 1 };
          return priorityOrderReverse[a.priority] - priorityOrderReverse[b.priority];
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTag) {
      return matchesSearch && note.tags.includes(selectedTag);
    }
    
    return matchesSearch;
  });

  const pinnedNotes = sortNotes(filteredNotes.filter(note => note.isPinned));
  const unpinnedNotes = sortNotes(filteredNotes.filter(note => !note.isPinned));

  return (
    <div className="app">
      <Sidebar 
        tags={Array.from(tags)}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onAddTag={addTag}
        onDeleteTag={deleteTag}
      />
      <MainContent 
        pinnedNotes={pinnedNotes}
        unpinnedNotes={unpinnedNotes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddNote={() => setShowNoteModal(true)}
        onEditNote={handleEditNote}
        onDeleteNote={deleteNote}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      {showNoteModal && (
        <NoteModal 
          onClose={() => {
            setShowNoteModal(false);
            setSelectedTagsForNote(new Set());
            setEditingNote(null);
          }}
          onSave={editingNote ? editNote : addNote}
          availableTags={Array.from(tags)}
          selectedTags={selectedTagsForNote}
          setSelectedTags={setSelectedTagsForNote}
          onShowTagModal={() => setShowTagModal(true)}
          editingNote={editingNote}
        />
      )}
      
      {showTagModal && (
        <TagModal 
          onClose={() => setShowTagModal(false)}
          availableTags={Array.from(tags)}
          selectedTags={selectedTagsForNote}
          setSelectedTags={setSelectedTagsForNote}
          onAddTag={addTag}
        />
      )}
    </div>
  );
}

export default App;
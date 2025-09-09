import React from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { 
  addNote, 
  editNote, 
  deleteNote 
} from './store/slices/notesSlice';
import { 
  addTag, 
  deleteTag,
  setActiveNavItem,
  setSelectedTag,
  setSearchTerm,
  setShowNoteModal,
  setShowTagModal,
  setSelectedTagsForNote,
  setEditingNote,
  setSortOption
} from './store/slices/uiSlice';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import NoteModal from './components/NoteModal/NoteModal';
import TagModal from './components/TagModal/TagModal';
import { Note, SortOption, NoteFormData } from './types';
import './App.css';

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  
  // Redux state selectors
  const notes = useAppSelector(state => state.notes.notes);
  const {
    tags,
    activeNavItem,
    selectedTag,
    searchTerm,
    showNoteModal,
    showTagModal,
    selectedTagsForNote,
    editingNote,
    sortOption
  } = useAppSelector(state => state.ui);

  // Sorting function
  const sortNotes = (notesToSort: Note[]): Note[] => {
    return [...notesToSort].sort((a, b) => {
      switch(sortOption) {
        case 'latest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'edited':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'priority-high-low':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'priority-low-high':
          const priorityOrderReverse = { high: 3, medium: 2, low: 1 };
          return priorityOrderReverse[a.priority] - priorityOrderReverse[b.priority];
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });
  };

  // Event handlers
  const handleAddNote = (noteData: NoteFormData): void => {
    dispatch(addNote(noteData));
    
    // Add new tags to the tags list
    noteData.tags.forEach(tag => {
      dispatch(addTag(tag));
    });
  };

  const handleEditNote = (noteData: Note): void => {
    dispatch(editNote(noteData));
    
    // Add new tags to the tags list
    noteData.tags.forEach(tag => {
      dispatch(addTag(tag));
    });
  };

  const handleDeleteNote = (noteId: number): void => {
    dispatch(deleteNote(noteId));
  };

  const handleAddTag = (tagName: string): void => {
    dispatch(addTag(tagName));
  };

  const handleDeleteTag = (tagName: string): void => {
    dispatch(deleteTag(tagName));
  };

  const handleEditNoteClick = (note: Note): void => {
    dispatch(setEditingNote(note));
    dispatch(setSelectedTagsForNote(note.tags));
    dispatch(setShowNoteModal(true));
  };

  const handleCloseNoteModal = (): void => {
    dispatch(setShowNoteModal(false));
    dispatch(setSelectedTagsForNote([]));
    dispatch(setEditingNote(null));
  };

  // Filter and sort notes
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
        tags={tags}
        activeNavItem={activeNavItem}
        setActiveNavItem={(item: string) => dispatch(setActiveNavItem(item))}
        selectedTag={selectedTag}
        setSelectedTag={(tag: string | null) => dispatch(setSelectedTag(tag))}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
      />
      <MainContent 
        pinnedNotes={pinnedNotes}
        unpinnedNotes={unpinnedNotes}
        searchTerm={searchTerm}
        setSearchTerm={(term: string) => dispatch(setSearchTerm(term))}
        onAddNote={() => dispatch(setShowNoteModal(true))}
        onEditNote={handleEditNoteClick}
        onDeleteNote={handleDeleteNote}
        sortOption={sortOption}
        setSortOption={(option: SortOption) => dispatch(setSortOption(option))}
      />
      
      {showNoteModal && (
        <NoteModal 
          onClose={handleCloseNoteModal}
          onSave={editingNote ? handleEditNote : handleAddNote}
          availableTags={tags}
          selectedTags={selectedTagsForNote}
          setSelectedTags={(tags: string[]) => dispatch(setSelectedTagsForNote(tags))}
          onShowTagModal={() => dispatch(setShowTagModal(true))}
          editingNote={editingNote}
        />
      )}
      
      {showTagModal && (
        <TagModal 
          onClose={() => dispatch(setShowTagModal(false))}
          availableTags={tags}
          selectedTags={selectedTagsForNote}
          setSelectedTags={(tags: string[]) => dispatch(setSelectedTagsForNote(tags))}
          onAddTag={handleAddTag}
        />
      )}
    </div>
  );
}

export default App;
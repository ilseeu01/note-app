import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, SortOption } from '../../types';

interface UIState {
  tags: string[];
  activeNavItem: string;
  selectedTag: string | null;
  searchTerm: string;
  showNoteModal: boolean;
  showTagModal: boolean;
  selectedTagsForNote: string[];
  editingNote: Note | null;
  sortOption: SortOption;
}

const initialState: UIState = {
  tags: ['exercise', 'coding', 'quotes'],
  activeNavItem: 'notes',
  selectedTag: null,
  searchTerm: '',
  showNoteModal: false,
  showTagModal: false,
  selectedTagsForNote: [],
  editingNote: null,
  sortOption: 'latest',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag !== action.payload);
      if (state.selectedTag === action.payload) {
        state.selectedTag = null;
      }
      state.selectedTagsForNote = state.selectedTagsForNote.filter(tag => tag !== action.payload);
    },
    
    setActiveNavItem: (state, action: PayloadAction<string>) => {
      state.activeNavItem = action.payload;
    },
    
    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
    
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    
    setShowNoteModal: (state, action: PayloadAction<boolean>) => {
      state.showNoteModal = action.payload;
      if (!action.payload) {
        state.editingNote = null;
        state.selectedTagsForNote = [];
      }
    },
    
    setShowTagModal: (state, action: PayloadAction<boolean>) => {
      state.showTagModal = action.payload;
    },
    
    setSelectedTagsForNote: (state, action: PayloadAction<string[]>) => {
      state.selectedTagsForNote = action.payload;
    },
    
    setEditingNote: (state, action: PayloadAction<Note | null>) => {
      state.editingNote = action.payload;
      if (action.payload) {
        state.selectedTagsForNote = action.payload.tags;
      }
    },
    
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    
    addTagToNote: (state, action: PayloadAction<string>) => {
      if (!state.selectedTagsForNote.includes(action.payload)) {
        state.selectedTagsForNote.push(action.payload);
      }
    },
    
    removeTagFromNote: (state, action: PayloadAction<string>) => {
      state.selectedTagsForNote = state.selectedTagsForNote.filter(tag => tag !== action.payload);
    }
  },
});

export const {
  addTag,
  deleteTag,
  setActiveNavItem,
  setSelectedTag,
  setSearchTerm,
  setShowNoteModal,
  setShowTagModal,
  setSelectedTagsForNote,
  setEditingNote,
  setSortOption,
  addTagToNote,
  removeTagFromNote
} = uiSlice.actions;

export default uiSlice.reducer;
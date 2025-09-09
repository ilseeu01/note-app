import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteFormData } from '../../types';

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [
    {
      id: 1,
      title: "Note 2 tit...",
      content: "Note 2 content",
      tags: ["exercise"],
      color: "pink" as const,
      priority: "high" as const,
      isPinned: true,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
    {
      id: 2,
      title: "Note 1 tit...",
      content: "Note 1 content",
      tags: ["coding"],
      color: "blue" as const,
      priority: "high" as const,
      isPinned: true,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    },
    {
      id: 3,
      title: "노트1",
      content: "노트1",
      tags: ["exercise"],
      color: "red" as const,
      priority: "medium" as const,
      isPinned: false,
      createdAt: new Date('2022-10-12T14:55:00'),
      updatedAt: new Date('2022-10-12T14:55:00'),
    }
  ],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteFormData>) => {
      const newNote: Note = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPinned: false,
      };
      state.notes.push(newNote);
    },
    
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = {
          ...action.payload,
          updatedAt: new Date()
        };
      }
    },
    
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    
    togglePin: (state, action: PayloadAction<number>) => {
      const note = state.notes.find(note => note.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        note.updatedAt = new Date();
      }
    }
  },
});

export const { addNote, editNote, deleteNote, togglePin } = notesSlice.actions;
export default notesSlice.reducer;
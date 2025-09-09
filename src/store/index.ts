import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['notes/addNote', 'notes/editNote'],
        ignoredPaths: ['notes.notes', 'ui.editingNote'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
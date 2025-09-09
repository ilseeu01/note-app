export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  color: 'white' | 'pink' | 'blue' | 'red';
  priority: 'low' | 'medium' | 'high';
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  notes: Note[];
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

export type SortOption = 'latest' | 'created' | 'edited' | 'priority-high-low' | 'priority-low-high';

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
  color: 'white' | 'pink' | 'blue' | 'red';
  priority: 'low' | 'medium' | 'high';
}
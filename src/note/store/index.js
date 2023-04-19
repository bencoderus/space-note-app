import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  searched: false,
  baseNotes: [],
  lastKey: "",
  loading: true,
};

export const NOTES_STATUSES = {
  PINNED_STATUS: "pinned",
  ARCHIVE_STATUS: "archived",
  DELETED_STATUS: "deleted",
  ACTIVE_STATUS: "active",
};

const name = "note";

export const noteSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.notes = [];
    },

    fetchCompleted: (state) => {
      state.loading = false;
    },

    removeNoteById: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      const note = state.notes[index];

      note.status = NOTES_STATUSES.DELETED_STATUS;
    },

    searchNote: (state, action) => {
      const baseNotes = state.searched ? state.baseNotes : state.notes;

      // When the search is empty, free up the state memory.
      if (!action.payload.keyword) {
        state.notes = baseNotes;
        state.baseNotes = [];
      } else {
        // When the search is set, create a regex and assign base notes, and filter existing note.
        const regex = new RegExp(action.payload.keyword, "i");

        state.baseNotes = baseNotes;
        state.notes = baseNotes.filter((note) => regex.test(note.title));
      }

      state.searched = !!action.payload.keyword;
    },

    markAsActiveById: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      const note = state.notes[index];

      note.status = NOTES_STATUSES.ACTIVE_STATUS;
    },

    setLastKey: (state, action) => {
      state.lastKey = action.payload.lastKey;
    },

    addNotes: (state, action) => {
      state.notes.concat(action.payload.notes);
    },

    archiveNoteById: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      const note = state.notes[index];

      note.status = NOTES_STATUSES.ARCHIVE_STATUS;
    },

    pinNoteById: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      const note = state.notes[index];

      note.status = NOTES_STATUSES.PINNED_STATUS;
    },

    unpinNoteById: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      const note = state.notes[index];

      note.status = NOTES_STATUSES.ACTIVE_STATUS;
    },

    setNotes: (state, action) => {
      if (action.payload.notes) {
        state.notes = action.payload.notes;
      }

      if (action.payload.pinnedNotes) {
        state.notes = [...state.notes, ...action.payload.pinnedNotes];
        // state.notes = state.notes.concat(action.payload.notes);
      }

      if (action.payload.lastKey) {
        state.lastKey = action.payload.lastKey;
      }

      state.loading = false;
    },
  },
});

export const noteActions = noteSlice.actions;

export const noteReducer = noteSlice.reducer;

export const noteSelector = (state) => state.note;

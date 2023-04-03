export const NOTE_REDUCER_INITIAL_STATE = {
  notes: [],
  lastKey: "",
  pinnedNotes: [],
  loading: true,
};

export const ACTIONS = {
  FETCH_COMPLETED: "fetch_completed",
  DELETE_NOTE: "delete_note",
  ADD_NOTE: "add_note",
  ADD_LAST_KEY: "add_last_key",
  ADD_PINNED_NOTES: "add_pinned_notes",
  ARCHIVE_NOTE: "archive_note",
  PIN_NOTE: "pin_note",
};

export const noteReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_COMPLETED: {
      return {
        ...state,
        loading: false,
      };
    }
    case ACTIONS.ADD_NOTE: {
      return {
        ...state,
        notes: action.notes,
      };
    }
    case ACTIONS.ADD_PINNED_NOTES: {
      return {
        ...state,
        pinnedNotes: action.notes,
      };
    }
    case ACTIONS.PIN_NOTE: {
      return {
        ...state,
        notes: state.notes.filter((note, key) => note.noteId !== action.noteId),
        pinnedNotes: [state.notes.find((note) => (note.noteId === action.noteId)), ...state.pinnedNotes],
      };
    }

    case ACTIONS.UNPIN_NOTE: {
      return {
        ...state,
        pinnedNotes: state.pinnedNotes.filter((note, key) => note.noteId !== action.noteId),
        notes: [...state.notes, state.notes.find((note) => (note.noteId === action.noteId))],
      };
    }

    case ACTIONS.ARCHIVE_NOTE: {
      return {
        ...state,
        notes: action.isPinned ? state.notes : state.notes.filter((note) => note.noteId !== action.noteId),
        pinnedNotes: action.isPinned ? state.pinnedNotes.filter((note) => note.noteId !== action.noteId) : state.pinnedNotes
      };
    }

    case ACTIONS.DELETE_NOTE: {
        return {
            ...state,
            notes: action.isPinned ? state.notes : state.notes.filter((note) => note.noteId !== action.noteId),
            pinnedNotes: action.isPinned ? state.pinnedNotes.filter((note) => note.noteId !== action.noteId) : state.pinnedNotes
          };
    }
    default: {
      return state;
    }
  }
};

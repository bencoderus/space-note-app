import { NOTES_STATUSES } from "../services/note-service";

export const NOTE_REDUCER_INITIAL_STATE = {
  notes: [],
  lastKey: "",
  pinnedNotes: [],
  loading: true,
};

export const NOTE_REDUCER_ACTIONS = {
  FETCH_COMPLETED: "fetch_completed",
  REMOVE_NOTE: "delete_note",
  ADD_NOTES: "add_notes",
  SET_NOTE: "set_note",
  SET_LAST_KEY: "set_last_key",
  SET_PINNED_NOTES: "set_pinned_notes",
  ARCHIVE_NOTE: "archive_note",
  PIN_NOTE: "pin_note",
  MARK_AS_ACTIVE: "mark_as_active",
  UNPIN_NOTE: "unpin_note",
};

/**
 * Add notes reducer.
 *
 * @param {{notes: Array<any>, lastKey: string, pinnedNotes: Array<any>, loading: boolean}} state
 * @param {Record<string, any>} action
 * @returns {{notes: Array<any>, lastKey: string, pinnedNotes: Array<any>, loading: boolean}}
 */
export const noteReducer = (state, action) => {
  switch (action.type) {
    case NOTE_REDUCER_ACTIONS.FETCH_COMPLETED: {
      return {
        ...state,
        loading: false,
      };
    }

    case NOTE_REDUCER_ACTIONS.SET_NOTE: {
      return {
        ...state,
        notes: action.notes,
      };
    }

    case NOTE_REDUCER_ACTIONS.ADD_NOTES: {
      return {
        ...state,
        notes: [...state.notes, ...action.notes],
      };
    }

    case NOTE_REDUCER_ACTIONS.SET_PINNED_NOTES: {
      return {
        ...state,
        pinnedNotes: action.notes,
      };
    }

    case NOTE_REDUCER_ACTIONS.PIN_NOTE: {
      const note = state.notes.find((note) => note.noteId === action.noteId);
      note["status"] = NOTES_STATUSES.PINNED_STATUS;

      return {
        ...state,
        pinnedNotes: [note, ...state.pinnedNotes],
        notes: state.notes.filter((note, key) => note.noteId !== action.noteId),
      };
    }

    case NOTE_REDUCER_ACTIONS.UNPIN_NOTE: {
      const note = state.pinnedNotes.find(
        (note) => note.noteId === action.noteId
      );
      note["status"] = NOTES_STATUSES.ACTIVE_STATUS;

      return {
        ...state,
        notes: [...state.notes, note],
        pinnedNotes: state.pinnedNotes.filter(
          (note) => note.noteId !== action.noteId
        ),
      };
    }

    case NOTE_REDUCER_ACTIONS.MARK_AS_ACTIVE: {
      return {
        ...state,
        notes: state.notes.filter((note) => note.noteId !== action.noteId)
      };
    }

    case NOTE_REDUCER_ACTIONS.ARCHIVE_NOTE: {
      return {
        ...state,
        notes: action.isPinned
          ? state.notes
          : state.notes.filter((note) => note.noteId !== action.noteId),
        pinnedNotes: action.isPinned
          ? state.pinnedNotes.filter((note) => note.noteId !== action.noteId)
          : state.pinnedNotes,
      };
    }

    case NOTE_REDUCER_ACTIONS.SET_LAST_KEY: {
      return {
        ...state,
        lastKey: action.lastKey,
      };
    }

    case NOTE_REDUCER_ACTIONS.REMOVE_NOTE: {
      return {
        ...state,
        notes: action.isPinned
          ? state.notes
          : state.notes.filter((note) => note.noteId !== action.noteId),
        pinnedNotes: action.isPinned
          ? state.pinnedNotes.filter((note) => note.noteId !== action.noteId)
          : state.pinnedNotes,
      };
    }

    default: {
      return state;
    }
  }
};

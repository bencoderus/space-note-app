import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Notes } from "../../note/components/Notes";
import {
  deleteNoteById,
  getDeletedNotes,
  getNoteByLastKey,
  setNoteActive,
} from "../../note/services/note-service";
import { LoadMore } from "../../note/components/LoadMore";
import { toast } from "react-toastify";
import {
  NOTE_REDUCER_ACTIONS,
  NOTE_REDUCER_INITIAL_STATE,
  noteReducer,
} from "../../note/reducers/note-reducer";
import { DashboardLayout } from "../../dashboard/sections/DashboardLayout";

export const DeletedNotes = () => {
  const [state, dispatch] = useReducer(noteReducer, NOTE_REDUCER_INITIAL_STATE);
  const { notes, loading, lastKey } = state;

  const deleteNote = async (noteId, isPinned, setDisabled) => {
    setDisabled(true);

    const response = await deleteNoteById(noteId);

    if (response.status) {
      dispatch({ type: NOTE_REDUCER_ACTIONS.REMOVE_NOTE, noteId, isPinned });
      setDisabled(false);
      toast.success("Note removed successfully");
      return;
    }

    setDisabled(false);
    toast.error("Unable to remove note.");
    return;
  };

  const setAsActive = async (noteId, setDisabled) => {
    setDisabled(true);

    const response = await setNoteActive(noteId);

    if (response.status) {
      dispatch({ type: NOTE_REDUCER_ACTIONS.MARK_AS_ACTIVE, noteId });
      toast.success("Note restored successfully.");
      setDisabled(false);
      return;
    }

    setDisabled(false);
    toast.error("Unable to restore note.");
    return;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getDeletedNotes();

      if (response.status) {
        dispatch({
          type: NOTE_REDUCER_ACTIONS.SET_NOTE,
          notes: response.data.data.records,
        });
        dispatch({
          type: NOTE_REDUCER_ACTIONS.SET_LAST_KEY,
          lastKey: response.data.data.lastKey,
        });

        dispatch({ type: NOTE_REDUCER_ACTIONS.FETCH_COMPLETED });
      }
    };

    fetchNotes();
  }, []);

  return (
    <DashboardLayout>

      <div className="mt-8">
        <p className="text-2xl font-bold my-4">Trash</p>
        {!loading && notes.length === 0 && (
          <p>
           Your trash is empty.
          </p>
        )}

        <Notes
          loading={loading}
          notes={notes}
          actions={{ deleteNote, setAsActive }}
        />
      </div>

      <LoadMore
        text="Load More"
        dispatcher={dispatch}
        lastKey={lastKey}
        action={getNoteByLastKey}
      />
    </DashboardLayout>
  );
};
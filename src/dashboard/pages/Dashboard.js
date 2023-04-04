import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Notes } from "../../note/components/Notes";
import {
  archiveNoteById,
  deleteNoteById,
  getNoteByLastKey,
  getNotes,
  getPinnedNote,
  pinNoteById,
  unpinNoteById,
} from "../../note/services/note-service";
import { DashboardLayout } from "../sections/DashboardLayout";
import { FaPlus } from "react-icons/fa";
import { LoadMore } from "../../note/components/LoadMore";
import { toast } from "react-toastify";
import {
  NOTE_REDUCER_ACTIONS,
  NOTE_REDUCER_INITIAL_STATE,
  noteReducer,
} from "../../note/reducers/note-reducer";

export const Dashboard = () => {
  const [state, dispatch] = useReducer(noteReducer, NOTE_REDUCER_INITIAL_STATE);
  const { pinnedNotes, notes, loading, lastKey } = state;


  const pinNote = async (noteId, setDisabled) => {
    setDisabled(true);

    const response = await pinNoteById(noteId);

    if (response.status) {
      dispatch({ type: NOTE_REDUCER_ACTIONS.PIN_NOTE, noteId });
      setDisabled(false);
      toast.success("Note pinned successfully");
      return;
    }

    setDisabled(false);
    toast.error("Unable to remove note.");
    return;
  };

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

  const archiveNote = async (noteId, isPinned, setDisabled) => {
    setDisabled(true);

    const response = await archiveNoteById(noteId);

    if (response.status) {
      dispatch({ type: NOTE_REDUCER_ACTIONS.REMOVE_NOTE, noteId, isPinned });
      setDisabled(false);
      toast.success("Note archived successfully");
      return;
    }

    setDisabled(false);
    toast.error("Unable to archive note.");
    return;
  };

  const unpinNote = async (noteId, setDisabled) => {
    setDisabled(true);

    const response = await unpinNoteById(noteId);

    if (response.status) {
      dispatch({ type: NOTE_REDUCER_ACTIONS.UNPIN_NOTE, noteId });
      toast.success("Note unpinned successfully.");
      setDisabled(false);
      return;
    }

    setDisabled(false);
    toast.error("Unable to unpin note.");
    return;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNotes();
      const pinnedResponse = await getPinnedNote();

      if (response.status && pinnedResponse.status) {
        dispatch({
          type: NOTE_REDUCER_ACTIONS.SET_NOTE,
          notes: response.data.data.records,
        });
        dispatch({
          type: NOTE_REDUCER_ACTIONS.SET_PINNED_NOTES,
          notes: pinnedResponse.data.data.records,
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
    <DashboardLayout
      title="Dashboard"
      sideContent={
        <Link to="/notes/create" className="flex items-center font-bold">
          <FaPlus /> <span className="ml-2">New Note</span>
        </Link>
      }
    >
      {pinnedNotes.length > 0 ? (
        <div className="mt-8">
          <p className="text-2xl m-2 font-bold my-4">Pinned</p>
          <Notes
            loading={loading}
            notes={pinnedNotes}
            actions={{ pinNote, unpinNote, deleteNote, archiveNote }}
            isPinned={true}
          />
        </div>
      ) : (
        ""
      )}

      <div className="mt-8">
        <p className="text-2xl m-2 font-bold my-4">Notes</p>
        <Notes
          loading={loading}
          notes={notes}
          actions={{ pinNote, unpinNote, deleteNote, archiveNote }}
          isPinned={false}
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

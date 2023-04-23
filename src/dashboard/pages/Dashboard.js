import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Notes } from "../../note/components/Notes";
import {
  NOTES_STATUSES,
  archiveNoteById,
  deleteNoteById,
  getNoteByLastKey,
  getNotes,
  getPinnedNote,
  pinNoteById,
  setNoteActive,
  unpinNoteById,
} from "../../note/services/note-service";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { LoadMore } from "../../note/components/LoadMore";
import { toast } from "react-toastify";
import { PageHeading } from "../../note/components/PageHeading";
import { SearchInput } from "../../note/components/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { noteSelector, noteActions } from "../../note/store";


export const Dashboard = () => {
  const dispatch = useDispatch();
  const { notes, loading, lastKey } = useSelector(noteSelector);

  const pinNote = async (noteId, setDisabled) => {
    setDisabled(true);

    const response = await pinNoteById(noteId);

    if (response.status) {
      dispatch(noteActions.pinNoteById({ noteId }));
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
      dispatch(noteActions.removeNoteById({ noteId }));
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
      dispatch(noteActions.archiveNoteById({ noteId }));
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
      dispatch(noteActions.unpinNoteById({ noteId }));
      toast.success("Note unpinned successfully.");
      setDisabled(false);
      return;
    }

    setDisabled(false);
    toast.error("Unable to unpin note.");
    return;
  };

  const setAsActive = async (noteId, setDisabled) => {
    setDisabled(true);

    const response = await setNoteActive(noteId);

    if (response.status) {
      dispatch(noteActions.markAsActiveById({ noteId }));
      toast.success("Note restored successfully.");
      setDisabled(false);
      return;
    }

    setDisabled(false);
    toast.error("Unable to restore note.");
    return;
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value;

    dispatch(noteActions.searchNote({ keyword }));
  };

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(noteActions.fetchStart());

      const response = await getNotes();
      const pinnedResponse = await getPinnedNote();

      if (response.status && pinnedResponse.status) {
        dispatch(
          noteActions.setNotes({
            notes: response.data.data.records,
            pinnedNotes: pinnedResponse.data.data.records,
            lastKey: response.data.data.lastKey,
          })
        );
      }
    };

    fetchNotes();
  }, [dispatch]);

  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.status === NOTES_STATUSES.PINNED_STATUS),
    [notes]
  );
  const activeNotes = useMemo(
    () => notes.filter((note) => note.status === NOTES_STATUSES.ACTIVE_STATUS),
    [notes]
  );

  return (
    <DashboardLayout>
      <SearchInput handleChange={handleSearchChange} />

      {pinnedNotes.length > 0 && (
        <div className="mt-8">
          <PageHeading title="Pinned" />
          <Notes
            loading={loading}
            notes={pinnedNotes}
            actions={{
              pinNote,
              unpinNote,
              deleteNote,
              archiveNote,
              setAsActive,
            }}
          />
        </div>
      )}

      <PageHeading
        title="Notes"
        subtitle={
          !loading &&
          activeNotes.length === 0 && (
            <span>
              Please create your first note{" "}
              <Link to="/notes/create" className="font-bold">
                Here
              </Link>
            </span>
          )
        }
      />

      <div className="mt-8">
        <Notes
          loading={loading}
          notes={activeNotes}
          actions={{ pinNote, unpinNote, deleteNote, archiveNote, setAsActive }}
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

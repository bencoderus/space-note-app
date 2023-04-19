import React, { useEffect, useMemo } from "react";
import { Notes } from "../../note/components/Notes";
import {
  NOTES_STATUSES,
  deleteNoteById,
  getDeletedNotes,
  getNoteByLastKey,
  setNoteActive,
} from "../../note/services/note-service";
import { LoadMore } from "../../note/components/LoadMore";
import { toast } from "react-toastify";
import { DashboardLayout } from "../../dashboard/layouts/DashboardLayout";
import { PageHeading } from "../components/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { noteSelector, noteActions } from "../store";

export const DeletedNotes = () => {
  const dispatch = useDispatch();
  const { notes, loading, lastKey } = useSelector(noteSelector);

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

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(noteActions.fetchStart());

      const response = await getDeletedNotes();

      if (response.status) {
        dispatch(
          noteActions.setNotes({
            notes: response.data.data.records,
            lastKey: response.data.data.lastKey,
          })
        );
      }
    };

    fetchNotes();
  }, [dispatch]);

  const deletedNotes = useMemo(() => notes.filter((note) => note.status === NOTES_STATUSES.DELETED_STATUS), [notes])

  return (
    <DashboardLayout>
      <div className="mt-8">
        <PageHeading
          title="Trash"
          subtitle={
            !loading && deletedNotes.length === 0 && <p>Your trash is empty.</p>
          }
        />

        <Notes
          loading={loading}
          notes={deletedNotes}
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

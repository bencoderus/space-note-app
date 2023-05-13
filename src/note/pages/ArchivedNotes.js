import React, { useEffect, useMemo } from "react";
import { Notes } from "../components/Notes";
import {
  NOTES_STATUSES,
  archiveNoteById,
  getArchivedNotes,
  getNoteByLastKey,
  setNoteActive,
} from "../services/note-service";
import { LoadMore } from "../components/LoadMore";
import { toast } from "react-toastify";
import { DashboardLayout } from "../../dashboard/layouts/DashboardLayout";
import { PageHeading } from "../components/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, noteSelector } from "../store";
export const ArchivedNotes = () => {
  const dispatch = useDispatch();
  const { notes, loading, lastKey } = useSelector(noteSelector);

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
    toast.error(response.message);

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
    toast.error(response.message);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(noteActions.fetchStart());

      const response = await getArchivedNotes();

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

  const archivedNotes = useMemo(() => notes.filter((note) => note.status === NOTES_STATUSES.ARCHIVE_STATUS), [notes])

  return (
    <DashboardLayout>
      <div className="mt-8">
        <PageHeading
          title="Archived"
          subtitle={!loading && archivedNotes.length === 0 && <p>No archived note.</p>}
        />

        <Notes
          loading={loading}
          notes={archivedNotes}
          actions={{ archiveNote, setAsActive }}
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

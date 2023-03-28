import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Notes } from "../../note/components/Notes";
import {
  getNoteByLastKey,
  getNotes,
  getPinnedNote,
  pinNoteById,
  unpinNoteById,
} from "../../note/services/note-service";
import { DashboardLayout } from "../sections/DashboardLayout";
import { FaPlus } from "react-icons/fa";
import { LoadMore } from "../../note/components/LoadMore";

export const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastKey, setLastKey] = useState(null);

  const pinNote = async (noteId, setDisabled) => {
    setDisabled(true);
    const note = notes.find((note) => {
      return note.noteId === noteId;
    });

    if (!note) {
      console.log("Unable to pin note.");
      setDisabled(false);
      return;
    }

    const response = await pinNoteById(note.noteId);

    if (response.status) {
      setPinnedNotes([note, ...pinnedNotes]);

      setNotes(notes.filter((note, key) => note.noteId !== noteId));
    }

    setDisabled(false);
  };

  const unpinNote = async (noteId, setDisabled) => {
    setDisabled(true);
    const note = pinnedNotes.find((note) => {
      return note.noteId === noteId;
    });

    if (!note) {
      console.log("Unable to pin note.");
      setDisabled(false);
      return;
    }

    const response = await unpinNoteById(note.noteId);

    if (response.status) {
      setNotes([note, ...notes]);

      setPinnedNotes(pinnedNotes.filter((note, key) => note.noteId !== noteId));
    }

    setDisabled(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNotes();
      const pinnedResponse = await getPinnedNote();

      if (response.status && pinnedResponse.status) {
        setNotes(response.data.data.records);
        setPinnedNotes(pinnedResponse.data.data.records);
        setLastKey(response.data.data.lastKey)
        setLoading(false);
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
            pinAction={unpinNote}
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
          pinAction={pinNote}
          isPinned={false}
        />
      </div>

      <LoadMore text="Load More" state={notes} setState={setNotes} lastKey={lastKey} setLastKey={setLastKey} action={getNoteByLastKey}/>
    </DashboardLayout>
  );
};

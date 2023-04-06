import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { Spinner } from "../../common/components/Spinner";
import { NOTES_STATUSES } from "../services/note-service";

export const Note = ({ loading, note, actions }) => {
  const { pinNote, unpinNote, deleteNote, archiveNote, setAsActive } = actions;
  const isPinned = note && note.status === NOTES_STATUSES.PINNED_STATUS;

  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dropdownRef = useRef(null);

  // Add click event listener to the document
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // @ts-ignore
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="lg:mx-0 max-w-sm p-4 mx-4 w-full h-44 flex justify-between flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:text-gray-500 dark:border-gray-700">
        <Link
          to={loading ? `/` : `/note/${note.noteId}`}
          className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {loading ? <Skeleton /> : note.title}
        </Link>

        {loading ? (
          <Skeleton count={1} />
        ) : (
          <div className="flex justify-end">
            <div className="relative" ref={dropdownRef}>
              <button
                className="focus:outline-none text-white hover:text-gray-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                {disabled ? <Spinner /> : <FaEllipsisV />}
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-32 text-sm rounded-md shadow-lg bg-white z-10">
                  <ul>
                    {pinNote && unpinNote && (
                      <li>
                        {note.status === NOTES_STATUSES.PINNED_STATUS ? (
                          <button
                            className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            onClick={() => unpinNote(note.noteId, setDisabled)}
                            disabled={disabled}
                          >
                            Unpin
                          </button>
                        ) : (
                          <button
                            className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            onClick={() => pinNote(note.noteId, setDisabled)}
                            disabled={disabled}
                          >
                            Pin
                          </button>
                        )}
                      </li>
                    )}

                    {setAsActive && archiveNote && (
                      <li>
                        {note.status === NOTES_STATUSES.ARCHIVE_STATUS ? (
                          <button
                            className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            onClick={() =>
                              setAsActive(note.noteId, setDisabled)
                            }
                            disabled={disabled}
                          >
                            Unarchive
                          </button>
                        ) : (
                          <button
                            className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            onClick={() =>
                              archiveNote(note.noteId, isPinned, setDisabled)
                            }
                            disabled={disabled}
                          >
                            Archive
                          </button>
                        )}
                      </li>
                    )}

                    {setAsActive && deleteNote && (
                      <li>
                        {note.status === NOTES_STATUSES.DELETED_STATUS ? (
                          <button
                            className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            onClick={() =>
                              setAsActive(note.noteId, setDisabled)
                            }
                            disabled={disabled}
                          >
                            Restore
                          </button>
                        ) : (
                          <button
                            className="w-full px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            onClick={() =>
                              deleteNote(note.noteId, isPinned, setDisabled)
                            }
                            disabled={disabled}
                          >
                            Delete
                          </button>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

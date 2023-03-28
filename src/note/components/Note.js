import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { FaThumbtack, FaTrash } from "react-icons/fa";
import { Spinner } from "../../common/components/Spinner";

export const Note = ({ loading, note, pinAction, isPinned }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="max-w-sm p-6 m-2 w-full h-44 flex justify-between flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={loading ? `/` : `note/${note.noteId}`}
        className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {loading ? <Skeleton /> : note.title}
      </Link>

      {loading ? (
        <Skeleton count={1} />
      ) : (
        <div className="flex justify-between">
          <button
            className="font-bold text-white hover:text-gray-300"
            type="button"
            onClick={() => alert("Hello")}
          >
            {disabled ? <Spinner /> : <FaTrash />}
          </button>
          <button
            type="button"
            className={`font-bold hover:text-gray-300 ${
              isPinned ? "text-gray-500" : "text-white"
            }`}
            disabled={disabled}
            onClick={() => pinAction(note.noteId, setDisabled)}
          >
            {disabled ? <Spinner /> : <FaThumbtack />}
          </button>
        </div>
      )}
    </div>
  );
};

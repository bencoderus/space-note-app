import React from "react";
import { Note } from "./Note";

export const Notes = ({
  loading,
  notes,
  skeletonCount,
  pinAction,
  isPinned,
  deleteAction,
}) => {
  const loader = Array.from({ length: skeletonCount });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3">
      {loading
        ? loader.map((note, key) => (
            <Note
              loading={loading}
              key={key}
              note={note}
              pinAction={pinAction}
              isPinned={isPinned}
              deleteAction={deleteAction}
            />
          ))
        : notes.map((note, key) => (
            <Note
              note={note}
              key={key}
              loading={loading}
              pinAction={pinAction}
              isPinned={isPinned}
              deleteAction={deleteAction}
            />
          ))}
    </div>
  );
};

Notes.defaultProps = {
  skeletonCount: 8,
};

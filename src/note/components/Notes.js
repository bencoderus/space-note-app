import React from "react";
import { Note } from "./Note";

export const Notes = ({
  loading,
  notes,
  skeletonCount,
  isPinned,
  actions
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
              actions={actions}
              isPinned={isPinned}
            />
          ))
        : notes.map((note, key) => (
            <Note
              note={note}
              key={key}
              loading={loading}
              actions={actions}
              isPinned={isPinned}
            />
          ))}
    </div>
  );
};

Notes.defaultProps = {
  skeletonCount: 8,
};

import React, { useState } from "react";
import { Spinner } from "../../common/components/Spinner";
import { noteActions } from "../store";

export const LoadMore = ({ text, dispatcher, lastKey, action }) => {
  const [loading, setLoading] = useState(false);

  const LoadMoreContent = async () => {
    setLoading(true);
    const response = await action(lastKey);

    if (response.status) {
      const notes = response.data.data.records;
      const lastKey = response.data.data.lastKey;

      dispatcher(noteActions.setLastKey({ lastKey }));
      dispatcher(noteActions.addNotes({ notes }));
    }

    setLoading(false);
  };

  return lastKey ? (
    <div className="my-4 flex justify-center">
      <button
        className="bg-gray-800 rounded-lg text-white px-8 py-2 font-bold"
        type="button"
        disabled={loading}
        onClick={() => LoadMoreContent()}
      >
        {loading ? (
          <span>
            <Spinner />
            Loading
          </span>
        ) : (
          <span>{text}</span>
        )}
      </button>
    </div>
  ) : (
    <></>
  );
};

LoadMore.defaultProps = {};

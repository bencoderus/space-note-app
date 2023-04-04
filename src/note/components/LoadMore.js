import React, { useState } from "react";
import { Spinner } from "../../common/components/Spinner";
import { NOTE_REDUCER_ACTIONS } from "../reducers/note-reducer";

export const LoadMore = ({
  text,
  dispatcher,
  lastKey,
  action,
}) => {
  const [loading, setLoading] = useState(false);

  const LoadMoreContent = async () => {
    setLoading(true);
    const response = await action(lastKey);

    if (response.status) {
      const notes = response.data.data.records;
      const lastKey = response.data.data.lastKey;

      dispatcher({type: NOTE_REDUCER_ACTIONS.SET_LAST_KEY, lastKey})
      dispatcher({type: NOTE_REDUCER_ACTIONS.ADD_NOTES, notes})
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

import { authApiRequest } from "../../common/services/request-service";

const PINNED_STATUS = 'pinned';
const ACTIVE_STATUS = 'active';

export const getNotes = async () => {
  try {
    const response = await authApiRequest().get(`notes`);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};

export const getNoteByLastKey = async (lastKey) => {
  try {
    const response = await authApiRequest().get(`notes`, {
      params: {
        lastKey
      }
    });
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};

export const pinNoteById = async (noteId) => {
  try {
    const response = await authApiRequest().patch(`/notes/${noteId}/status`, {
        status: PINNED_STATUS
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
}

export const deleteNoteById = async (noteId) => {
  try {
    const response = await authApiRequest().delete(`/notes/${noteId}`);

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
}

export const unpinNoteById = async (noteId) => {
  try {
    const response = await authApiRequest().patch(`/notes/${noteId}/status`, {
        status: ACTIVE_STATUS
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
}

export const getPinnedNote = async () => {
  try {
    const response = await authApiRequest().get(`notes`, {
      params: {
        status: PINNED_STATUS
      }
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};

export const getNote = async (noteId) => {
  try {
    const response = await authApiRequest().get(`notes/${noteId}`);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};

export const updateNote = async (noteId, data) => {
  try {
    const response = await authApiRequest().put(`notes/${noteId}`, data);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};

export const createNote = async (data) => {
  try {
    const response = await authApiRequest().post(`notes`, data);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      data: error.response ? error.response.data : error.message,
    };
  }
};
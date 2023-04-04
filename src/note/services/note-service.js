import config from "../../common/config";
import { apiRequest } from "../../common/services/request-service";

const PINNED_STATUS = "pinned";
const ARCHIVE_STATUS = "archived";
const ACTIVE_STATUS = "active";

const noteClient = () => {
  return apiRequest.setBaseUrl(config.apiUrl).useAuth();
};

export const getNotes = async () => {
  return noteClient().send({
    url: "notes",
    method: "GET",
  });
};

export const getNoteByLastKey = async (lastKey) => {
  return noteClient().send({
    url: "notes",
    method: "GET",
    query: {
      lastKey,
    },
  });
};

export const pinNoteById = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}/status`,
    method: "PATCH",
    data: {
      status: PINNED_STATUS,
    },
  });
};

export const deleteNoteById = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}`,
    method: "DELETE",
  });
};

export const archiveNoteById = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}/status`,
    method: "PATCH",
    data: {
      status: ARCHIVE_STATUS,
    },
  });
};

export const unpinNoteById = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}/status`,
    method: "PATCH",
    data: {
      status: ACTIVE_STATUS,
    },
  });
};

export const getPinnedNote = async () => {
  return noteClient().send({
    url: "notes",
    method: "GET",
    query: {
      status: PINNED_STATUS,
    },
  });
};

export const getNote = async (noteId) => {
  return noteClient().send({
    url: `notes/${noteId}`,
    method: "GET"
  });
};

export const updateNote = async (noteId, data) => {
  return noteClient().send({
    url: `notes/${noteId}`,
    method: "PUT",
    data,
  });
};

export const createNote = async (data) => {
  return noteClient().send({
    url: "notes",
    method: "POST",
    data,
  });
};

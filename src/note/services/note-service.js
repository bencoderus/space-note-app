import config from "../../common/config";
import { apiRequest } from "../../common/services/request-service";

export const NOTES_STATUSES = {
  PINNED_STATUS: "pinned",
  ARCHIVE_STATUS: "archived",
  DELETED_STATUS: "deleted",
  ACTIVE_STATUS: "active",
};

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

export const getPinnedNotes = async (noteId) => {
  return noteClient().send({
    url: `/notes`,
    method: "GET",
    query: {
      status: NOTES_STATUSES.PINNED_STATUS,
    },
  });
};

export const getArchivedNotes = async (noteId) => {
  return noteClient().send({
    url: `/notes`,
    method: "GET",
    query: {
      status: NOTES_STATUSES.ARCHIVE_STATUS,
    },
  });
};

export const getDeletedNotes = async (noteId) => {
  return noteClient().send({
    url: `/notes`,
    method: "GET",
    query: {
      status: NOTES_STATUSES.DELETED_STATUS,
    },
  });
};

export const pinNoteById = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}/status`,
    method: "PATCH",
    data: {
      status: NOTES_STATUSES.PINNED_STATUS,
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
      status: NOTES_STATUSES.ARCHIVE_STATUS,
    },
  });
};

export const unpinNoteById = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}/status`,
    method: "PATCH",
    data: {
      status: NOTES_STATUSES.ACTIVE_STATUS,
    },
  });
};

export const setNoteActive = async (noteId) => {
  return noteClient().send({
    url: `/notes/${noteId}/status`,
    method: "PATCH",
    data: {
      status: NOTES_STATUSES.ACTIVE_STATUS,
    },
  });
};

export const getPinnedNote = async () => {
  return noteClient().send({
    url: "notes",
    method: "GET",
    query: {
      status: NOTES_STATUSES.PINNED_STATUS,
    },
  });
};

export const getNote = async (noteId) => {
  return noteClient().send({
    url: `notes/${noteId}`,
    method: "GET",
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

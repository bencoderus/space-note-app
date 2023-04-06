import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../dashboard/sections/DashboardLayout";
import { ContentEditor } from "../components/ContentEditor";
import { getNote, updateNote } from "../services/note-service";
import { toast } from "react-toastify";
import { NoteButton } from "../components/NoteButton";

export const ShowNote = () => {
  const editorRef = useRef(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNote(id);

      if (response.status) {
        const note = response.data.data;
        setForm({
          title: note.title,
          content: note.content,
        });
      }

      setFetching(false);
    };

    fetchNotes();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      ...form,
      content: editorRef.current.getContent(),
    };
    const response = await updateNote(id, data);

    if (!response.status) {
      setError(response?.data?.message);
      setLoading(false);
      toast.error("Unable to update note.");
      return;
    }

    setLoading(false);
    toast.success("Note updated successfully.");

    navigate("/");
  };

  return (
    <DashboardLayout
      title="Manage Note"
    >
      {" "}
      {fetching ? (
        <div>Loading content</div>
      ) : (
        <form onSubmit={handleForm}>
          <div className="my-4">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={form.title}
            />
          </div>

          <ContentEditor ref={editorRef} initialValue={form.content} />

          <div className="my-4">
            <p className="text-red-500">{error}</p>
            <NoteButton text="Save changes" loading={loading} />
          </div>
        </form>
      )}
    </DashboardLayout>
  );
};

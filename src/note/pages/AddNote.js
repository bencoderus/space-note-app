import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../dashboard/layouts/DashboardLayout";
import { ContentEditor } from "../components/ContentEditor";
import { createNote } from "../services/note-service";
import { toast } from "react-toastify";
import { NoteButton } from "../components/NoteButton";
import { FaArrowLeft } from "react-icons/fa";

export const AddNote = () => {
  const editorRef = useRef(null);

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    const response = await createNote(data);

    if (!response.status) {
      setLoading(false);
      setError(response.message);
      toast.error(response.message);
      return;
    }

    setLoading(false);
    toast.success("Note created successfully.");
    navigate("/");
  };

  return (
    <DashboardLayout
      title="New Note"
      sideContent={
        <Link to="/" className="font-bold">
          <span className="flex items-center">
            <FaArrowLeft className="mr-3" /> View Notes
          </span>
        </Link>
      }
    >
      <form onSubmit={handleForm}>
        <div className="my-4">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <ContentEditor ref={editorRef} />
        <div className="my-4">
          <p className="text-red-500">{error}</p>
          <NoteButton text="Create Note" loading={loading} />
        </div>
      </form>
    </DashboardLayout>
  );
};

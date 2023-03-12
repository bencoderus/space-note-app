import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../auth/components/AuthButton";
import { AuthSection } from "../../auth/components/AuthSection";
import { forgotPassword, PASSWORD_RESET_ROUTE } from "../services/auth-service";

export const ForgotPassword = () => {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await forgotPassword({
      redirectTo: PASSWORD_RESET_ROUTE,
      ...form,
    });

    if (!response.status) {
      setMessage({
        type: "error",
        content: response?.data?.message,
      });

      setLoading(false);
      return;
    }

    setLoading(false);

    setMessage({
      type: "success",
      content: response?.data?.message,
    });

    navigate("/login", {
      state: {
        successMessage: "A password reset email has been sent to you.",
      },
    });
  };

  return (
    <AuthSection>
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <svg
                className="w-10 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 225 225"
              >
                <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                  <g>
                    <path
                      id="Layer0_0_1_STROKES"
                      className="st0"
                      d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              SpaceNote
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
          >
            Forgot Password
          </h2>
          {message.type === "error" ? (
            <p className="my-4 text-red-600">{message.content}</p>
          ) : (
            ""
          )}
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mt-10">
                <AuthButton
                  text="Reset password"
                  type="submit"
                  loading={loading}
                />
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Remembered your password ?
              <Link
                to="/"
                className="cursor-pointer text-indigo-600 hover:text-indigo-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthSection>
  );
};

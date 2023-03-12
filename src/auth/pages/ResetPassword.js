import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../auth/components/AuthButton";
import { AuthSection } from "../../auth/components/AuthSection";
import { resetPassword } from "../services/auth-service";

export const ResetPassword = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ password: "", password_confirmation: "" });
  const [accessToken, setAccessToken] = useState("");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const [, urlData] = url.split("#");
    const params = new URLSearchParams(urlData || "");
    const token = params.get("access_token") || "";

    if (!token) {
      navigate("/login", { state: { errorMessage: "Reset token is invalid or has expired." } });
    }

    setAccessToken(token);
  }, [navigate, accessToken]);

  const validatePassword = (event) => {
    const targetName = event.target.name;
    const otherField =
      targetName === "password" ? "password_confirmation" : "password";
    const targetValue = event.target.value;
    const fieldValue = form[otherField];

    if (targetValue && fieldValue && targetValue !== fieldValue) {
      setError("Password does not match.");
      setDisabled(true);
    }

    if (targetValue && fieldValue && targetValue === fieldValue) {
      setError("");
      setDisabled(false);
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    validatePassword(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDisabled(true);

    const response = await resetPassword({
      password: form.password,
      accessToken: accessToken,
    });

    if (!response.status) {
      setError(response?.data?.message);

      setDisabled(false);
      return;
    }

    setDisabled(false);

    navigate("/login", {
      state: { successMessage: "Password reset successfully." },
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
            Reset Password
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  New Password
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="password"
                  placeholder="New Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-8">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Confirm Password
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
                <p className="text-sm my-4 text-red-500">{error}</p>
              </div>
              <div className="mt-10">
                <AuthButton
                  text="Reset password"
                  type="submit"
                  loading={disabled}
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

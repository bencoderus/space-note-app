import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../auth/components/AuthButton";
import { AuthSection } from "../../auth/components/AuthSection";
import { resetPassword } from "../services/auth-service";
import { PageTitle } from "../components/PageTitle";

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
      navigate("/login", {
        state: { errorMessage: "Reset token is invalid or has expired." },
      });
    }

    setAccessToken(token);
  }, [navigate, accessToken]);

  useEffect(() => {
    if (
      form.password &&
      form.password_confirmation &&
      form.password !== form.password_confirmation
    ) {
      setError("Password does not match.");
      setDisabled(true);
    } else if (
      form.password &&
      form.password_confirmation &&
      form.password === form.password_confirmation
    ) {
      setError("");
      setDisabled(false);
    }
  }, [form.password, form.password_confirmation]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDisabled(true);

    const response = await resetPassword({
      password: form.password,
      accessToken: accessToken,
    });

    if (!response.status) {
      setError(response.message);

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
        <div className="py-12 bg-gray-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <PageTitle />
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-gray-900 font-display font-semibold lg:text-left xl:text-5xl
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
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
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
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
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
                  error={error}
                  loading={disabled}
                />
              </div>
            </form>
            <div className="mt-12 text-sm font-display text-gray-700 text-center">
              Remembered your password ?
              <Link
                to="/"
                className="cursor-pointer font-bold text-gray-600 hover:text-gray-800"
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

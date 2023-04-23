import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpiredAt, getUser, loginUser } from "../services/auth-service";
import { useAuth } from "../../common/hooks/auth-hook";
import { Spinner } from "../../common/components/Spinner";

const AUTH_MESSAGES = {
  1: "Attempting authentication, please wait.",
  2: "User details retrieving, attempting authentication.",
  3: "Logged in",
};

export const AuthenticateSocial = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const [, setAuth] = useAuth();

  const backLogin = useCallback(
    (message = "Unable to complete login process.") =>
      navigate("/login", {
        state: { errorMessage: message },
      }),
    [navigate]
  );

  useEffect(() => {
    const authenticateUser = async (token) => {
      const { status, message, data } = await getUser(token.access_token);
      console.log(message, data);

      if (!status) {
        return backLogin();
      }

      const user = data.data.user;

      const authData = {
        ...token,
        user,
      };

      loginUser(authData, setAuth);

      setStep(3);
      navigate("/");
    };

    const url = window.location.href;
    const [, urlData] = url.split("#");
    const params = new URLSearchParams(urlData || "");

    const token = {
      access_token: params.get("access_token") || "",
      refresh_token: params.get("refresh_token") || "",
      expires_at: getExpiredAt(params.get("expires_in") || 0),
    };

    if (!token) {
      return backLogin();
    }

    authenticateUser(token);
  }, [backLogin, navigate, setAuth]);

  const message = useMemo(() => {
    return AUTH_MESSAGES[step];
  }, [step]);

  return (
    <div className="flex justify-center items-center h-screen font-bold">
      <Spinner /> {message}
    </div>
  );
};

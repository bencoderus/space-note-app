import React, { useState } from "react";
import { loginWithSocial } from "../services/auth-service";
import { toast } from "react-toastify";

export const SocialLoginButton = ({ text, provider }) => {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async () => {
    setLoading(true);
    const { data, message, status } = await loginWithSocial(provider);

    if (!status) {
      toast.error(message);
      setLoading(false)
      return;
    }

    const url = data.data.url;
    window.location.href = url;
  };

  return (
    <button
      type="button"
      className="bg-white border-border border-black text-dark p-4 w-full rounded-full tracking-wide
font-semibold font-display focus:outline-none focus:shadow-outline
shadow-lg disabled:cursor-not-allowed"
      disabled={loading}
      onClick={handleSocialLogin}
    >
      {text}
    </button>
  );
};

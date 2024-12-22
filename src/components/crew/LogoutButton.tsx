"use client";
import { userLogout } from "@/lib/api/auth/auth";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      className="text-center mx-auto cursor-pointer font-poppins-semibold"
      onClick={() => userLogout()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;

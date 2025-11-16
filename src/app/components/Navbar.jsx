"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "../lib/globalState";

export const Navbar = () => {
  const pathname = usePathname();
  const { username } = useContext(GlobalContext);

  if (pathname === "/signup" || pathname === "/login") {
    return null;
  } else if (username) {
    return (
      <div className="top-8 right-8 z-10 fixed flex items-stretch">
        <p>
          Logged in as <span className="font-bold">{username}</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className="top-8 right-8 z-10 fixed flex items-stretch gap-2">
        <LoginButtons />
      </div>
    );
  }
};

const LoginButtons = () => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.push("/login")}
        className="bg-gray-50 hover:bg-gray-100 px-6 py-2 border border-blue-600 rounded-lg font-semibold text-blue-600 transition-colors cursor-pointer"
      >
        Log in
      </button>
      <button
        onClick={() => router.push("/signup")}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold text-white transition-colors cursor-pointer"
      >
        Sign Up
      </button>
    </>
  );
};

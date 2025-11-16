"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GlobalContext } from "../lib/globalState";
import { LogOut } from "lucide-react";
import QRCodePopup from "./QRCode";

export const Navbar = () => {
  const pathname = usePathname();
  const { setToken, setUsername, username } = useContext(GlobalContext);

  const [contextMenuShown, setContextMenuShown] = useState(false);

  if (pathname === "/signup" || pathname === "/login") {
    return null;
  } else if (username) {
    return (
      <>
        <div className="top-6 right-8 z-20 fixed flex items-center gap-3">
          <QRCodePopup />
          <button
            className="flex items-center bg-gray-100 hover:bg-white px-4 py-2 rounded-xl cursor-pointer"
            onClick={() => setContextMenuShown(true)}
          >
            <p className="text-lg">
              Logged in as <span className="font-bold">{username}</span>
            </p>
          </button>
        </div>
        {contextMenuShown && (
          <div
            className="top-0 right-0 bottom-0 left-0 z-20 fixed"
            onClick={() => setContextMenuShown(false)}
          >
            <div className="top-18 right-8 fixed flex flex-col justify-center items-stretch bg-white shadow-lg mt-2 p-1 rounded-xl w-40">
              <button
                onClick={() => {
                  setToken(null);
                  setUsername(null);
                  localStorage.removeItem("token");
                }}
                className="flex items-center gap-2 hover:bg-red-500 p-2 rounded-lg hover:text-white transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className="top-8 right-8 z-20 fixed flex items-stretch gap-2">
        <LoginButtons />
      </div>
    );
  }
};

const LoginButtons = () => {
  const router = useRouter();

  return (
    <>
      <QRCodePopup />
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

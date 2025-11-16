"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../lib/globalState";
import { toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { token, setToken, setUsername: setGlobalUsername } = useContext(GlobalContext);

  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    if (!username || !password) {
      return;
    }

    const { token } = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());
    if (!token) {
      toast.error("Invalid username or password");
      return;
    }
    toast.success(`Welcome back, ${username}!`);
    setGlobalUsername(username);

    setToken(token);
  });

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <main className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-xl w-sm max-w-full">
        <h2 className="mb-8 font-semibold text-3xl text-center">Sign Up</h2>

        <p>Username</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4 p-2 border border-gray-300 rounded-lg w-full" />

        <p>Password</p>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <button className="top-0 right-0 bottom-0 absolute w-8 h-full cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        </div>

        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded-lg w-full text-white">
          Log in
        </button>
      </div>
    </main>
  );
}

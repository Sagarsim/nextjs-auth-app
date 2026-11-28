"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("nothing");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed: ", error.response.data.message);
    }
  };

  const getUserData = async () => {
    try {
      const resp = await axios.get("/api/users/me");
      console.log("user data: ", resp);
      setUserData(resp.data.data._id);
    } catch (error: any) {
      console.log("Get user failed: ", error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />

      <h2 className="p-2 bg-green-500 rounded">
        {userData === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${userData}`}>{userData}</Link>
        )}
      </h2>

      <button
        onClick={onLogout}
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Logout
      </button>

      <button
        onClick={getUserData}
        className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Get User Data
      </button>
    </div>
  );
}

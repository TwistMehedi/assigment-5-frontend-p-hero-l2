"use client";
import { RootState } from "@/redux/store";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        User data not found.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      <div className="px-8 pb-8">
        <div className="relative -mt-16 mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-4xl font-bold text-gray-400 overflow-hidden shadow-md">
            {user?.image ? (
              <img
                src={user?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition duration-200 border border-gray-300 shadow-sm"
          >
            <KeyRound size={16} />
            Change Password
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.name || "Anonymous User"}
          </h2>
          <div className="flex gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
              {user?.role}
            </span>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                user?.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user?.status}
            </span>
          </div>
        </div>

        <hr className="mb-6 border-gray-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
              Account Status
            </p>
            <p className="text-gray-700 mt-1 flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${user?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              {user?.status === "ACTIVE" ? "Verified & Active" : "Inactive"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
              Email Verified
            </p>
            <p className="text-gray-700 mt-1">
              {user?.emailVerified ? "✅ Yes" : "❌ No"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
              Joined At
            </p>
            <p className="text-gray-700 mt-1">
              {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
              Last Updated
            </p>
            <p className="text-gray-700 mt-1 text-sm">
              {new Date(user?.updatedAt).toLocaleTimeString()} -{" "}
              {new Date(user?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;

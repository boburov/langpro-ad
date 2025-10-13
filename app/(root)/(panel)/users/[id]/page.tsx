"use client";
import Heading from "@/app/(global_components)/Heading";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import AddToCourse from "./(components)/AddToCourse";
import UserProvider, { UserContext } from "./UserProvider";

function UserPage() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full space-y-5">
      <div className="flex justify-between items-center w-full">
        <Heading>Foidalanuvchi haqida</Heading>
        <Link href={"/users"} className="basic_button2">
          Orqaga <Undo2 />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
        {/* Left side - Profile pic */}
        <div className="bg-gray-100 p-4 flex items-center justify-center">
          <img
            src={user.profile_pic}
            alt={`${user.name} ${user.surname}`}
            className="h-24 w-24 rounded-full object-cover shadow-md border-2 border-white"
          />
        </div>

        {/* Right side - Info */}
        <div className="flex flex-col justify-center p-5 flex-1 items-center sm:items-start">
          {/* Name & verification */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-800">
              {user.name} {user.surname}
            </h2>
            {user.is_verified && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white text-xs">
                ✔
              </span>
            )}
          </div>

          {/* Email */}
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            📧 <span>{user.email}</span>
          </p>

          {/* Role badge */}
          <span className="mt-2 inline-block text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-full w-fit">
            {user.role}
          </span>

          {/* Date */}
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
            📅 Joined {new Date(user.created_at).toLocaleDateString()}
          </p>

          {/* Google ID */}
          <span className="mt-3 inline-block text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-700 w-fit">
            Google ID: {user.google_id.slice(0, 12)}...
          </span>
        </div>
      </div>
      <Heading>Mavjud darslari</Heading>
      <AddToCourse user={user} />
    </div>
  )
}

export default function UserDetailsPage() {
  return (
    <UserProvider>
      <UserPage />
    </UserProvider>
  )
}
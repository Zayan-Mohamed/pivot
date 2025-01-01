import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
      {user.profilePictureUrl ? (
        <Image
          src={`/p1.jpeg`}
          alt={`${user.username}'s Profile Picture`}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
          {user.username.charAt(0).toUpperCase()} {/* Initial for profile */}
        </div>
      )}
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;

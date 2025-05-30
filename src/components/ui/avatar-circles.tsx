"use client";

import { cn } from "@/lib/utils";

interface User {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  users: {
    name: string;
    image: string | undefined;
  }[];
}

export const AvatarCircles = ({ numPeople, className, users }: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {users.map((user, idx) => {
        if (user.image) {
          return (
            <a key={idx} href={user.image} target="_blank" rel="noopener noreferrer">
              <img
                key={idx}
                className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                src={user.image}
                width={40}
                height={40}
                alt={`Avatar ${idx + 1}`}
              />
            </a>
          );
        } else {
          return (
            <a key={idx} href={user.image} target="_blank" rel="noopener noreferrer">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 dark:border-gray-800 dark:bg-gray-700">
                <span className="flex h-full items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-300">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </a>
          );
        }
      })}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};

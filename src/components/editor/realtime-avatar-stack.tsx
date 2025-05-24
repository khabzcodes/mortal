"use client";

import { AvatarStack } from "@/components/editor/avatar-stack";
import { useRealtimePresenceRoom } from "@/hooks/use-realtime-presence-room";
import { useMemo } from "react";

export const RealtimeAvatarStack = ({ roomId }: { roomId: string }) => {
  const { users: usersMap } = useRealtimePresenceRoom(roomId);
  const avatars = useMemo(() => {
    return Object.values(usersMap).map((user) => ({
      name: user.name,
      image: user.image,
    }));
  }, [usersMap]);

  return <AvatarStack avatars={avatars} />;
};

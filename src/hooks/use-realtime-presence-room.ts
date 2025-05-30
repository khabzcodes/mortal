import { useEffect, useState } from "react";
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { useCurrentUserImage } from "./use-current-user-image";
import { useCurrentUserName } from "./use-current-user-name";

const supabase = createClient();

export type RealtimeUser = {
  id: string;
  name: string;
  image: string | undefined;
};

export const useRealtimePresenceRoom = (roomId: string) => {
  const currentUserImage = useCurrentUserImage();
  const currentUserName = useCurrentUserName();

  const [users, setUsers] = useState<Record<string, RealtimeUser>>({});

  useEffect(() => {
    const room = supabase.channel(roomId);

    room
      .on("presence", { event: "sync" }, () => {
        const newState = room.presenceState<{
          image: string | undefined;
          name: string;
        }>();

        const newUsers = Object.fromEntries(
          Object.entries(newState).map(([key, values]) => [
            key,
            {
              name: values[0].name,
              image: values[0].image,
            },
          ])
        ) as Record<string, RealtimeUser>;
        setUsers(newUsers);
      })
      .subscribe(async (status) => {
        if (status !== REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          return;
        }
        await room.track({
          name: currentUserName,
          image: currentUserImage,
        });
      });

    return () => {
      room.unsubscribe();
    };
  }, [roomId, currentUserImage, currentUserName]);

  return { users };
};

import { useSession } from "@/lib/auth-client";
import { getUser } from "@/lib/auth-utils";
import { createLogger } from "@/lib/logger";
import { useEffect, useState } from "react";

const logger = createLogger("useCurrentUserName");

export const useCurrentUserName = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const user = await getUser();
      if (!user?.name) {
        logger.error("No session found");
        return;
      }

      setName(user.name ?? "?");
    };
    fetchUserName();
  }, []);
  return name;
};

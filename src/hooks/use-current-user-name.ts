import { getSession } from "@/lib/auth-client";
import { createLogger } from "@/lib/logger";
import { useEffect, useState } from "react";

const logger = createLogger("useCurrentUserName");

export const useCurrentUserName = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const { data, error } = await getSession();
      if (!data || error) {
        logger.error("No session found");
        return;
      }

      setName(data.user.name ?? "?");
    };
    fetchUserName();
  }, []);
  return name;
};

import { useSession } from "@/lib/auth-client";
import { getUser } from "@/lib/auth-utils";
import { createLogger } from "@/lib/logger";
import { useEffect, useState } from "react";

const logger = createLogger("useCurrentUserImage");

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserImage = async () => {
      const user = await getUser();
      if (!user) {
        logger.error("No session found");
        return;
      }

      setImage(user.image ?? null);
    };
    fetchUserImage();
  }, []);

  return image;
};

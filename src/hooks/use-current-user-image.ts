import { useEffect, useState } from "react";

import { getSession } from "@/lib/auth-client";
import { createLogger } from "@/lib/logger";

const logger = createLogger("useCurrentUserImage");

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await getSession();
      if (error && !data) {
        logger.error("No session found");
        return;
      }

      setImage(data?.user.image ?? null);
    };
    fetchUserImage();
  }, []);

  return image;
};

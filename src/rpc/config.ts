import { hc } from "hono/client";

import type { AppTypes } from "@/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const client = hc<AppTypes>(baseUrl);
export const baseRpcUrl = client.api.rpc;

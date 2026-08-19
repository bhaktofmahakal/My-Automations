import "dotenv/config";
import { createCorsair } from "corsair";
import { github } from "@corsair-dev/github";
import { db } from "@/lib/db";
import { config } from "@/lib/config";

export const corsair = createCorsair({
  plugins: [github({ authType: "managed" })],
  database: db,
  kek: config.CORSAIR_KEK,
  hub: {
    projectApiKey: config.CORSAIR_DEV_API_KEY,
    signingSecret: config.CORSAIR_DEV_SIGNING_SECRET,
  },
});

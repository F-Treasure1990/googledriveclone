import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  out: "./src/server/db/migrations",
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["theo-google-drive-clone_*"],
} satisfies Config;

import {
  index,
  integer,
  pgTableCreator,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `theo-google-drive-clone_${name}`,
);

export const posts = createTable(
  "users_table",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

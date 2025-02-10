import "server-only";

import { index, integer, pgTableCreator, text } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `theo-google-drive-clone_${name}`,
);

export const files = createTable(
  "files_table",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    parent: integer("parent").notNull(),
  },
  (t) => ({
    parentIndex: index("files_parent_index").on(t.parent),
  }),
);

export const folders = createTable(
  "folders_table",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    parent: integer("parent"),
  },
  (t) => ({
    parentIndex: index("folders_parent_index").on(t.parent),
  }),
);

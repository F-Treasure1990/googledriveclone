import "server-only";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as folderSchema,
} from "~/server/db/schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];

    let currentId: number | null = folderId;

    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(folderSchema)
        .where(eq(folderSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }

      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }

    return parents;
  },
  getFolders: function (parsedFolderId: number) {
    return db
      .select()
      .from(folderSchema)
      .where(eq(folderSchema.parent, parsedFolderId));
  },
  getFiles: function (parsedFolderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, parsedFolderId));
  },
};

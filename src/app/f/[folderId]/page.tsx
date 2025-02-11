import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contentx";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as folderSchema,
} from "~/server/db/schema";

async function getAllParents(folderId: number) {
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
}

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await props.params;

  const parsedFolderId = parseInt(folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const folderPromise = db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, parsedFolderId));

  const filesPromise = db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));

  const parentsPromise = getAllParents(parsedFolderId);

  const [folder, files, parents] = await Promise.all([
    folderPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folder} parents={parents} />;
}

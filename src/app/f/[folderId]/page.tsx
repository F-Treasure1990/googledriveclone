import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contentx";
import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as folderSchema,
} from "~/server/db/schema";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await props.params;

  console.log(folderId);
  const parsedFolderId = parseInt(folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const folder = await db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, parsedFolderId));

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));

  return <DriveContents files={files} folders={folder} />;
}

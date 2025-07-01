import { unlink } from "fs/promises";
import * as path from "path";

export async function deleteFile(filePath: string): Promise<void> {
  try {
    const fullPath = path.join(process.cwd(),filePath)
    await unlink(fullPath);
  } catch (error) {
    console.error(error.message);
  }
}

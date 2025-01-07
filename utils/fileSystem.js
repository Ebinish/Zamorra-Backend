import fs from 'fs-extra';

export const delFile = async (filePath) => {
  try {
    await fs.promises.access(filePath);

    await fs.promises.unlink(filePath);
    console.log(`File at ${filePath} was successfully deleted.`);
  } catch (error) {
    console.error(`Error deleting file at ${filePath}:`, error);
  }
};

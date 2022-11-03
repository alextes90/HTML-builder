const fs = require("fs/promises");
const path = require("path");
const pathAbs = path.join(__dirname, "files");
const pathDest = path.join(__dirname, "files-copy");

async function readDir() {
  try {
    createDir();
    const arrLength = await fs.readdir(pathDest);
    if (arrLength.length > 0) {
      deleteDir();
    } else {
      const files = await fs.readdir(pathAbs);
      for (const file of files) {
        const curPath = path.join(__dirname, "files", file);
        const newPath = path.join(__dirname, "files-copy", file);
        copyFile(curPath, newPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
async function copyFile(pathAbs, pathDest) {
  try {
    await fs.copyFile(pathAbs, pathDest);
  } catch (err) {
    console.error(err);
  }
}
async function createDir() {
  try {
    await fs.mkdir(pathDest, { recursive: true });
  } catch (err) {
    console.error(err);
  }
}

async function deleteDir() {
  try {
    await fs.rm(pathDest, { recursive: true });
    readDir();
  } catch (err) {
    console.error(err);
  }
}

readDir();

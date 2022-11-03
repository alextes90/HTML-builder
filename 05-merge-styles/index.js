const fs = require("fs/promises");
const path = require("path");
const pathAbs = path.join(__dirname, "styles");
const pathDest = path.join(__dirname, "project-dist", "bundle.css");

async function readDir() {
  try {
    fs.rm(pathDest, { force: true });
    const files = await fs.readdir(pathAbs, {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isDirectory()) {
        console.log("hope");
        continue;
      }
      const checker = path.extname(path.join(__dirname, "styles", file.name));
      if (!(checker === ".css")) {
        continue;
      }

      const curPath = path.join(__dirname, "styles", file.name);
      const newPath = path.join(__dirname, "project-dist", "bundle.css");
      const data = await fs.readFile(curPath);
      fs.appendFile(newPath, data);
    }
  } catch (err) {
    console.error(err);
  }
}

readDir();

const fs = require("fs/promises");
const simpFS = require("fs");
const path = require("path");
const pathDest = path.join(__dirname, "project-dist");
const pathAbs = path.join(__dirname, "assets");
const pathAsset = path.join(__dirname, "project-dist", "assets");
const pathStylesAbs = path.join(__dirname, "styles");
const pathStylesDestBundle = path.join(__dirname, "project-dist", "style.css");

async function readHtml() {
  try {
    //  Read the data from templateHTML and Components
    const components = await fs.readdir(path.join(__dirname, "components"));
    let tempData = await fs.readFile(path.join(__dirname, "template.html"), {
      encoding: "utf-8",
    });
    for (let filename of components) {
      if (
        !(
          path.parse(path.join(__dirname, "components", filename)).ext ===
          ".html"
        )
      )
        continue;
      let readHTMLStream = await fs.readFile(
        path.join(__dirname, "components", filename),
        "utf8"
      );
      tempData = tempData.replace(
        `{{${filename.split(".")[0]}}}`,
        readHTMLStream
      );
      console.log(filename);
    }
    // Write data through stream to index.html
    writeTemplate(tempData);
    function writeTemplate(temp) {
      simpFS
        .createWriteStream(path.join(__dirname, "project-dist", "idex.html"))
        .write(temp, "UTF8");
      simpFS
        .createWriteStream(path.join(__dirname, "project-dist", "idex.html"))
        .end(console.log("done"));
    }
  } catch (err) {
    console.error(err);
  }
}

// Create Project-dist folder
async function createDir(path) {
  try {
    await fs.mkdir(path, { recursive: true });
  } catch (err) {
    console.error(err);
  }
}

//Read the assets folder and copy files to project-dist
async function readDir() {
  try {
    createDir(pathAsset);
    const subFolders = await fs.readdir(pathAbs);
    for (let folder of subFolders) {
      createDir(path.join(__dirname, `project-dist/assets/${folder}`));
      const files = await fs.readdir(path.join(__dirname, `assets/${folder}`));
      for (const file of files) {
        const curPath = path.join(__dirname, `assets/${folder}`, file);
        const newPath = path.join(
          __dirname,
          `project-dist/assets/${folder}`,
          file
        );
        copyFile(curPath, newPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

//Function to copy files
async function copyFile(pathAbs, pathAsset) {
  try {
    await fs.copyFile(pathAbs, pathAsset);
  } catch (err) {
    console.error(err);
  }
}

//Collect css in one file
async function createBundle() {
  try {
    fs.rm(pathStylesDestBundle, { force: true });
    const files = await fs.readdir(pathStylesAbs, {
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
      const newPath = path.join(__dirname, "project-dist", "style.css");
      const data = await fs.readFile(curPath);
      fs.appendFile(newPath, data);
    }
  } catch (err) {
    console.error(err);
  }
}

async function delDir(props) {
  try {
    simpFS.rm(props, { recursive: true }, () => {
      readDir();
    });
  } catch (err) {
    console.error(err);
  }
}

createDir(pathDest);
createDir(pathAsset);
createBundle();
readHtml();
delDir(pathAsset);

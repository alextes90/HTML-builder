const fs = require("fs/promises");
const path = require("path");
const pathDest = path.join(__dirname, "project-dist");

async function readHtml() {
  try {
    createDir();
    const components = await fs.readdir(path.join(__dirname, "components"));
    const tempData = await fs.readFile(path.join(__dirname, "template.html"), {
      encoding: "utf-8",
    });
    let realData = tempData;

    components.forEach(async (el) => {
      const componentsReadData = await fs.readFile(
        path.join(__dirname, "components", el),
        {
          encoding: "utf-8",
        }
      );
      realData = realData.replace(
        `{{${el.split(".")[0]}}}`,
        componentsReadData
      );
      fs.writeFile(path.join(__dirname, "project-dist", "idex.html"), realData);
    });
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

readHtml();

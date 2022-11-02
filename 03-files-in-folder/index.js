const path = require("path");
const fs = require("fs");
const pathAbs = path.join(__dirname, "secret-folder");
const fsPromises = fs.promises;

const pathToFile = (el) => {
  return path.join(__dirname, "secret-folder", el);
};

fsPromises
  .readdir(pathAbs, {
    withFileTypes: true,
  })
  .then((files) => {
    files.forEach((el) => {
      if (!el.isDirectory()) {
        const filePath = pathToFile(el.name);
        const fileName = path.basename(filePath);
        const fileExten = path.extname(el.name);
        fsPromises
          .stat(filePath)
          .then((el) =>
            console.log(
              `File name: ${fileName.split(".")[0]} - ext: ${
                fileExten.split(".")[1]
              } - size: ${el.size}k`
            )
          );
      }
    });
  });

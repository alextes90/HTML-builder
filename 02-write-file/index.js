const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const output = fs.createWriteStream(path.join(__dirname, "file.txt"));

const exit = () => {
  stdout.write("\nThank you for checking! And Good luck\n");
  process.exit();
};

stdout.write("Hello! Please write text to append text file...\n");
stdin.on("data", (data) => {
  if (data.toString().trim() === "exit") {
    exit();
  } else {
    output.write(data);
  }
});
process.on("SIGINT", exit);

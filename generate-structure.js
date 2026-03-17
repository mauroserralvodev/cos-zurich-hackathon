// generate-structure.js
const fs = require("fs");
const path = require("path");

function dirTree(filename) {
  const stats = fs.lstatSync(filename);
  const info = {
    name: path.basename(filename)
  };

  if (stats.isDirectory()) {
    info.type = "directory";
    info.contents = fs
      .readdirSync(filename)
      .filter(file => !["node_modules", ".git", ".next", "dist", "build"].includes(file))
      .map(child => dirTree(path.join(filename, child)));
  } else {
    info.type = "file";
  }

  return info;
}

const projectPath = process.cwd();
const structure = dirTree(projectPath);

fs.writeFileSync("estructura.json", JSON.stringify(structure, null, 2));
console.log("✅ estructura.json generado con éxito");
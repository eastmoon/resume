const FileSystem = require("fs");
const Path = require("path");
const Shell = require("shelljs");

// ----------- Declare function -----------

// Parser markdown file to json file
function toJson(source, dest, filename) {
    const md2json = require("./convert-markdown-to-json");
    const text = FileSystem.readFileSync(Path.join(source, `${filename}.md`)).toString();
    const json = md2json(text);
    FileSystem.writeFileSync(Path.join(dest, `${filename}.json`), JSON.stringify(json));
}

// Transform manager data
function transform() {
    var sourcePath = dataPath;
    var destPath = Path.join(outputPath, "tmp-ebook-md2json");
    if (!FileSystem.existsSync(destPath)) {
        console.log(`> Create ${destPath}`);
        Shell.mkdir("-p", destPath);
    } else {
        Shell.rm("-rf", Path.join(destPath, "*"));
    }
    Shell.ls(Path.join(sourcePath, "*.md")).forEach(function (file) {
        toJson(sourcePath, destPath, Path.basename(file, ".md"));
    });
}

// ----------- Execute Script -----------

// Check directory
var dataPath = Path.join(process.cwd(), "data");
var outputPath = Path.join(process.cwd(), "build");

if (!FileSystem.existsSync(outputPath)) {
    console.log(`> Create ${outputPath}`);
    Shell.mkdir("-p", outputPath);
}

if (FileSystem.existsSync(dataPath)) {
    transform();
} else {
    console.log(`> Error : ${dataPath} is not exist.`);
}

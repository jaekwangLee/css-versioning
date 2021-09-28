const fs = require("fs");
const html = fs.readFileSync("index.html").toString();

fs.readdir("./css", async (err, filenames) => {
  if (err) {
    console.log("err: ", err);
  } else {
    let newHtml = html;

    const renames = filenames.map((filename) => {
      const newFileName = getNewFilename(filename);
      fs.renameSync("./css/" + filename, "./css/" + newFileName);
      newHtml = newHtml.replace(strReplace(filename), newFileName);
      return newFileName;
    });
    await Promise.all(renames);

    fs.writeFileSync("./index.html", newHtml, "utf8");
  }
});

function strReplace(str) {
  return new RegExp(str, "gi");
}

function getNewFilename(currentName) {
  const dotIndex = currentName.indexOf(".");
  return `${currentName.slice(0, dotIndex)}.${new Date().valueOf()}.css`;
}

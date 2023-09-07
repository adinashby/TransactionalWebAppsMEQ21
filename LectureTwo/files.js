const fs = require("fs");

//console.log(fs);

// read files (relative path)
// fs.readFile("./docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// console.log("last line");

// // writing to files
// fs.writeFile("./docs/blog2.txt", "Hello, again", () => {
//   console.log("file was written");
// });

// directories
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(error);
    }
    console.log("folder was created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(error);
    }
    console.log("folder was deleted");
  });
}

// deleting files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}

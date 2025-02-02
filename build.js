const fs = require("fs");
const manifest = require("./manifest.json");

fs.rmSync("./build", { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

fs.mkdirSync("./build", (err) => {
  console.error(err);
});

fs.cpSync("./packages/popup/dist", "./build/popup", { recursive: true });
fs.cpSync("./packages/scripts/dist", "./build/scripts", { recursive: true });
fs.cpSync("./assets", "./build/assets", { recursive: true });

manifest.background.service_worker = "scripts/background.js";
manifest.content_scripts[0].js = ["scripts/content.js"];
manifest.action.default_popup = "popup/index.html";

fs.writeFileSync("./build/manifest.json", JSON.stringify(manifest, null, 2));

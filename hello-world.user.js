// ==UserScript==
// @name         Hello world
// @version      0.1.0
// @description  Hello from Bundlemonkey!
// @grant        unsafeWindow
// @match        https://www.waze.com/*/editor*
// @match        https://www.waze.com/editor*
// @updateURL    https://junyian.github.io/wme-scripts/hello-world.user.js
// @downloadURL  https://junyian.github.io/wme-scripts/hello-world.user.js
// ==/UserScript==

// src/hello-world/index.user.ts
function initScript() {
  const wmeSdk = unsafeWindow.getWmeSdk({
    scriptId: "wme-sdk-hello-world",
    scriptName: "WME SDK Hello World script with Bundlemonkey"
  });
  console.log(wmeSdk);
  alert("WME SDK Hello World!");
}
void (() => {
  unsafeWindow.SDK_INITIALIZED.then(initScript);
})();

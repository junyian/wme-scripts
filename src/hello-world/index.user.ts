import { defineUserScript } from "bundlemonkey";

export default defineUserScript({
  name: "Hello world",
  version: "0.1.0",
  description: "Hello from Bundlemonkey!",
  match: ["https://www.waze.com/*/editor/*"],
  grant: ["unsafeWindow"],
  main: () => {
    unsafeWindow.SDK_INITIALIZED.then(initScript);
  },
});

function initScript() {
  const wmeSdk = unsafeWindow.getWmeSdk!({
    scriptId: "wme-sdk-hello-world",
    scriptName: "WME SDK Hello World script with Bundlemonkey",
  });
  console.log(wmeSdk);
  alert("WME SDK Hello World!");
}

import { defineUserScript } from "bundlemonkey";
import { RegisterSidebarTabResult, WmeSDK } from "wme-sdk-typings";

export default defineUserScript({
  name: "WME SDK Playground",
  version: "0.1.0",
  description: "Playground for WME SDK APIs",
  match: ["https://www.waze.com/*/editor*", "https://www.waze.com/editor*"],
  grant: ["unsafeWindow"],
  main: () => {
    unsafeWindow.SDK_INITIALIZED.then(initScript);
  },
});

async function initScript() {
  const wmeSdk: WmeSDK = unsafeWindow.getWmeSdk!({
    scriptId: "wme-sdk-playground",
    scriptName: "WME SDK Playground",
  });
  try {
    const sidebarTabResult: RegisterSidebarTabResult =
      await wmeSdk.Sidebar.registerScriptTab();
    sidebarTabResult.tabLabel.innerHTML = "SDK Playground";
    sidebarTabResult.tabPane.innerHTML = `
      <wz-section-header headline="WME SDK Playground" size="section-header2" class="settings-header">
        <i slot="icon" class="w-icon w-icon-script"></i>
      </wz-section-header>
    `;
  } catch (error) {
    console.error("[wme-sdk-playground] Error registering sidebar.");
  }
}

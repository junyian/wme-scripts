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

const SDK_DOCS_BASE =
  "https://web-assets.waze.com/wme_sdk_docs/production/latest/classes/index.SDK.";

interface MethodEntry {
  name: string;
  docsClass: string;
}

interface ModuleEntry {
  label: string;
  accessor: string;
  docsClass: string;
  methods: MethodEntry[];
}

const SDK_REGISTRY: ModuleEntry[] = [
  {
    label: "WmeSDK",
    accessor: "",
    docsClass: "WmeSDK",
    methods: [
      { name: "isBetaEnvironment", docsClass: "WmeSDK" },
      { name: "getScriptName", docsClass: "WmeSDK" },
      { name: "getScriptId", docsClass: "WmeSDK" },
      { name: "getSDKVersion", docsClass: "WmeSDK" },
      { name: "getWMEVersion", docsClass: "WmeSDK" },
    ],
  },
  {
    label: "State",
    accessor: "State",
    docsClass: "WmeState",
    methods: [
      { name: "isMapLoading", docsClass: "WmeState" },
      { name: "isInitialMapDataLoaded", docsClass: "WmeState" },
      { name: "isInitialized", docsClass: "WmeState" },
      { name: "isReady", docsClass: "WmeState" },
      { name: "isLoggedIn", docsClass: "WmeState" },
      { name: "getUserInfo", docsClass: "WmeState" },
    ],
  },
  {
    label: "Map",
    accessor: "Map",
    docsClass: "Map",
    methods: [
      { name: "getZoomLevel", docsClass: "Map" },
      { name: "getMapCenter", docsClass: "Map" },
      { name: "getMapExtent", docsClass: "Map" },
      { name: "getMapResolution", docsClass: "Map" },
      { name: "getPermalink", docsClass: "Map" },
      { name: "getLiveMapLink", docsClass: "Map" },
      { name: "isStreetViewActive", docsClass: "Map" },
      { name: "getMapViewportElement", docsClass: "Map" },
    ],
  },
  {
    label: "Editing",
    accessor: "Editing",
    docsClass: "Editing",
    methods: [
      { name: "getSelection", docsClass: "Editing" },
      { name: "getUnsavedChangesCount", docsClass: "Editing" },
      { name: "getRedoChangesCount", docsClass: "Editing" },
      { name: "isEditingAllowed", docsClass: "Editing" },
      { name: "isDrawingInProgress", docsClass: "Editing" },
      { name: "getCurrentSaveMode", docsClass: "Editing" },
      { name: "isPracticeModeOn", docsClass: "Editing" },
      { name: "isSnapshotModeOn", docsClass: "Editing" },
    ],
  },
  {
    label: "Settings",
    accessor: "Settings",
    docsClass: "Settings",
    methods: [
      { name: "getLocale", docsClass: "Settings" },
      { name: "getRegionCode", docsClass: "Settings" },
      { name: "getUserSettings", docsClass: "Settings" },
    ],
  },
  {
    label: "Shortcuts",
    accessor: "Shortcuts",
    docsClass: "Shortcuts",
    methods: [{ name: "getAllShortcuts", docsClass: "Shortcuts" }],
  },
];

function getDocsUrl(docsClass: string, methodName: string): string {
  return `${SDK_DOCS_BASE}${docsClass}.html#${methodName.toLowerCase()}`;
}

function serializeResult(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  if (value instanceof HTMLElement) {
    const tag = value.tagName.toLowerCase();
    const id = value.id ? `#${value.id}` : "";
    const cls = value.className
      ? `.${String(value.className).split(" ").join(".")}`
      : "";
    return `<${tag}${id}${cls}>`;
  }

  if (typeof value !== "object") return String(value);

  try {
    let depth = 0;
    return JSON.stringify(
      value,
      function (_key, val) {
        if (depth > 2 && typeof val === "object" && val !== null) {
          return Array.isArray(val) ? `[Array(${val.length})]` : "[Object]";
        }
        if (typeof val === "object" && val !== null) depth++;
        return val;
      },
      2,
    );
  } catch {
    return String(value);
  }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function initScript() {
  const wmeSdk: WmeSDK = unsafeWindow.getWmeSdk!({
    scriptId: "wme-sdk-playground",
    scriptName: "WME SDK Playground",
  });

  let selectedModule: ModuleEntry | null = null;
  let selectedMethod: MethodEntry | null = null;
  const MAX_RESULTS = 50;

  try {
    const sidebarTabResult: RegisterSidebarTabResult =
      await wmeSdk.Sidebar.registerScriptTab();
    sidebarTabResult.tabLabel.innerHTML = "SDK Playground";

    const container = sidebarTabResult.tabPane;
    container.innerHTML = buildSidebarHtml();
    wireUpInteractions(container);
  } catch (error) {
    console.error("[wme-sdk-playground] Error registering sidebar:", error);
  }

  function buildSidebarHtml(): string {
    const moduleSections = SDK_REGISTRY.map(
      (mod) => `
      <div class="filter-section toggle-group collapsible-container update-request-section collapsed" data-module="${mod.accessor}">
        <div class="filter-section-header">
          <wz-button class="collapse-arrow" color="clear-icon" size="xs" type="button" name value>
            <i class="w-icon w-icon-chevron-down"></i>
          </wz-button>
          <wz-body2>${mod.label}</wz-body2>
          <span style="margin-left:auto;font-size:11px;color:#888;">${mod.methods.length}</span>
        </div>
        <ul class="issue-tracker-filter-list update-request-filter-list" style="list-style:none;padding:0;margin:0;">
          ${mod.methods
            .map(
              (method) => `
            <li class="sdk-method-row" data-module-accessor="${mod.accessor}" data-module-label="${mod.label}" data-method="${method.name}" style="padding:5px 12px 5px 24px;font-family:monospace;font-size:12px;color:#555;display:flex;align-items:center;cursor:pointer;">
              <span class="sdk-method-name">${method.name}()</span>
              <a href="${getDocsUrl(method.docsClass, method.name)}" target="_blank" rel="noopener" style="margin-left:auto;font-size:10px;color:#1a73e8;text-decoration:none;" title="Open docs">📖</a>
            </li>`,
            )
            .join("")}
        </ul>
      </div>`,
    ).join("");

    return `
      <div class="tab-pane sidebar-tab-pane">
        <div class="sidebar-tab-pane-header">
          <wz-section-header headline="WME SDK Playground" size="section-header2" class="settings-header">
            <i slot="icon" class="w-icon w-icon-script"></i>
          </wz-section-header>
        </div>
        <div class="sidebar-tab-pane-body issue-tracker-filters">
          ${moduleSections}
        </div>
        <div class="sdk-execute-bar" style="padding:8px 12px;background:#fff;border-top:2px solid #1a73e8;display:flex;align-items:center;gap:8px;">
          <span class="sdk-selected-label" style="font-family:monospace;font-size:11px;color:#999;flex:1;">Select a method</span>
          <button class="sdk-execute-btn" style="background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:5px 14px;font-size:12px;cursor:pointer;font-weight:500;opacity:0.5;" disabled>▶ Execute</button>
        </div>
        <div class="sdk-response-panel" style="background:#1e1e2e;border-top:1px solid #333;">
          <div style="padding:6px 12px;display:flex;align-items:center;border-bottom:1px solid #333;">
            <span style="font-size:11px;color:#888;font-weight:500;">Response</span>
            <button class="sdk-clear-btn" style="margin-left:auto;background:none;border:1px solid #555;border-radius:3px;color:#888;font-size:10px;padding:2px 8px;cursor:pointer;">Clear</button>
          </div>
          <div class="sdk-response-log" style="padding:8px 12px;max-height:200px;overflow-y:auto;"></div>
        </div>
      </div>
    `;
  }

  function wireUpInteractions(container: HTMLElement): void {
    // Accordion toggle
    container.querySelectorAll(".collapsible-container").forEach((section) => {
      section
        .querySelector(".filter-section-header")!
        .addEventListener("click", () => {
          section.classList.toggle("collapsed");
        });
    });

    // Method selection
    container.querySelectorAll(".sdk-method-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        container.querySelectorAll(".sdk-method-row").forEach((r) => {
          (r as HTMLElement).style.removeProperty("border-left");
          (r as HTMLElement).style.removeProperty("background");
        });
        (row as HTMLElement).style.borderLeft = "3px solid #1a73e8";
        (row as HTMLElement).style.background = "#e3edff";

        const accessor = row.getAttribute("data-module-accessor")!;
        const label = row.getAttribute("data-module-label")!;
        const methodName = row.getAttribute("data-method")!;
        selectedModule = SDK_REGISTRY.find(
          (m) => m.accessor === accessor && m.label === label,
        )!;
        selectedMethod = selectedModule.methods.find(
          (m) => m.name === methodName,
        )!;

        const labelEl = container.querySelector(".sdk-selected-label")!;
        labelEl.textContent = `${selectedModule.label}.${selectedMethod.name}()`;
        (labelEl as HTMLElement).style.color = "#333";

        const btn = container.querySelector(
          ".sdk-execute-btn",
        ) as HTMLButtonElement;
        btn.disabled = false;
        btn.style.opacity = "1";
      });
    });

    // Execute button
    container
      .querySelector(".sdk-execute-btn")!
      .addEventListener("click", () => {
        if (!selectedModule || !selectedMethod) return;
        executeMethod(container, wmeSdk, selectedModule, selectedMethod);
      });

    // Clear button
    container.querySelector(".sdk-clear-btn")!.addEventListener("click", () => {
      container.querySelector(".sdk-response-log")!.innerHTML = "";
    });
  }

  function executeMethod(
    container: HTMLElement,
    sdk: WmeSDK,
    mod: ModuleEntry,
    method: MethodEntry,
  ): void {
    const log = container.querySelector(".sdk-response-log")!;
    const timestamp = new Date().toLocaleTimeString();
    let resultHtml: string;

    try {
      const target = mod.accessor
        ? (sdk as unknown as Record<string, unknown>)[mod.accessor]
        : sdk;
      const fn = (target as unknown as Record<string, unknown>)[method.name];
      if (typeof fn !== "function")
        throw new Error(`${method.name} is not a function`);
      const result = (fn as () => unknown).call(target);
      const serialized = serializeResult(result);
      resultHtml = `<pre style="margin:0;font-size:11px;color:#a9dc76;background:#16161e;padding:4px 6px;border-radius:3px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;">${escapeHtml(serialized)}</pre>`;
    } catch (err) {
      const errName = err instanceof Error ? err.constructor.name : "Error";
      const errMsg = err instanceof Error ? err.message : String(err);
      resultHtml = `<pre style="margin:0;font-size:11px;color:#ff5555;background:#1e1015;padding:4px 6px;border-radius:3px;overflow-x:auto;white-space:pre-wrap;">${escapeHtml(`${errName}: ${errMsg}`)}</pre>`;
    }

    const entry = document.createElement("div");
    entry.style.cssText =
      "margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #2a2a3a;";
    entry.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-family:monospace;font-size:11px;color:#7ecfff;">${mod.label}.${method.name}()</span>
        <span style="font-size:9px;color:#555;margin-left:auto;">${timestamp}</span>
      </div>
      ${resultHtml}
    `;
    log.prepend(entry);

    // Enforce max entries
    while (log.children.length > MAX_RESULTS) {
      log.removeChild(log.lastChild!);
    }
  }
}

// ==UserScript==
// @name         WME SDK Playground
// @version      0.1.0
// @description  Playground for WME SDK APIs
// @grant        unsafeWindow
// @match        https://www.waze.com/*/editor*
// @match        https://www.waze.com/editor*
// @updateURL    https://junyian.github.io/wme-scripts/sdk-playground.user.js
// @downloadURL  https://junyian.github.io/wme-scripts/sdk-playground.user.js
// ==/UserScript==

// src/sdk-playground/registry.ts
var SDK_DOCS_BASE = "https://web-assets.waze.com/wme_sdk_docs/production/latest/classes/index.SDK.";
function getDocsUrl(docsClass, methodName) {
  return `${SDK_DOCS_BASE}${docsClass}.html#${methodName.toLowerCase()}`;
}
var SDK_REGISTRY = [
  {
    label: "WmeSDK",
    accessor: "",
    docsClass: "WmeSDK",
    properties: [
      { name: "DataModel", docsClass: "DataModel" },
      { name: "Editing", docsClass: "Editing" },
      {
        name: "Errors",
        docsClass: [
          "DataModelNotFoundError",
          "InvalidStateError",
          "ValidationError",
          "WMEError"
        ]
      },
      { name: "Events", docsClass: "SdkEventBus" },
      { name: "LayerSwitcher", docsClass: "LayerSwitcher" },
      { name: "Map", docsClass: "Map" },
      { name: "Settings", docsClass: "Settings" },
      { name: "Shortcuts", docsClass: "Shortcuts" },
      { name: "Sidebar", docsClass: "Sidebar" },
      { name: "State", docsClass: "WmeState" }
    ],
    methods: [
      { name: "getScriptId" },
      { name: "getScriptName" },
      { name: "getSDKVersion" },
      { name: "getWMEBackEndVersion" },
      { name: "getWMEVersion" },
      { name: "isBetaEnvironment" }
    ]
  },
  {
    label: "DataModel",
    accessor: "DataModel",
    docsClass: "DataModel",
    properties: [
      { name: "BigJunctions", docsClass: "BigJunctions" },
      { name: "Cities", docsClass: "Cities" },
      { name: "Countries", docsClass: "Countries" },
      { name: "EditSuggestions", docsClass: "EditSuggestions" },
      { name: "HouseNumbers", docsClass: "HouseNumbers" },
      { name: "Junctions", docsClass: "Junctions" },
      { name: "MajorTrafficEvents", docsClass: "MajorTrafficEvents" },
      { name: "ManagedAreas", docsClass: "ManagedAreas" },
      { name: "MapComments", docsClass: "MapComments" },
      { name: "MapProblems", docsClass: "MapProblems" },
      { name: "MapUpdateRequests", docsClass: "MapUpdateRequests" },
      { name: "Nodes", docsClass: "Nodes" },
      { name: "PermanentHazards", docsClass: "PermanentHazards" },
      { name: "RestrictedDrivingAreas", docsClass: "RestrictedDrivingAreas" },
      { name: "RoadClosures", docsClass: "RoadClosures" },
      { name: "Segments", docsClass: "Segments" },
      { name: "States", docsClass: "States" },
      { name: "Streets", docsClass: "Streets" },
      { name: "TurnClosures", docsClass: "TurnClosures" },
      { name: "Turns", docsClass: "Turns" },
      { name: "Users", docsClass: "Users" },
      { name: "Venues", docsClass: "Venues" }
    ],
    methods: [
      // { name: "isDeletable" },
      // { name: "isDeleted" },
      // { name: "isNew" },
      { name: "refreshData" }
    ]
  },
  {
    label: "Editing",
    accessor: "Editing",
    docsClass: "Editing",
    methods: [
      { name: "clearSelection" },
      { name: "getCurrentSaveMode" },
      { name: "getRedoChangesCount" },
      { name: "getSelection" },
      { name: "getUnsavedChangesCount" },
      { name: "isDrawingInProgress" },
      { name: "isEditingAllowed" },
      { name: "isEditingHouseNumbers" },
      { name: "isPracticeModeOn" },
      { name: "isSnapshotModeOn" },
      { name: "lockEditing" },
      { name: "redo" },
      // { name: "releaseEditingLock" },
      { name: "save" },
      // { name: "setSelection" },
      { name: "undo" },
      { name: "undoAll" }
    ]
  },
  {
    label: "Map",
    accessor: "Map",
    docsClass: "Map",
    properties: [
      { name: "MAX_ZOOM_LEVEL", docsClass: "ZoomLevel" },
      { name: "MIN_ZOOM_LEVEL", docsClass: "ZoomLevel" }
    ],
    methods: [
      // { name: "addFeaturesToLayer" },
      // { name: "addFeatureToLayer" },
      // { name: "addLayer" },
      // { name: "addStyleRuleToLayer" },
      // { name: "addTileLayer" },
      // { name: "centerMapOnGeometry" },
      // { name: "dangerouslyAddFeaturesToLayerWithoutValidation" },
      // { name: "disablePolygonResize" },
      // { name: "disablePolygonRotation" },
      // { name: "disableSelectionToggling" },
      // { name: "drawLine" },
      // { name: "drawPolygon" },
      // { name: "enablePolygonResize" },
      // { name: "enablePolygonRotation" },
      // { name: "enableSelectionToggling" },
      // { name: "getFeatureDomElement" },
      // { name: "getLayerOpacity" },
      // { name: "getLayerZIndex" },
      { name: "getLiveMapLink" },
      // { name: "getLonLatFromMapPixel" },
      // { name: "getLonLatFromPixel" },
      { name: "getMapCenter" },
      { name: "getMapExtent" },
      // { name: "getMapPixelFromLonLat" },
      { name: "getMapResolution" },
      { name: "getMapViewportElement" },
      { name: "getPermalink" },
      // { name: "getPixelFromLonLat" },
      { name: "getZoomLevel" },
      // { name: "isLayerVisible" },
      { name: "isStreetViewActive" },
      // { name: "redrawLayer" },
      // { name: "removeAllFeaturesFromLayer" },
      // { name: "removeFeatureFromLayer" },
      // { name: "removeFeaturesFromLayer" },
      // { name: "removeLayer" },
      // { name: "setLayerOpacity" },
      // { name: "setLayerVisibility" },
      // { name: "setLayerZIndex" },
      // { name: "setMapCenter" },
      // { name: "setZoomLevel" },
      { name: "zoomIn" },
      { name: "zoomOut" }
      // { name: "zoomToExtent" },
    ]
  },
  {
    label: "Settings",
    accessor: "Settings",
    docsClass: "Settings",
    methods: [
      { name: "getLocale" },
      { name: "getRegionCode" },
      { name: "getUserSettings" }
      // { name: "setRegionCode" },
      // { name: "setUserSettings" },
    ]
  },
  {
    label: "Shortcuts",
    accessor: "Shortcuts",
    docsClass: "Shortcuts",
    methods: [
      // { name: "areShortcutKeysInUse" },
      // { name: "createShortcut" },
      // { name: "deleteShortcut" },
      { name: "getAllShortcuts" },
      { name: "isShortcutRegistered" }
    ]
  },
  {
    label: "WmeState",
    accessor: "State",
    docsClass: "WmeState",
    methods: [
      { name: "getManagedCountries" },
      { name: "getUserInfo" },
      { name: "isInitialized" },
      { name: "isInitialMapDataLoaded" },
      { name: "isLoggedIn" },
      { name: "isMapLoading" },
      { name: "isReady" }
    ]
  },
  {
    label: "BigJunctions",
    accessor: "DataModel.BigJunctions",
    docsClass: "BigJunctions",
    methods: [
      { name: "getAll" }
      // { name: "getAllPossibleTurns" },
      // { name: "getById" },
    ]
  },
  {
    label: "Cities",
    accessor: "DataModel.Cities",
    docsClass: "Cities",
    methods: [
      // { name: "addCity" },
      { name: "getAll" },
      // { name: "getById" },
      // { name: "getCity" },
      { name: "getTopCity" }
    ]
  },
  {
    label: "Countries",
    accessor: "DataModel.Countries",
    docsClass: "Countries",
    methods: [
      { name: "getAll" },
      // { name: "getById" },
      { name: "getTopCountry" }
    ]
  },
  {
    label: "EditSuggestions",
    accessor: "DataModel.EditSuggestions",
    docsClass: "EditSuggestions",
    methods: [
      { name: "getAll" }
      // { name: "getById" },
      // { name: "getEditSuggestionChanges" },
    ]
  },
  {
    label: "HouseNumbers",
    accessor: "DataModel.HouseNumbers",
    docsClass: "HouseNumbers",
    methods: [
      // { name: "addHouseNumber" },
      { name: "clearHouseNumbers" }
      // { name: "deleteHouseNumber" },
      // { name: "fetchHouseNumbers" },
      // { name: "moveHouseNumber" },
      // { name: "moveHouseNumberFractionPoint" },
      // { name: "updateHouseNumber" },
    ]
  },
  {
    label: "Junctions",
    accessor: "DataModel.Junctions",
    docsClass: "Junctions",
    methods: [
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "MajorTrafficEvents",
    accessor: "DataModel.MajorTrafficEvents",
    docsClass: "MajorTrafficEvents",
    methods: [
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "ManagedAreas",
    accessor: "DataModel.ManagedAreas",
    docsClass: "ManagedAreas",
    methods: [
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "MapComments",
    accessor: "DataModel.MapComments",
    docsClass: "MapComments",
    methods: [
      // { name: "addComment" },
      { name: "getAll" }
      // { name: "getById" },
      // { name: "updateComment" },
    ]
  },
  {
    label: "MapProblems",
    accessor: "DataModel.MapProblems",
    docsClass: "MapProblems",
    methods: [
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "MapUpdateRequests",
    accessor: "DataModel.MapUpdateRequests",
    docsClass: "MapUpdateRequests",
    methods: [
      // { name: "addComment" },
      { name: "getAll" }
      // { name: "getById" },
      // { name: "getUpdateRequestDetails" },
      // { name: "updateResolutionState" },
    ]
  },
  {
    label: "Nodes",
    accessor: "DataModel.Nodes",
    docsClass: "Nodes",
    methods: [
      // { name: "allowNodeTurns" },
      // { name: "canEdit" },
      // { name: "canEditTurns" },
      { name: "getAll" }
      // { name: "getById" },
      // { name: "isVirtual" },
      // { name: "moveNode" },
    ]
  },
  {
    label: "PermanentHazards",
    accessor: "DataModel.PermanentHazards",
    docsClass: "PermanentHazards",
    methods: [
      { name: "getAllCameras" }
      // { name: "getCameraById" },
    ]
  },
  {
    label: "RestrictedDrivingAreas",
    accessor: "DataModel.RestrictedDrivingAreas",
    docsClass: "RestrictedDrivingAreas",
    methods: [
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "RoadClosures",
    accessor: "DataModel.RoadClosures",
    docsClass: "RoadClosures",
    methods: [
      // { name: "addClosure" },
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "Segments",
    accessor: "DataModel.Segments",
    docsClass: "Segments",
    methods: [
      // { name: "addAlternateStreet" },
      // { name: "addIntersection" },
      // { name: "addSegment" },
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "States",
    accessor: "DataModel.States",
    docsClass: "States",
    methods: [
      { name: "getAll" },
      { name: "getAllWithoutDefault" },
      // { name: "getById" },
      { name: "getTopState" },
      { name: "hasNonDefaultStates" }
    ]
  },
  {
    label: "Streets",
    accessor: "DataModel.Streets",
    docsClass: "Streets",
    methods: [
      // { name: "addStreet" },
      { name: "getAll" }
      // { name: "getById" },
      // { name: "getStreet" },
      // { name: "updateStreet" },
    ]
  },
  {
    label: "TurnClosures",
    accessor: "DataModel.TurnClosures",
    docsClass: "TurnClosures",
    methods: [
      // { name: "addClosure" },
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "Turns",
    accessor: "DataModel.Turns",
    docsClass: "Turns",
    methods: [
      // { name: "addClosure" },
      { name: "getAll" }
      // { name: "getById" },
    ]
  },
  {
    label: "Users",
    accessor: "DataModel.Users",
    docsClass: "Users",
    methods: [
      // { name: "getLocalizedUserProfile" },
      // { name: "getUserProfile" },
      // { name: "getUserProfileLink" },
    ]
  },
  {
    label: "Venues",
    accessor: "DataModel.Venues",
    docsClass: "Venues",
    properties: [
      { name: "ChargingStation", docsClass: "Venues" },
      { name: "ParkingLot", docsClass: "Venues" }
    ],
    methods: [
      // { name: "addVenue" },
      // { name: "deleteImage" },
      // { name: "deleteVenue" },
      // { name: "deleteVenue" },
      // { name: "getAddress" },
      { name: "getAll" },
      { name: "getAllVenueCategories" },
      // { name: "getById" },
      { name: "getChargingStationBrands" },
      { name: "getGasStationBrands" },
      { name: "getParkingLotBrands" },
      // { name: "getParkingLotType" },
      { name: "getVenueMainCategories" },
      { name: "getVenueSubCategories" }
      // { name: "hasPermissions" },
      // { name: "replaceNavigationPoints" },
      // { name: "showVenueUpdateRequestDialog" },
      // { name: "updateAddress" },
      // { name: "updateAddress" },
      // { name: "updateVenueIsResidential" },
      // { name: "updateVenueUpdateRequest" },
    ]
  }
];

// src/sdk-playground/index.user.ts
function serializeResult(value) {
  if (value === null)
    return "null";
  if (value === void 0)
    return "undefined";
  if (value instanceof HTMLElement) {
    const tag = value.tagName.toLowerCase();
    const id = value.id ? `#${value.id}` : "";
    const cls = value.className ? `.${String(value.className).split(" ").join(".")}` : "";
    return `<${tag}${id}${cls}>`;
  }
  if (typeof value !== "object")
    return String(value);
  try {
    let depth = 0;
    return JSON.stringify(value, function(_key, val) {
      if (depth > 2 && typeof val === "object" && val !== null) {
        return Array.isArray(val) ? `[Array(${val.length})]` : "[Object]";
      }
      if (typeof val === "object" && val !== null)
        depth++;
      return val;
    }, 2);
  } catch {
    return String(value);
  }
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
async function initScript() {
  const wmeSdk = unsafeWindow.getWmeSdk({
    scriptId: "wme-sdk-playground",
    scriptName: "WME SDK Playground"
  });
  let selectedModule = null;
  let selectedMethod = null;
  const MAX_RESULTS = 50;
  try {
    const sidebarTabResult = await wmeSdk.Sidebar.registerScriptTab();
    sidebarTabResult.tabLabel.innerHTML = "SDK Playground";
    const container = sidebarTabResult.tabPane;
    container.innerHTML = buildSidebarHtml();
    wireUpInteractions(container);
    pinBottomPanel(container);
  } catch (error) {
    console.error("[wme-sdk-playground] Error registering sidebar:", error);
  }
  function buildSidebarHtml() {
    const moduleSections = SDK_REGISTRY.map((mod) => `
      <div class="filter-section toggle-group collapsible-container update-request-section collapsed" data-module="${mod.accessor}">
        <div class="filter-section-header">
          <wz-button class="collapse-arrow" color="clear-icon" size="xs" type="button" name value>
            <i class="w-icon w-icon-chevron-down"></i>
          </wz-button>
          <wz-body2>${mod.label}</wz-body2>
          <span style="margin-left:auto;font-size:11px;color:#888;">${mod.methods.length}</span>
        </div>
        <ul class="issue-tracker-filter-list update-request-filter-list" style="list-style:none;padding:0;margin:0;">
          ${mod.methods.map((method) => `
            <li class="sdk-method-row" data-module-accessor="${mod.accessor}" data-method="${method.name}" style="padding:2px 12px 2px 24px;font-family:monospace;font-size:12px;color:#555;display:flex;align-items:center;cursor:pointer;">
              <span class="sdk-method-name">${method.name}()</span>
              <a href="${getDocsUrl(mod.docsClass, method.name)}" target="_blank" rel="noopener" style="margin-left:auto;color:#1a73e8;text-decoration:none;" title="Open docs"><i class="w-icon w-icon-doc" style="font-size:12px;"></i></a>
            </li>`).join("")}
        </ul>
      </div>`).join("");
    return `
      <style>
        .sdk-playground .filter-section { margin: 0 !important; }
        .sdk-playground .filter-section-header { min-height: 0 !important; padding: 3px 8px !important; margin: 0 !important; }
        .sdk-playground .sdk-method-row { margin-top: 0 !important; }
        .sdk-playground .sidebar-tab-pane-body { overflow-y: auto; }
      </style>
      <div class="tab-pane sidebar-tab-pane sdk-playground">
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
          <button class="sdk-execute-btn" style="background:#1a73e8;color:#fff;border:none;border-radius:4px;padding:5px 14px;font-size:12px;cursor:pointer;font-weight:500;opacity:0.5;" disabled>Execute</button>
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
  function pinBottomPanel(container) {
    function init() {
      let scrollEl = null;
      let p = container.parentElement;
      while (p && p !== document.documentElement) {
        const ov = window.getComputedStyle(p).overflowY;
        if (ov === "auto" || ov === "scroll") {
          scrollEl = p;
          break;
        }
        p = p.parentElement;
      }
      if (!scrollEl)
        return;
      container.style.overflow = "hidden";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      const wrapper = container.querySelector(".sdk-playground");
      if (wrapper) {
        wrapper.style.flex = "1";
        wrapper.style.minHeight = "0";
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
      }
      const body = container.querySelector(".sidebar-tab-pane-body");
      if (body) {
        body.style.flex = "1";
        body.style.minHeight = "0";
        body.style.overflowY = "auto";
        body.style.height = "";
      }
      const setHeight = () => {
        container.style.height = `${scrollEl.clientHeight}px`;
      };
      setHeight();
      new ResizeObserver(setHeight).observe(scrollEl);
    }
    requestAnimationFrame(() => requestAnimationFrame(init));
  }
  function wireUpInteractions(container) {
    container.querySelectorAll(".collapsible-container").forEach((section) => {
      section.querySelector(".filter-section-header").addEventListener("click", () => {
        section.classList.toggle("collapsed");
      });
    });
    container.querySelectorAll(".sdk-method-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.closest("a"))
          return;
        container.querySelectorAll(".sdk-method-row").forEach((r) => {
          r.style.removeProperty("border-left");
          r.style.removeProperty("background");
        });
        row.style.borderLeft = "3px solid #1a73e8";
        row.style.background = "#e3edff";
        const accessor = row.getAttribute("data-module-accessor");
        const methodName = row.getAttribute("data-method");
        selectedModule = SDK_REGISTRY.find((m) => m.accessor === accessor);
        selectedMethod = selectedModule.methods.find((m) => m.name === methodName);
        const labelEl = container.querySelector(".sdk-selected-label");
        labelEl.textContent = `${selectedModule.label}.${selectedMethod.name}()`;
        labelEl.style.color = "#333";
        const btn = container.querySelector(".sdk-execute-btn");
        btn.disabled = false;
        btn.style.opacity = "1";
      });
    });
    container.querySelector(".sdk-execute-btn").addEventListener("click", () => {
      if (!selectedModule || !selectedMethod)
        return;
      executeMethod(container, wmeSdk, selectedModule, selectedMethod);
    });
    container.querySelector(".sdk-clear-btn").addEventListener("click", () => {
      container.querySelector(".sdk-response-log").innerHTML = "";
    });
  }
  function executeMethod(container, sdk, mod, method) {
    const log = container.querySelector(".sdk-response-log");
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    let resultHtml;
    try {
      const target = mod.accessor ? mod.accessor.split(".").reduce((obj, key) => obj[key], sdk) : sdk;
      const fn = target[method.name];
      if (typeof fn !== "function")
        throw new Error(`${method.name} is not a function`);
      const result = fn.call(target);
      const serialized = serializeResult(result);
      resultHtml = `<pre style="margin:0;font-size:11px;color:#a9dc76;background:#16161e;padding:4px 6px;border-radius:3px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;">${escapeHtml(serialized)}</pre>`;
    } catch (err) {
      const errName = err instanceof Error ? err.constructor.name : "Error";
      const errMsg = err instanceof Error ? err.message : String(err);
      resultHtml = `<pre style="margin:0;font-size:11px;color:#ff5555;background:#1e1015;padding:4px 6px;border-radius:3px;overflow-x:auto;white-space:pre-wrap;">${escapeHtml(`${errName}: ${errMsg}`)}</pre>`;
    }
    const entry = document.createElement("div");
    entry.style.cssText = "margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #2a2a3a;";
    entry.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-family:monospace;font-size:11px;color:#7ecfff;">${mod.label}.${method.name}()</span>
        <span style="font-size:9px;color:#555;margin-left:auto;">${timestamp}</span>
      </div>
      ${resultHtml}
    `;
    log.prepend(entry);
    while (log.children.length > MAX_RESULTS) {
      log.removeChild(log.lastChild);
    }
  }
}
void (() => {
  unsafeWindow.SDK_INITIALIZED.then(initScript);
})();

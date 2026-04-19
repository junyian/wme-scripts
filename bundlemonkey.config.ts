import type { Config } from "bundlemonkey";

const config: Config = {
  defaultMeta: {
    updateURL: ({ scriptName }) =>
      `https://www.github.com/wme-scripts/raw/main/dist/${scriptName}.user.js`,
    downloadURL: ({ scriptName }) =>
      `https://www.github.com/wme-scripts/raw/main/dist/${scriptName}.user.js`,
  },
};

export default config;

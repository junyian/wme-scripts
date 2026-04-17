import type { Config } from "bundlemonkey";

const config: Config = {
  defaultMeta: {
    updateURL: ({ scriptName }) =>
      `https://junyian.github.io/wme-scripts/${scriptName}.user.js`,
    downloadURL: ({ scriptName }) =>
      `https://junyian.github.io/wme-scripts/${scriptName}.user.js`,
  },
};

export default config;

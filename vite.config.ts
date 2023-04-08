import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "WYSIWYG Editor for GitHub",
  version: "1.0.0",
  content_scripts: [
    {
      matches: ["https://github.com/*"],
      js: ["src/content.tsx"],
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});

import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from '@vitejs/plugin-react'

export default () => {
  return defineConfig({
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    plugins: [nodePolyfills(), react()],
    server: {
      host: "localhost",
      port: 3000,
    },
  });
};

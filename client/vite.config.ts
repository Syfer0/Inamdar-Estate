// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, "/api"),
//       },
//     },
//   },
//   plugins: [react()],
// });
//production
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
});

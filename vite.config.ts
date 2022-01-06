import {defineConfig} from "vite"
import pluginVue from "@vitejs/plugin-vue"
export default defineConfig({
    base:"./",
    plugins:[
        pluginVue()
    ],
    build:{
        outDir:"./docs",
    }
})

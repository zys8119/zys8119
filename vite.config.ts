import {defineConfig} from "vite"
import pluginVue from "@vitejs/plugin-vue"
import {resolve} from "path"
export default defineConfig({
    base:"./",
    plugins:[
        pluginVue()
    ],
    build:{
        outDir:"./docs",
    },
    resolve:{
        alias:{
            "@":resolve(__dirname,"src")
        }
    }
})

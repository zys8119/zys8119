import {defineConfig, Plugin} from "vite"
import pluginVue from "@vitejs/plugin-vue"
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import {resolve} from "path"
import remPlug from "./plug/remPlug"
export default defineConfig({
    base:"./",
    plugins:[
        pluginVue(),
        remPlug([
            resolve(__dirname,"./src/assets/less/style.less"),
        ]),
        vueJsx(),
        viteCommonjs(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: [
                // presets
                'vue',
                'vue-router',
            ],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
    ],
    build:{
        outDir:"./docs",
        target: 'es2015',
        chunkSizeWarningLimit: 5000
    },
    resolve:{
        alias:{
            "@":resolve(__dirname,"src")
        }
    },
    server: {
        hmr: {
            overlay: false
        }
    }
})

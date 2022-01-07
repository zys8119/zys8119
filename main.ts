import {createApp} from "vue"
import App from "@/App.vue"
import route from "@/router/index"
import remPlug from "./plug/index"
import "@/assets/less/style.less"
const app = createApp(App)
app
    .use(remPlug,{
        base:1920
    })
    .use(route)
    .mount("#app")

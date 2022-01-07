import {createApp} from "vue"
import App from "@/App.vue"
import route from "@/router/index"
import "@/assets/less/style.less"
const app = createApp(App)
app
    .use(route)
    .mount("#app")

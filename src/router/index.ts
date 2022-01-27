import {createRouter, createWebHashHistory} from "vue-router"
export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/:pathMatch(.*)*",
            redirect:"/"
        },
        {
            path:"/",
            component:()=>import("@/view/Home/Home.vue")
        },
        {
            path:"/blog",
            component:()=>import("@/view/Blog/Blog.vue")
        },
    ]
})

import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth";
router.beforeEach((to, from, next) => {
    //权限控制在这里做
    // store.dispatch('GenerateRoutes');
    // router.addRoutes(store.getters.addRoutes);
    if (getToken()) {
        next()
    }else {
        if (to.path == "/login") {
            next()
        }else {
            next('/login')
        }   
    }
})  
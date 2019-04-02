import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";
import { getCurrentMenu,deepCopy } from "../common/utils";
import { constantRouterMap, asyncRouterMap } from "@/router";
import { getToken } from "@/utils/auth";
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    getters: {
        sidebar: state => state.sidebar,
        routers: state => state.routers,
        addRoutes: state => state.addRoutes,
        token: state => state.token,
    },
    state: {
        menuList: {},
        currentMenus: [],
        sidebar: {
            collapsed: false,
            show: true
        },
        token: '',
        addRoutes: [],
        routers: deepCopy(constantRouterMap)
    },
    //同步函数
    mutations: {
        [types.TOGGLE_SIDEBAR] (state,collapsed) {
            if (collapsed == null) collapsed = !state.sidebar.collapsed;
            console.log("test123");
            state.sidebar.collapsed = collapsed;
        },
        [types.TOGGLE_SIDEBAR_SHOW] (state, show) {
            if (show == null) state.sidebar.show = !state.sidebar.show;
            else {
                state.sidebar.show = show;
            }
        },
        [types.SET_ROUTERS] (state, routers) {
            state.addRoutes = deepCopy(routers) ;
            state.routers = deepCopy(constantRouterMap).concat(deepCopy(routers));
        },
        [types.SET_TOKEN] (state,token) {
            state.token = token;
        },
        [types.REMOVE_TOKEN] (state,token) {
            state.token = "";
        }
    },
    actions: {
        GenerateRoutes : ({commit}) => {
            commit(types.SET_ROUTERS,asyncRouterMap);
        },
        //登录存储cookie
        LoginBySetTooken : ({commit}, token) => {
            commit(types.SET_TOKEN, token);
        }
    }
})

export default store
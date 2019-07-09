import Vue from "vue";
import Vuex from "vuex";
import Content from "./modules/content";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Content
    }
})
import Vue from 'vue';
import Vuex from 'vuex';
import appData from './modules/appData'
import appEvent from './modules/appEvent'
import routerStatus from './modules/routerStatus'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        appData,
        appEvent,
        routerStatus,
    }
})
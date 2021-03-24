import { createStore } from 'vuex';
import mutations from "./mutationsDefault";
import state from "./stateDefault"
export default createStore({
  state,
  mutations
})

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const requestsModule = {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  mutations,
  actions,
  getters
};

export default requestsModule;

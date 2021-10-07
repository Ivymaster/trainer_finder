export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length;
  },
  selectedCoach(state) {
    return state.selectedCoach;
  },
  isCoach(state, getters, rootState, rootGetters) {
    console.log(getters);
    console.log(rootState);
    let userId = rootGetters.userId;
    return state.coaches.some(el => el.id == userId);
  }
};

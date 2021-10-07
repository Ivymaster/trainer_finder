export default {
  requests(state, getters, rootState, rootGettters) {
    console.log(getters, rootState);
    return state.requests.filter(el => el.coachId == rootGettters.userId);
  }
};

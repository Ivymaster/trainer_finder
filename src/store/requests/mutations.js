export default {
  addRequest(state, payload) {
    state.requests.push({
      id: payload.id,
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    });
  },
  setRequests(state, payload) {
    state.requests = [...payload];
  }
};

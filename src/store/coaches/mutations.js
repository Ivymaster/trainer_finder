export default {
  setSelectedCoach(state, payload) {
    const coachId = payload.id;
    for (let i = 0; i < state.coaches.length; i++) {
      if (state.coaches[i].id == coachId) {
        return (state.selectedCoach = state.coaches[i]);
      }
    }
    return (state.selectedCoach = null);
  },
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    return (state.coaches = [...payload]);
  }
};

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const coachesModule = {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        }
      ],
      selectedCoach: null
    };
  },
  mutations,
  actions,
  getters
};

export default coachesModule;

export default {
  findCoachById(context, payload) {
    context.commit('setSelectedCoach', payload);
  },
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const userToken = context.rootGetters.token;

    let registeredCoachData = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    let response = await fetch(
      `https://dddd-9cd31-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${userToken}`,
      {
        method: 'put',
        body: JSON.stringify(registeredCoachData)
      }
    );

    if (!response.ok) {
      return;
    }
    context.commit('registerCoach', {
      ...registeredCoachData,
      id: userId
    });
  },
  async fetchCoaches(context) {
    const response = await fetch(
      'https://dddd-9cd31-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    );

    const fetchedCoaches = await response.json();

    if (!response.ok) {
      let error = new Error(fetchedCoaches.message || 'Failed to fetch');
      throw error;
    }

    let coaches = [];

    for (let coachId in fetchedCoaches) {
      let coach = fetchedCoaches[coachId];
      coaches.push({
        id: coachId,
        firstName: coach.firstName,
        lastName: coach.lastName,
        description: coach.description,
        hourlyRate: coach.hourlyRate,
        areas: coach.areas
      });
    }

    context.commit('setCoaches', coaches);
  }
};

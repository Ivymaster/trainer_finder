export default {
  async contactCoach(context, payload) {
    let coachId = payload.coachId;
    let requestData = {
      email: payload.email,
      message: payload.message
    };

    let responseData = await fetch(
      `https://dddd-9cd31-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(requestData)
      }
    );

    let response = await responseData.json();

    if (!response.ok) {
      let error = new Error(response.message || 'Failed to send request');
      throw error;
    }

    context.commit('addRequest', {
      ...requestData,
      coachId
    });
  },
  async fetchUserRequests(context) {
    let coachId = context.rootGetters.userId;
    const userToken = context.rootGetters.token;

    const requests = await fetch(
      `https://dddd-9cd31-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${userToken}`
    );
    const fetchedRequests = await requests.json();
    let requestsData = [];
    for (let reqId in fetchedRequests) {
      requestsData.push({
        id: reqId,
        coachId: coachId,
        userEmail: fetchedRequests[reqId].email,
        message: fetchedRequests[reqId].message
      });
    }

    context.commit('setRequests', requestsData);
  }
};

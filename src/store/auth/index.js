const authStore = {
  state() {
    return {
      userId: null,
      token: null,
      expiresIn: 'none'
    };
  },
  mutations: {
    setUserData(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.expiresIn = 'none';
    }
  },
  actions: {
    async signUp(contex, payload) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDrvR3KRYRtgJY2SQ_zM-AEDtQvniZk0A`,
        {
          method: 'post',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        }
      );

      const responseData = await response.json();

      if (!responseData.ok) {
        let error = new Error(
          responseData.message || 'Authentification went wrong'
        );
        throw error;
      }

      contex.commit('setUserData', {
        userId: responseData.userId,
        token: responseData.idToken,
        expiresIn: 'none'
      });
      localStorage.setItem('token', responseData.idToken);
    },
    async login(contex, payload) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDrvR3KRYRtgJY2SQ_zM-AEDtQvniZk0A`,
        {
          method: 'post',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        }
      );

      const responseData = await response.json();
      contex.commit('setUserData', {
        userId: responseData.localId,
        token: responseData.idToken,
        expiresIn: 'none'
      });
      localStorage.setItem('token', responseData.idToken);
    },
    logout(context) {
      context.commit('setUserData', {
        userId: null,
        token: null,
        expiresIn: null
      });
      localStorage.removeItem('token');
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      let hasToken = localStorage.getItem('token');
      return !!(hasToken || state.token);
    }
  }
};

export default authStore;

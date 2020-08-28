export default {
  namespaced: true,
  state: {
    users: [],
    user: {},
  },
  getters: {
    USERS: (state) => {
      return state.users;
    },
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.users = payload;
    },
  },
  actions: {},
};

export default {
  namespaced: true,
  state: {
    token: "",
    user: {
      id: "",
      firstname: "",
      lastname: "",
    },
  },
  getters: {
    TOKEN: (state) => {
      return state.token;
    },
    USER: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
  },
  actions: {},
};

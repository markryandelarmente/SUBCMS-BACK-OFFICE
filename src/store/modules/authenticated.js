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
    ROLE: (state) => {
      if (state.user.roles && state.user.roles.length) {
        let role = state.user.roles[0];
        return {
          id: role.id,
          name: role.name,
        };
      }
    },
    PERMISSIONS: (state) => {
      if (state.user.roles && state.user.roles.length) {
        let role = state.user.roles[0];
        return role.permissions;
      }
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

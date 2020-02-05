export default {
  actions: {
    getComment({ commit, data }) {
      commit('addComment', data);
    },
  },
  mutations: {
    addComment(state, comment) {
      state.comment = comment;
    },
  },
  state: {
    comment: [],
  },
};

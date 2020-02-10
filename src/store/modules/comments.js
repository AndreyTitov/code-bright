import getCommentsData from '../../services/getComments';

export default {
  actions: {
    async getComments({ commit }) {
      getCommentsData.getComments().then((data) => {
        commit('addComments', data);
      });
    },
  },
  mutations: {
    addComments(state, comments) {
      state.comments = comments;
    },
  },
  state: {
    comments: [],
  },
};

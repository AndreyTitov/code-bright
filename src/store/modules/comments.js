import getCommentsData from '../../services/getComments';

export default {
  actions: {
    getComments({ commit }) {
      return getCommentsData.getComments().then((data) => {
        commit('addComments', data);
        return data;
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

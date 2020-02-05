import getCommentsData from '../../services/getComments';

export default {
  actions: {
    getComment({ commit, data }) {
      commit('addComment', data);
    },
    editComment({ commit }, { data, id }) {
      getCommentsData.editComment(data, id).then(() => {
        commit('applyComment');
      });
    },
  },
  mutations: {
    addComment(state, comment) {
      state.comment = comment;
    },
    applyComment(state, newComment) {
      state.comment = newComment;
    },
  },
  state: {
    comment: [],
  },
};

import getCommentsData from '../../services/getComments';

export default {
  actions: {
    getComment({ commit }, id) {
      getCommentsData.getComment(id).then((data) => {
        commit('addComment', data);
      });
    },
    editComment({ commit }, { data, id }) {
      getCommentsData.editComment(data, id).then(() => {
        commit('applyComment', data);
      });
    },
    deleteComment({ commit }, { id, router }) {
      getCommentsData.deleteComment(id).then((data) => {
        if (data.status === 200) {
          commit('addplyDeleteComment', data);
          router.go(-1);
        }
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
    addplyDeleteComment(state, deletedComment) {
      state.comment = deletedComment;
    },
  },
  state: {
    comment: [],
  },
};

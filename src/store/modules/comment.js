import getCommentsData from '../../services/getComments';

export default {
  actions: {
    addComment({ commit }, data) {
      return getCommentsData.addComment(data).then((response) => {
        if (response) {
          commit('pushComment', data);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
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
          commit('applyDeleteComment', data);
          router.go(-1);
        }
      });
    },
  },
  mutations: {
    pushComment(state, comment) {
      state.comments = comment;
    },
    addComment(state, comment) {
      state.comment = comment;
    },
    applyComment(state, newComment) {
      state.comment = newComment;
    },
    applyDeleteComment(state, deletedComment) {
      state.comment = deletedComment;
    },
  },
  state: {
    comment: [],
  },
};

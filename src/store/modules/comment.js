import getCommentsData from '../../services/getComments';

export default {
  actions: {
    addComment({ commit }, data) {
      return getCommentsData.addComment(data).then((response) => {
        if (response) {
          commit('pushComment', data);
        }
        return response;
      }).catch((error) => {
        console.log(error);
      });
    },
    getComment({ commit }, id) {
      return getCommentsData.getComment(id).then((data) => {
        commit('addComment', data);
        return data;
      });
    },
    editComment({ commit }, { data, id }) {
      return getCommentsData.editComment(data, id).then(() => {
        commit('applyComment', data);
        return data;
      });
    },
    deleteComment({ commit }, { id, router }) {
      return getCommentsData.deleteComment(id).then((data) => {
        commit('applyDeleteComment', data);
        router.go(-1);
        return data;
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

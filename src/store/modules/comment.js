import getCommentsData from '../../services/getComments';

export default {
  actions: {
    async addComment({ commit }, data) {
      const addComment = await getCommentsData.addComment(data);
      commit('pushComment', addComment);
    },
    async updateComments({ dispatch, commit }) {
      await dispatch('addComment');
      const updateState = await getCommentsData.getComments();
      commit('updateCommentsState', updateState);
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
    updateCommentsState(state, comments) {
      state.comments = comments;
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

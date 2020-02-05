<template>
  <div class="comment">
    <div v-if="showOverlay"
         class="overlay"
         @click="closeEditComment"></div>
    <div v-if="showEditWindow"
         class="edit-comment__wrapper">
      <h3>Edit comment</h3>
      <input type="text"
             class="edit-comment__input"
             placeholder="Edit title"
             v-model="newBody">
      <input type="text"
             class="edit-comment__input"
             placeholder="Edit body"
             v-model="newTitle">
      <button class="edit-comment__btn"
              @click="editComment">APPLY</button>
    </div>
    <div class="comment-wrapper wrapper">
      <div>
        <router-link :to="{name: 'comments'}">Back to comments</router-link>
      </div>
      <div class="comment-edit__wrapper">
        <font-awesome-icon icon="edit"
                           class="comment-edit__icon"
                           @click="showEditMenu = !showEditMenu"/>
      </div>
      <ul v-if="showEditMenu"
          class="comment-edit__menu">
        <li @click="showEditMenu = !showEditMenu"
            class="close">Close</li>
        <li class="edit"
            @click="showEditComment">Edit</li>
        <li class="delete"
            @click="deleteComment">Delete</li>
      </ul>
      <div class="comment-content__wrapper">
        <h3>{{comment.comment.title}}</h3>
        <p>{{comment.comment.body}}</p>
      </div>
      <h3 class="comment-subtitle">Lorem Ipsum is text of the typesetting industry</h3>
      <div class="comment-back__home-wrapper">
        <router-link :to="{name: 'home'}"
                     class="comment-back__home-button">
          Back to home page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import getComments from '../services/getComments';

export default {
  data() {
    return {
      showEditMenu: false,
      showOverlay: false,
      showEditWindow: false,
      newTitle: '',
      newBody: '',
    };
  },
  computed: mapState(['comment']),
  methods: {
    deleteComment() {
      const { id } = this.$route.params;
      getComments.deleteComment(id)
        .then((response) => {
          if (response.status === 200) {
            this.$router.go(-1);
          }
        });
    },
    showEditComment() {
      this.showOverlay = !this.showOverlay;
      this.showEditWindow = !this.showEditWindow;
      this.showEditMenu = !this.showEditMenu;
    },
    closeEditComment() {
      this.showOverlay = !this.showOverlay;
      this.showEditWindow = !this.showEditWindow;
      this.newTitle = '';
      this.newBody = '';
    },
    editComment() {
      this.showOverlay = !this.showOverlay;
      this.showEditWindow = !this.showEditWindow;
      this.newTitle = '';
      this.newBody = '';
    },
  },
  mounted() {
    const { id } = this.$route.params;

    getComments.getComment(id)
      .then((response) => {
        this.$store.commit('addComment', response.data);
      });
  },
};
</script>

<style lang="scss">
  .comment {
    padding: 100px 0;

    &-wrapper {
      position: relative;

      a {
        color: #000;
        position: relative;
        margin-left: 20px;

        &:hover {

          &:before {
            left: -20px;
          }

          &:after {
            width: 100%;
          }

        }

        &:before {
          content: url("../assets/back-arrow.png");
          position: absolute;
          top: 50%;
          left: -14px;
          transform: translateY(-50%);
          height: 20px;
          width: 20px;
          transition: left .5s ease;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background: #60e3a1;
          transition: width .5s ease;
        }
      }
    }

    &-edit {

      &__wrapper {
        position: absolute;
        top: 0;
        right: 20px;
        overflow: hidden;
        border-radius: 5px 0px 5px 5px;
      }

      &__menu {
        position: absolute;
        top: 0;
        right: 20px;
        width: 100px;
        text-align: center;
        background: #fff;
        z-index: 10;
        overflow: hidden;
        border-radius: 5px 0px 5px 5px;

        li {
          padding: 10px;
          cursor: pointer;
          transition: background .5s ease;

          &:hover, active {
            background: #bcbcbc;
            color: #fff;
          }
        }

        li.delete {

          &:hover {
            background: #E45752;
          }
        }

        li.edit {

          &:hover, :active {
            background: #48af7b;
          }
        }
      }

      &__icon {
        color: #bcbcbc;
        cursor: pointer;
        transition: color .5s ease;

        &:hover, :active {
          color: #48af7b;
        }
      }
    }

    &-content {

      &__wrapper {
        padding: 100px 0;
        border-bottom: 1px solid #ededef;
        margin-bottom: 100px;

        h3 {
          font-size: 3em;
          margin-bottom: 60px;
        }
      }
    }

    &-subtitle {
      font-size: 1.5em;
      color: #888a8b;
      text-align: center;
      margin-bottom: 40px;
    }

    &-back {

      &__home {

        &-wrapper {
          border: 1px solid #60e3a1;
          border-radius: 5px;
          width: 210px;
          margin: 0 auto;
        }

        &-button {
          margin-left: 10px !important;
          display: block;
          height: 100%;
          padding: 20px;
          margin-left: 15px !important;

          &:before {
            margin-left: 20px;
          }

          &:after {
            width: 0 !important;
          }
        }
      }
    }
  }

  .edit-comment {

    &__wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      z-index: 9;

      h3 {
        font-size: 2em;
        text-align: center;
        margin-bottom: 40px;
      }
    }

    &__input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #48af7b;
      font-size: 1em;

      &::placeholder {
        color: #48af7b;
      }

      &:last-child {
        margin-bottom: 0px;
      }
    }

    &__btn {
      width: 100%;
      border: none;
      background: #48af7b;
      color: #fff;
      padding: 10px;
      font-size: 1em;
      border-radius: 5px;
      transition: background .5s ease;
      cursor: pointer;

      &:hover {
        background: #60e3a1;
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 2;
  }
</style>

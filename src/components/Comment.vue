<template>
  <div class="comment">
    <div v-if="showOverlay"
         class="overlay"
         @click="closeEditComment"></div>
    <transition enter-active-class="animated fadeIn faster"
                leave-active-class="animated fadeOut faster">
      <div v-if="showEditWindow"
           class="edit-comment__wrapper">
        <h3>Edit comment</h3>
        <input type="text"
               class="edit-comment__input"
               placeholder="Edit title"
               v-model="newTitle">
        <textarea type="text"
               class="edit-comment__input"
               placeholder="Edit body"
               cols="30"
               rows="10"
               v-model="newBody"></textarea>
        <button class="edit-comment__btn"
                @click="editComment"
                :disabled="newTitle == '' || newBody == ''">APPLY
        </button>
      </div>
    </transition>
    <div v-if="loading">
      <div class="frame">
        <div class="loader">
          <div class="line"></div>
          <div class="line"></div>
          <span class="tick"></span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="comment.comment" class="comment-wrapper wrapper">
        <div>
          <router-link :to="{name: 'comments'}">Back to comments</router-link>
        </div>
        <div class="comment-edit__wrapper">
          <font-awesome-icon icon="edit"
                             class="comment-edit__icon"
                             @click="showEditMenu = !showEditMenu"/>
        </div>
        <transition enter-active-class="animated zoomInRight faster"
                    leave-active-class="animated zoomOutRight faster">
          <ul v-if="showEditMenu"
              class="comment-edit__menu">
            <li @click="showEditMenu = !showEditMenu"
                class="close">Close
            </li>
            <li class="edit"
                @click="showEditComment">Edit
            </li>
            <li class="delete"
                @click="deleteComment">Delete
            </li>
          </ul>
        </transition>
        <div class="comment-content__wrapper">
          <p class="comment-content__posted">Posted: {{comment.comment.created_at}}</p>
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
      <div v-else class="no-comment__wrapper  wrapper">
        <h3>No comment with current id</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      newValue: 0,
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
      const router = this.$router;
      this.$store.dispatch('deleteComment', { id, router });
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
      const { id } = this.$route.params;

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const date = new Date();

      const data = {
        headers: myHeaders,
        created_at: `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}/${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}/${date.getFullYear()}`,
        title: this.newTitle,
        body: this.newBody,
        redirect: 'follow',
      };

      this.loading = true;
      this.$store.dispatch('editComment', { data, id }).then((response) => {
        if (response) {
          this.loading = false;
        }
      });

      this.showOverlay = !this.showOverlay;
      this.showEditWindow = !this.showEditWindow;

      this.newTitle = '';
      this.newBody = '';
    },
  },
  mounted() {
    const { id } = this.$route.params;

    this.$store.dispatch('getComment', id).then((data) => {
      if (data) {
        this.loading = false;
      }
    });
  },
  watch: {
    showEditWindow() {
      if (this.showEditWindow) {
        document.body.style.overflow = 'hidden';
        return;
      }

      document.body.style.overflow = 'auto';
    },
  },
};
</script>

<style lang="scss">
  .comment {
    padding: 40px 0;
    overflow: hidden;

    @media(min-width: 768px) {
      padding: 100px 0;
    }

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
        right: 16px;
        overflow: hidden;
        border-radius: 5px 0px 5px 5px;

        @media(min-width: 768px) {
          right: 0;
        }
      }

      &__menu {
        position: absolute;
        top: 20px;
        right: 34px;
        width: 100px;
        text-align: center;
        background: #fff;
        z-index: 1;
        overflow: hidden;
        border-radius: 5px 0px 5px 5px;

        @media(min-width: 768px) {
          right: 18px;
        }

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

        p {
          white-space: pre-wrap;
        }
      }

      &__posted {
        text-align: right;
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
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: 20px;
      border-radius: 5px;
      z-index: 9;
      width: 90%;

      @media(min-width: 768px) {
        width: auto;
      }

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

      &:disabled {
        background: #bcbcbc;
        cursor: not-allowed;

        &:hover {
          background: #bcbcbc;
        }
      }

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
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
</style>

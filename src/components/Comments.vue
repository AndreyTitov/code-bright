<template>
  <div class="comments wrapper">
    <h3 class="comments-main__title">Comments</h3>
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
      <div v-if="comments.comments.length > 0">
        <div v-masonry
             column-width=".comment-card"
             stagger="0.03s"
             horizontal-order="true"
             item-selector=".comment-card"
             gutter="10"
             class="comment-card__wrapper">
          <div :key="index"
               v-for="(comment, index) in comments.comments"
               class="comment-card">
            <p class="comment-card__posted">Posted:
              <span>{{new Date(comment.created_at).toString()}}</span></p>
            <h3>{{comment.title}}</h3>
            <p>{{comment.body.split('\n').shift()}}</p>
            <router-link class="comment-card__btn"
                         :to="{name: 'currentId', params: {id: comment.id}}">Read more
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>No comments yet</h3>
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
    };
  },
  computed: mapState(['comments']),
  mounted() {
    this.$store.dispatch('getComments').then((data) => {
      if (data) {
        this.loading = false;
        this.$redrawVueMasonry();
      }
    });
  },
};
</script>

<style lang="scss">
  .comments {

    &-main__title {
      font-size: 2.5em;
      margin-bottom: 20px;

      @media(min-width: 768px) {
        font-size: 4.375em;
      }
    }
  }

  .comment {

    &-card {
      background: #fff;
      border-radius: 5px;
      padding: 45px 30px;
      width: 100%;
      margin-bottom: 10px;

      @media (min-width: 768px) {
        width: 49%;
      }

      h3 {
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 2.25rem;
      }

      p {
        margin-bottom: 10px;
        white-space: pre-line;
        word-wrap: break-word;
      }

      &__btn {
        display: block;
        text-align: center;
        color: #000;
        background: #60e3a1;
        width: 100%;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 1em;
        transition: background .5s ease;

        &:hover, &:active {
          background: #48af7b;
        }

        @media(min-width: 768px) {
          width: 150px;
        }
      }

      &__posted {
        color: #bcbcbc;
        font-style: italic;
        font-size: 0.8em;
        white-space: nowrap !important;
        text-align: right;

        span {
          color: #48af7b;
          word-wrap: break-word;
        }
      }
    }
  }

    .multi-ripple {
    width: 100px;
    height: 100px;
    margin: 2rem;

    div {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 0.3rem solid #48af7b;
      animation: 1.5s ripple infinite;

      &:nth-child(2) {
        animation-delay: 0.5s;
      }
    }
  }

  @keyframes ripple {
  from {
    transform: scale(0);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>

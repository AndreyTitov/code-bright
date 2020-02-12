<template>
  <div class="home-page">
    <section class="home-page__title-wrapper wrapper">
      <h3 class="home-page__title">
        Lorem Ipsum is simply dummy text of the printing and typesettin
      </h3>
    </section>
    <section class="home-page__img-wrapper">
      <img src="../assets/img.png" alt="img">
    </section>
    <section id="about-us" class="about-us">
      <div class="about-us__wrapper wrapper">
        <div class="about-us__card">
          <div class="card-icon__wrapper">
            <img src="../assets/who-we-are.png" alt="who-we-are">
          </div>
          <h3 class="card-title">Who we are</h3>
          <ul class="card-list">
            <li class="card-item">
              <span></span> It is a long established fact that a reader will be distracte
            </li>
            <li class="card-item">
              <span></span> The readable content of a page when looking at its layout
            </li>
            <li class="card-item">
              <span></span> The point of using Lorem Ipsum
            </li>
            <li class="card-item">
              <span></span> As opposed to using 'Content here, content here'.
            </li>
          </ul>
        </div>
        <div class="about-us__card">
          <div class="card-icon__wrapper">
            <img src="../assets/what-we-do.png" alt="who-we-are">
          </div>
          <h3 class="card-title">What we do</h3>
          <ul class="card-list">
            <li class="card-item">
              <span></span> Many desktop publishing packages and web page
            </li>
            <li class="card-item">
              <span></span>
              There are many variations of passages of Lorem Ipsum available, but the majority have
            </li>
            <li class="card-item">
              <span></span> Various versions have evolved over the years, sometimes by accident
            </li>
          </ul>
        </div>
        <div class="about-us__card">
          <div class="card-icon__wrapper">
            <img src="../assets/technology.png" alt="who-we-are">
          </div>
          <h3 class="card-title">Technology</h3>
          <ul class="card-list">
            <li class="card-item">
              <span></span> The point of using Lorem Ipsum
            </li>
            <li class="card-item">
              <span></span> As opposed to using 'Content here, content here'
            </li>
            <li class="card-item">
              <span></span> Contrary to popular belief, Lorem Ipsum is not simply random text
            </li>
            <li class="card-item">
              <span></span> A Latin professor at Hampden-Sydney College in Virginia
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="add-comment" class="add-comment">
      <div class="add-comment__wrapper wrapper">
        <div class="add-comment__title-wrapper">
          <h3 class=add-comment__title>Write comment</h3>
        </div>
        <div class="add-comment__form-wrapper">
          <form>
            <div v-if="completeSending"
                 class="add-comment__process">
              <font-awesome-icon icon="check-circle"
                                 class="add-comment__success" />
            </div>
            <div v-if="completeOverlay" class="add-comment__overlay"></div>
            <div v-if="completeOverlay">
              <div :class="sendedAnimation ? `frame complete` : `frame`">
                <div class="loader">
                  <div class="line"></div>
                  <div class="line"></div>
                  <span class="tick"></span>
                </div>
              </div>
            </div>
            <input id="comment-title"
                   name="comment-title"
                   class="add-comment__input"
                   type="text"
                   placeholder="Title"
                   v-model="title">
            <textarea name="comment"
                      id="comment-text"
                      placeholder="Your comment"
                      class="add-comment__input"
                      cols="30"
                      rows="10"
                      v-model="body"></textarea>
            <button class="add-comment__button"
                    @click="addComment"
                    :disabled="title == '' || body == ''">Send
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  data() {
    return {
      title: '',
      body: '',
      completeSending: false,
      completeOverlay: false,
      sendedAnimation: false,
    };
  },
  computed: {
    ...mapState(['comments']),
  },
  methods: {
    addComment(e) {
      e.preventDefault();

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const date = new Date();

      const requestOptions = {
        headers: myHeaders,
        created_at: `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}/${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}/${date.getFullYear()}`,
        title: this.title,
        body: this.body,
        redirect: 'follow',
      };

      this.title = '';
      this.body = '';
      this.completeOverlay = true;

      this.$store.dispatch('addComment', requestOptions).then((response) => {
        if (response.status === 201) {
          this.sendedAnimation = true;
          setTimeout(() => {
            this.completeOverlay = false;
            this.sendedAnimation = false;
          }, 2000);
        }
      });
    },
  },
};
</script>

<style lang="scss">

  .home {

    &-page {
      margin: 0 auto;

      &__title {
        font-size: 1.5em;
        padding: 40px 0;

        @media(min-width: 768px) {
          font-size: 2em;
        }

        @media(min-width: 1200px) {
          font-size: 4.375em;
        }

        &-wrapper {
          @media(min-width: 768px) {
            padding: 40px 140px;
          }
        }
      }
    }
  }

  .about-us {
    padding: 40px 0;

    @media (min-width: 1200px) {
      padding: 140px 0;
    }

    &__wrapper {

      @media (min-width: 768px) {
        display: flex;
        justify-content: space-around;
        // align-items: center;
      }
    }

    &__card {
      margin-bottom: 40px;

      @media (min-width: 768px) {
        width: 30%;
      }
    }
  }

  .card {
    &-title {
      font-size: 2.25em;
      margin-bottom: 20px;
      text-align: center;

      @media(min-width: 768px) {
        text-align: left;
        margin-bottom: 40px;
      }
    }

    &-icon {
      &__wrapper {
        margin: 0 auto 10px;
        width: 40px;

        @media(min-width: 768px) {
          margin: 0 0 10px 0;
        }
      }
    }

    &-item {
      position: relative;
      margin-bottom: 20px;
      font-size: 1em;

      &:last-child {
        margin-bottom: 0px;
      }

      span {
        position: relative;
        width: 10px;
        height: 10px;
        display: inline-block;

          &:before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #000;
        }
      }
    }
  }

  .add {
    &-comment {
      background: #1d1e25;

      &__wrapper {
        padding-top: 40px;
        padding-bottom: 40px;

        @media(min-width: 768px) {
          padding-top: 140px;
          padding-bottom: 140px;
          display: flex;
          border-bottom: 1px solid #4a4d5e;
        }
      }

      &__process {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
      }

      &__success {
        color: #48af7b;
        font-size: 4em;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(29,30,37,0.4);
        z-index: 2;
      }

      &__button {
        border: none;
        background: #60e3a1;
        color: #1d1e25;
        padding: 15px 50px;
        width: 100%;
        font-size: 1rem;
        text-transform: uppercase;
        font-family: "Sofia Pro";
        font-weight: 900;
        border-radius: 5px;
        cursor: pointer;
        transition: background .5s ease;

        @media(min-width: 768px) {
          width: 150px;
        }

        &:hover {
          background: #48af7b;
        }

        &:disabled {
          background: grey;
          cursor: not-allowed;
        }
      }

      &__input {
        display: block;
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 20px;
        font-size: 1rem;
        background: none;
        border: 1px solid #60e3a1;
        border-radius: 5px;
        color: #fff;
        font-family: 'Sofia Pro';

        &::placeholder {
          color: #60e3a1;
        }
      }

      &__title {
        color: #fff;
        font-size: 1.5em;
        position: relative;
        line-height: 1;

        @media(min-width: 768px) {
          font-size: 2.5em;
        }

        @media (min-width: 992px) {
          font-size: 4.375em;
        }

        &:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -20px;
          width: 30%;
          height: 3px;
          background: #f9d10d;
        }

        &-wrapper {
          margin-bottom: 40px;

          @media(min-width: 768px) {
            width: 40%;
          }
        }
      }

      &__form {
        &-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 5px;

          @media(min-width: 768px) {
            width: 60%;
          }
        }
      }
    }
  }

  /* MESH LOADER */

  .mesh-loader {
    overflow: hidden;
    height: inherit;
    width: inherit;
  }
  .mesh-loader .circle {
    width: 20px;
    height: 20px;
    position: absolute;
    background: #48af7b;
    border-radius: 50%;
    margin: -15px;
    -webkit-animation: mesh 3s ease-in-out infinite -1.5s;
    animation: mesh 3s ease-in-out infinite -1.5s;
  }

  .mesh-loader > div .circle:last-child {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }

  .mesh-loader > div {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .mesh-loader > div:last-child {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  @-webkit-keyframes mesh {
    0% {
      -webkit-transform-origin: 50% -100%;
      transform-origin: 50% -100%;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    50% {
      -webkit-transform-origin: 50% -100%;
      transform-origin: 50% -100%;
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    50.1% {
      -webkit-transform-origin: 50% 200%;
      transform-origin: 50% 200%;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform-origin: 50% 200%;
      transform-origin: 50% 200%;
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes mesh {
    0% {
      -webkit-transform-origin: 50% -100%;
      transform-origin: 50% -100%;
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    50% {
      -webkit-transform-origin: 50% -100%;
      transform-origin: 50% -100%;
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    50.1% {
      -webkit-transform-origin: 50% 200%;
      transform-origin: 50% 200%;
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform-origin: 50% 200%;
      transform-origin: 50% 200%;
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  $progress: #28e0da;
  $success: #1df295;

  $ease: cubic-bezier(.39,0,.41,1);
  $out: cubic-bezier(0,0,.23,1);
  $in: cubic-bezier(.71,.01,.91,.99);

  .frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: 9;
    border-radius: 50%;
  }

  .loader {
    height: 15vw;
    width: 15vw;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 1vw rgba(black,.03);
    outline: none;
    position: relative;

    .line {
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;

      animation: rotate 1.5s $ease forwards infinite;

      @keyframes rotate {
        to {
          transform: rotate(180deg);
        }
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom:0;
        border-radius: 50%;
        transition: 1s $out, opacity 0s;
        border: 1vw solid transparent;
        transform: rotate(-45deg);

        @keyframes line {
          45%,55% {
            transform: rotate(135deg);
          }
          100% {
            transform: rotate(315deg);
          }
        }
      }

      &:first-of-type {
        transform-origin: left center;
        left: 50%;
        right: 0;

        &:before {
          left: -100%;
          right: 0;
          border-top-color: $progress;
          border-left-color: $progress;
          animation: line 1.5s $ease forwards infinite;
        }
      }

      &:last-of-type {
        right: 50%;
        left: 0;
        transform-origin: right center;

        &:before {
          right: -100%;
          left: 0;
          opacity: 0;
          border-bottom-color: $progress;
          border-right-color: $progress;
          // animation: line 2s forwards infinite;
        }
      }
    }
  }

  .complete {

    .line:first-of-type {

      &:before {
        animation: none;
        opacity: 1;
        transform: rotate(135deg);
        border-top-color: $success;
        border-left-color: $success;
      }
    }

    .line:last-of-type {

      &:before {
        opacity: 1;
        transform: rotate(135deg);
        border-bottom-color: $success;
        border-right-color: $success;
      }
    }

    .tick {
      animation: tick 1s $out forwards .5s;

      @keyframes tick {
        0% {
          transform: translate3d(-50%,-70%,0) rotate(-40deg);
        }
        50% {
          transform: translate3d(-50%,0%,0) rotate(-40deg);
        }
        100% {
          transform: translate3d(-50%,-50%,0) rotate(-45deg);
        }
      }

      &:before,
      &:after {
        transform: scale3d(1,1,1);
      }
    }

  }


  .tick {
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate3d(-50%,-50%,0) rotate(-45deg);
    width: 34%;
    height: 15%;

    &:before,
    &:after {
      content: '';
      position: absolute;
      background: $success;
    }

    &:before {
      top: 0;
      left: 0;
      width: 1vw;
      bottom: 0;
      transform-origin: top;
      transform: scale3d(1,0,1);
      transition: .4s $ease .6s;
    }

    &:after {
      right: 0;
      left: 0;
      height: 1vw;
      bottom: 0;
      transform-origin: left;
      transform: scale3d(0,1,1);
      transition: .8s $out 1s;
    }
  }


</style>

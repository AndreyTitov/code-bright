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
        <div class=add-comment__form-wrapper>
          <form>
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
                    :disabled="title == '' || body == ''"
                    >Send
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      body: '',
    };
  },
  methods: {
    addComment(e) {
      e.preventDefault();

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        headers: myHeaders,
        created_at: 151551515,
        title: this.title,
        body: this.body,
        redirect: 'follow',
      };

      this.title = '';
      this.body = '';

      return axios.post('https://5cbef81d06a6810014c66193.mockapi.io/api/comments', requestOptions)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
        font-size: 4.375em;

        &-wrapper {
          padding: 40px 140px;
        }
      }
    }
  }

  .about-us {
    padding: 140px 0;

    &__wrapper {

      @media (min-width: 768px) {
        display: flex;
        justify-content: space-around;
        // align-items: center;
      }
    }

    &__card {
      @media (min-width: 768px) {
        width: 30%;
      }
    }
  }

  .card {

    &-title {
      font-size: 2.25em;
      margin-bottom: 40px;
    }

    &-icon {
      &__wrapper {
        width: 40px;
        margin-bottom: 10px;
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
        padding: 140px 0;
        display: flex;
        border-bottom: 1px solid #4a4d5e;
      }

      &__button {
        border: none;
        background: #60e3a1;
        color: #1d1e25;
        width: 150px;
        padding: 15px 50px;
        font-size: 1rem;
        text-transform: uppercase;
        font-family: "Sofia Pro";
        font-weight: 900;
        border-radius: 5px;
        cursor: pointer;
        transition: background .5s ease;

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
        font-size: 4.375em;
        position: relative;
        line-height: 1;

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
          width: 40%;
          padding: 0 15px;
        }
      }

      &__form {
        &-wrapper {
          width: 60%;
          padding: 0 15px;
        }
      }
    }
  }
</style>

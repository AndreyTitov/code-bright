<template>
  <div id="app">
    <Header />
    <div>
      <div class="text-center">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>

import Header from './views/Header.vue';
import Footer from './views/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Sofia Pro';
  background: #f7f7f7;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  width: 100%;
}

.wrapper {
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 768px) {
    width: 750px;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
  }

  @media (min-width: 992px) {
    width: 900px;
  }

  @media (min-width: 1600px) {
    width: 1265px;
  }
}

  button {
    font-family: 'Sofia Pro';
  }

  input {
    font-family: 'Sofia Pro';
  }

  textarea {
    font-family: 'Sofia Pro';
    font-size: 1em;
  }
</style>

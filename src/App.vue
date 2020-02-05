<template>
  <div id="app">
    <Header />
    <div>
      <div class="text-center">
          <div>
              <router-view/>
          </div>
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
  height: 100vh;
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
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;

  @media (min-width: 768px) {

  }

  @media (min-width: 1600px) {
    width: 1265px;
    padding-left: 0;
    padding-right: 0;
    margin: 0 auto;
  }
}

  button {
    font-family: 'Sofia Pro';
  }

  input {
    font-family: 'Sofia Pro';
  }

</style>

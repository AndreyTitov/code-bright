<template>
  <header class="header wrapper">
    <div class="header-wrapper">
      <div class="header-logo__wrapper">
        <div class="header-logo__container">
          <a href="#">
            <img src="../assets/logo.png"
                 alt="logo"
                 class="header-logo__img">
          </a>
        </div>
      </div>
      <div :class="showMobileMenu
              ? `mobile-menu__overlay`
              : `mobile-menu__overlay show-overlay`"
           @click="showMobileMenu = !showMobileMenu"></div>
      <div class="header-menu__wrapper">
        <font-awesome-icon icon="bars"
                           class="header-menu"
                           @click="showMobileMenu = !showMobileMenu"/>
      </div>
      <div class="header-nav__close-wrapper">
        <font-awesome-icon icon="times"
                           :class="showMobileMenu ? `close-menu` : `close-menu show-close__menu`"
                           @click="showMobileMenu = !showMobileMenu" />
      </div>
      <div :class="showMobileMenu ? `header-nav__wrapper` : `header-nav__wrapper open-menu`">
        <div class="header-nav">
          <router-link :to="{name: 'home', hash: '#about-us'}"
                       @click.native="showMobileMenu = true">
            About us
          </router-link>
          <router-link :to="{name: 'home', hash: '#add-comment'}"
                       @click.native="showMobileMenu = true">
            Write comment
          </router-link>
          <router-link to="/comments"
                       @click.native="showMobileMenu = true">
            Comments
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      showMenu: false,
      showMobileMenu: true,
    };
  },
  watch: {
    showMobileMenu() {
      if (!this.showMobileMenu) {
        document.body.style.overflow = 'hidden';
        return;
      }
      document.body.style.overflow = 'auto';
    },
  },
};
</script>

<style lang="scss">
  .header {
    padding: 20px 0;

    &-wrapper {
      display: flex;
      align-items: center;
    }

    &-logo {

      &__wrapper {
        width: 50%;
      }

      &__img {
        width: 120px;
      }
    }

    &-nav {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
      top: 50%;
      overflow: auto;

      @media (min-width: 992px) {
        flex-direction: row;
        margin-top: 0;
        overflow: visible;
      }

      a {
        font-weight: bold;
        color: #000;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 0.875em;
        padding: 10px 20px;

        @media (min-width: 992px) {
          margin-left: auto;
          padding: 0;
        }

        &.router-link-exact-active {
          position: relative;

          &:before {
            content: '';
            position: absolute;
            top: 0;
            width: 40px;
            height: 2px;
            background: yellow;
            animation: activeLink .5s ease;

            @media (min-width: 992px) {
              top: -10px;
              width: 100%;
            }
          }
        }
      }

      &__wrapper {
        margin-left: auto;
        position: absolute;
        top: 0;
        right: -100%;
        width: 90%;
        height: 100%;
        background: #fff;
        z-index: 9;
        transition: right .5s ease;

        @media (min-width: 992px) {
          position: relative;
          right: 0;
          background: none;
          margin-left: auto;
          width: 50%;
        }
      }
    }

    &-menu {
      font-size: 1.2em;
      color: #4a4d5e;

      &__wrapper {
        margin-left: auto;

        @media(min-width: 992px) {
          display: none;
        }
      }
    }
  }

  .open-menu {
    display: block;
    margin-left: auto;
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
    height: 100%;
    background: #fff;
    z-index: 9;
  }

  .mobile-menu__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
  }

  .show-overlay {
    display: block;
    z-index: 9;
  }

  .close-menu {
    position: absolute;
    font-size: 24px;
    top: 10px;
    right: -100%;
    color: #fff;
    z-index: 9;
    transition: right .6s ease;
  }

  .show-close__menu {
    right: 92%;
  }

  @keyframes activeLink {
    form {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
</style>

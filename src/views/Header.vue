<template>
    <div class="header wrapper">
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
            <div class="header-nav__wrapper">
                <div class="header-nav">
                    <router-link :to="{name: 'home', hash: '#about-us'}">
                        About us</router-link>
                    <router-link :to="{name: 'home', hash: '#add-comment'}">
                        Write comment</router-link>
                    <router-link to="/comments">
                        Comments</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style lang="scss">
    .header {
        padding: 20px 0;
        margin: 0 auto;

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
            a {
                font-weight: bold;
                color: #000;
                margin-left: 20px;
                text-transform: uppercase;
                text-decoration: none;
                font-size: 0.875em;

                &:first-child {
                    margin-left: 0;
                }

                    &.router-link-exact-active {
                        position: relative;

                        &:before {
                            content: '';
                            position: absolute;
                            top: -10px;
                            width: 100%;
                            height: 2px;
                            background: yellow;
                            animation: activeLink .5s ease;
                        }
                    }
                }

            &__wrapper {
                // width: 50%;
                margin-left: auto;
            }
        }
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

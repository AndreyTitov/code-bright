<template>
  <div class="footer">
    <section class="footer-wrapper wrapper">
      <div class="contacts-wrapper">
        <div>
          <a href="mailto:mail@mailtest.com">mail@mailtest.com</a>
        </div>
        <div>
          <a href="tel:+306977664062">+30-6977664062 </a>
        </div>
      </div>
      <div class="copyright-wrapper">
        <p>Copyright © 2019 Test All Rights Reserved.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
  .footer {
    background: #1d1e25;
    padding: 40px 0;

    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .contacts {

    &-wrapper {
      div {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0px;
        }
      }

      a {
        color: #fff;
      }
    }
  }

  .copyright {

    &-wrapper {
      p {
        color: #4a4d5e;
      }
    }
  }
</style>

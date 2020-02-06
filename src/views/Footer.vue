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

      @media(min-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .contacts {

    &-wrapper {
      text-align: center;
      margin-bottom: 20px;

      @media(min-width: 768px) {
        text-align: left;
        margin-bottom: 0px;
      }

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
      text-align: center;

      @media(min-width: 768px) {
        text-align: left;
      }

      p {
        color: #4a4d5e;
      }
    }
  }
</style>

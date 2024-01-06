<script lang="ts"></script>

<main class="main">
  <div class="container">
    <slot />
  </div>
</main>

<style lang="scss">
  .main {
    padding: 0;
    max-width: 100%;
    min-height: 100lvh;
    min-height: 100vh;
    overflow-x: hidden;
    background-image: url("../../assets/img/mv_lg.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
  }

  .container {
    position: relative;
    z-index: var(--z-index-1);
    padding: 28px 20px 30px;
    min-height: 100lvh;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(4px);

    @media screen and (min-width: 768px) {
      margin: 0 auto;
      padding: 28px 30px 30px;
      max-width: 840px;
    }
  }
</style>

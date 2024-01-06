<script lang="ts">
  import "$style/_partials/_reset.scss";
  import Container from "$lib/components/Container.svelte";
</script>

<Container>
  <slot />
</Container>


<style lang="scss">
  :global(body) {
    --color-black: #222;
    --color-white: #fff;
    --color-gray: #ccc;
    --color-red: #bd3d2d;
    --z-index-1: 1;

    height: auto;
    background-color: whitesmoke;
    color: var(--color-black);
  }

  :global(.--small) {
    margin-left: 0.2rem;
    font-size: 0.6em;
    font-weight: normal;
  }

  :global(.u-sr-only) {
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute;
    margin: -1px;
    padding: 0;
    width: 1px;
    height: 1px;
    white-space: nowrap;
  }
</style>

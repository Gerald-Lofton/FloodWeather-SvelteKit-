<!-- src/routes/_error.svelte -->
<script>
    import { page } from '$app/stores';
    export let data;
</script>

<h1>{$page.status}: {$page.error.message}</h1>


<style>
  h1 {
    font-size: 2em;
    color: red;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./components/Loader.svelte";
  import { getData } from "./utils/get-data";
  import DataDisplay from "./components/DataDisplay.svelte";
  import type { Data } from "./utils/types";
  import Tabs from "./components/Tabs.svelte";
  import Error from "./components/Error.svelte";

  let status = $state<"loading" | "error" | "ready">("loading");
  let data = $state<Data | null>(null);

  onMount(() => {
    getData()
      .then((res) => {
        status = "ready";
        data = res;
      })
      .catch((err) => {
        status = "error";
        console.log(err);
      });
  });
</script>

<div class="body">
  <div class="container">
    {#if status === "loading"}
      <Loader />
    {:else if status === "ready"}
      <div>
        <Tabs data={data!} />
      </div>
    {:else}
      <Error />
    {/if}
  </div>
</div>

<style>
  .body {
    padding: 1rem;
    width: 100%;
    overflow: auto;
    background-color: var(--bg-primary);
  }
</style>

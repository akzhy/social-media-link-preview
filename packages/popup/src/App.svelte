<script lang="ts">
  import { onMount } from "svelte";
  import Error from "./components/Error.svelte";
  import Loader from "./components/Loader.svelte";
  import Tabs from "./components/Tabs.svelte";
  import { getData } from "./utils/get-data";
  import type { Data } from "./utils/types";

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
        <div class="github-link">
          This extension is open source.
          <a href="https://github.com/akzhy/social-media-link-preview">
            View on GitHub
          </a>
        </div>
      </div>
    {:else}
      <div>
        <Error />
        <div class="github-link">
          If this error persists, please report it on <a
            href="https://github.com/akzhy/social-media-link-preview"
          >
            GitHub.
          </a>
        </div>
      </div>
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

  .github-link {
    padding: 1rem;
    text-align: center;
    background-color: var(--bg-accent);
    font-size: 1rem;
    border-radius: 0.25rem;
  }
</style>

<script lang="ts">
  import type { Data } from "@src/utils/types";
  import AllPreviews from "./AllPreviews.svelte";
  import { previewsList } from "./previews/list";

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();

  const tabsList = [
    {
      title: "All",
      id: "all",
      component: AllPreviews,
      dataKey: "og",
    },
    ...previewsList,
  ] as const;

  let activeTab = $state("all");

  let activeItem = $derived.by(() =>
    tabsList.find((item) => item.id === activeTab)
  )!;
</script>

<div class="tabs">
  <div class="buttons">
    {#each tabsList as listItem}
      <button
        class={["tab-button", { active: listItem.id === activeTab }]}
        type="button"
        onclick={() => (activeTab = listItem.id)}>{listItem.title}</button
      >
    {/each}
  </div>
  <div class="active-tab">
    {#if activeItem.id === "all"}
      {/* @ts-ignore */ null}
      <activeItem.component {data} />
    {:else}
      {/* @ts-ignore */ null}
      <activeItem.component
        {...data[(activeItem.dataKey as "twitter" | "og" | undefined) ?? "og"]}
      />
    {/if}
  </div>
</div>

<style>
  .active-tab {
    margin-top: 1rem;
  }

  .buttons {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    align-items: center;
  }

  .tab-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: var(--fg-secondary);
  }

  .tab-button.active {
    color: var(--fg-primary);
    background-color: var(--bg-accent);
  }
</style>

<script lang="ts">
  import type { Data } from "@src/utils/types";
  import { previewsList } from "./previews/list";

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();
</script>

<div class="list">
  {#each previewsList as listItem}
    <div class="item">
      <h3>{listItem.title}</h3>
      <listItem.component
        {...data[(listItem.dataKey as "twitter" | "og" | undefined) ?? "og"]}
      />
    </div>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item {
    position: relative;
    padding-bottom: 2rem;
  }

  .item::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    background: var(--bg-accent);
  }

  .item:last-child::after {
    display: none;
  }

  .item h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
</style>

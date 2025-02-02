<script lang="ts">
  import type { DataItem } from "@src/utils/types";

  interface Props extends DataItem {}

  let { image, site, title }: Props = $props();
</script>

<div class="card">
  <div class="image-container">
    <img src={image} alt={title} />
  </div>
  <div class="url">{site}</div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    border-radius: 0.85rem;
    overflow: hidden;
    width: 438px;
    border: 1px solid #e1e8ed;
    background: #fff;
    font-family: Helvetica;
    position: relative;
  }

  .image-container {
    position: relative;
    height: 0;
    padding-bottom: 52.33%;
    width: 100%;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .url {
    position: absolute;
    padding: 0.15rem 0.25rem;
    bottom: 0.5rem;
    left: 0.5rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0.25rem;
  }
</style>

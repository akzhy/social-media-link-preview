<script lang="ts">
  import type { DataItem } from "@src/utils/types";

  interface Props extends DataItem {}

  let { image, description, site, title }: Props = $props();
</script>

<div class="card">
  <div class="header">
    <p class="url">{site}</p>
    <p class="title">{title}</p>
    <p class="description">{description}</p>
  </div>
  <div class="image-container">
    <img src={image} alt={title} />
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 432px;
    background: #2f3136;
    font-family: Helvetica;
    position: relative;
    border-radius: 4px;
    border-left: 4px solid #202225;
    padding: 0.5rem 1rem 1rem 0.75rem;
  }

  .url {
    font-size: 12px;
    color: #fff;
    margin-top: 0.5rem;
    line-height: 1rem;
  }

  .title {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: #00b0f4;
    margin-top: 0.5rem;
    overflow-wrap: break-word;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: #dcddde;
    margin-top: 0.5rem;
    overflow-wrap: break-word;
  }

  .image-container {
    position: relative;
    height: 0;
    padding-bottom: 52.25%;
    width: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    border-radius: 0.25rem;
    margin-top: 1rem;
    overflow: hidden;
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

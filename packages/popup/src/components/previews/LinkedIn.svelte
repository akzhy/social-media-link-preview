<script lang="ts">
  import type { DataItem } from "@src/utils/types";

  interface Props extends DataItem {}

  let { image, site, title }: Props = $props();
</script>

<div class="card">
  <div class="image-container">
    <img src={image} alt={title} />
  </div>
  <div class="footer">
    <p class="title">{title}</p>
    <p class="url">{site}</p>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 520px;
    border: 1px solid #dadde1;
    background: #fff;
    font-family: Helvetica;
    position: relative;
    border-radius: 2px;
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
  }

  .image-container {
    position: relative;
    height: 0;
    padding-bottom: 52.25%;
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

  .footer {
    padding: 10px;
  }

  .url {
    font-size: 12px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-top: 5px;
    color: rgba(0, 0, 0, 0.9);
    padding-bottom: 2px;
  }
</style>

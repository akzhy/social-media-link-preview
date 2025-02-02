<script lang="ts">
  import type { DataItem } from "@src/utils/types";

  interface Props extends DataItem {}

  let { image, description, site, title }: Props = $props();
</script>

<div class="card">
  <div class="image-container">
    <img src={image} alt={title} />
  </div>
  <div class="footer">
    <p class="url">{site}</p>
    <p class="title">{title}</p>
    <p class="description">{description}</p>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 524px;
    border: 1px solid #dadde1;
    background: #fff;
    font-family: Helvetica;
    position: relative;
  }

  .image-container {
    position: relative;
    height: 0;
    padding-bottom: 52.5%;
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
    background-color: #f2f3f5;
    padding: 10px 12px;
  }

  .footer p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-wrap: break-word;
  }

  .url {
    font-size: 12px;
    text-transform: uppercase;
    color: #606770;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin-top: 5px;
    color: #1d2129;
  }

  .description {
    color: #606770;
    font-size: 14px;
    margin-top: 3px;
  }
</style>

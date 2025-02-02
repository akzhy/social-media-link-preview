<script lang="ts">
  import type { Data } from "@src/utils/types";
  import AllPreviews from "./AllPreviews.svelte";

  interface Props {
    data: Data;
  }

  let { data }: Props = $props();
</script>

<div>
  <AllPreviews {data} />
</div>

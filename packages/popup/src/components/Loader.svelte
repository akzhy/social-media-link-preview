<div class="loader-container">
  <div>
    <div class="loader"></div>
    <p class="loading-text">Loading...</p>
  </div>
</div>

<style>
  .loader-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading-text {
    margin-top: 0.5rem;
  }

  .loader {
    width: 3rem;
    aspect-ratio: 1;
    --c: no-repeat linear-gradient(var(--fg-primary) 0 0);
    background: var(--c), var(--c), var(--c);
    animation:
      l15-1 1s infinite,
      l15-2 1s infinite;
  }
  @keyframes l15-1 {
    0%,
    100% {
      background-size: 20% 100%;
    }
    33%,
    66% {
      background-size: 20% 40%;
    }
  }
  @keyframes l15-2 {
    0%,
    33% {
      background-position:
        0 0,
        50% 100%,
        100% 100%;
    }
    66%,
    100% {
      background-position:
        100% 0,
        0 100%,
        50% 100%;
    }
  }
</style>

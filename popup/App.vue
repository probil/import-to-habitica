<template>
  <div>
    <span v-if="strategy">Strategy: {{ strategy.name }}</span>
    <span v-else style="white-space: nowrap">Not supported</span>
  </div>
</template>
<script>
  export default {
    data: () => ({
      strategy: null,
    }),
    mounted() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        try {
          chrome.tabs.sendMessage(tabs[0].id, void 0, ({ strategy } = {}) => {
            if (chrome.runtime.lastError) return;
            if (!strategy) return;
            this.strategy = strategy;
          });
        } catch (e) {}
      });
    }
  }
</script>

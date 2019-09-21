<template>
  <div>
    <span v-if="strategy">Strategy: {{ strategy.name }}</span>
    <span v-else>Not supported</span>
  </div>
</template>
<script>
  export default {
    data: () => ({
      strategy: null,
    }),
    mounted() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, void 0, ({ strategy }) => {
          console.log('success', strategy);
          if(!strategy) return;
          this.strategy = strategy;
        });
      });
    }
  }
</script>

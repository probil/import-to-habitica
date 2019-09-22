<template>
  <div>
    <div v-if="strategy">
      Strategy: {{ strategy.name }}
      <h3>Task: {{ task.text }}</h3>
    </div>
    <span v-else style="white-space: nowrap">Not supported</span>
  </div>
</template>
<script>
  export default {
    data: () => ({
      strategy: null,
      task: null
    }),
    mounted() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        try {
          chrome.tabs.sendMessage(tabs[0].id, void 0, ({ strategy, task } = {}) => {
            if (chrome.runtime.lastError) return;
            if (!strategy) return;
            this.strategy = strategy;
            this.task = task;
            console.log(strategy, task);
          });
        } catch (e) {}
      });
    }
  }
</script>

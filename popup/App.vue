<template>
  <div>
    <div v-if="strategy">
      Strategy: {{ strategy.resource }}
      <h3>Task: {{ task.text }}</h3>
      <h4>Description: {{ task.notes }}</h4>
      <ul>
        <li v-for="item of task.checklist">{{ item }}</li>
      </ul>
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
          chrome.tabs.sendMessage(tabs[0].id, void 0, (response) => {
            if (chrome.runtime.lastError) return;
            if (!response || !response.strategy) return;
            const { strategy, task } = response;
            this.strategy = strategy;
            this.task = task;
          });
        } catch (e) {}
      });
    }
  }
</script>

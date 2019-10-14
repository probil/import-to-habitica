<template>
  <div class="container p-3">
    <TaskForm v-if="strategy" :task="task"></TaskForm>
    <span v-else class="whitespace-no-wrap">Not supported</span>
  </div>
</template>
<script>
  import TaskForm from './TaskForm';

  export default {
    components: {
      TaskForm,
    },
    data: () => ({
      strategy: null,
      task: null,
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

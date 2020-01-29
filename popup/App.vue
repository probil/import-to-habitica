<template>
  <div class="container p-3">
    <template v-if="loading">
      <Loading></Loading>
    </template>
    <template v-else-if="!error">
      <TaskForm v-if="strategy" :task="task" @import="handleImport"></TaskForm>
      <PageNotSupported v-else></PageNotSupported>
    </template>
    <template v-else>
      <ErrorMissingCredentials v-if="!credentials"></ErrorMissingCredentials>
      <ErrorMessage v-else :error="error"></ErrorMessage>
    </template>
  </div>
</template>
<script>
  import TaskForm from './TaskForm';
  import PageNotSupported from './PageNotSupported';
  import Loading from './Loading';
  import ErrorMessage from './ErrorMessage';
  import ErrorMissingCredentials from './ErrorMissingCredentials';
  import * as HabiticaAPI from './habitica-api';

  export default {
    components: {
      TaskForm,
      PageNotSupported,
      Loading,
      ErrorMessage,
      ErrorMissingCredentials,
    },
    data: () => ({
      loading: true,
      strategy: null,
      task: null,
      error: null,
      credentials: null,
    }),
    async mounted() {
      try {
        const { apiKey, userId } = await getSyncOptions() || {};
        if (!apiKey || !userId) {
          throw new Error('Credentials are not filled');
        }
        this.credentials.apiKey = apiKey;
        this.credentials.userId = userId;
        const { strategy, task } = await getDataFromContentScript() || {};
        this.strategy = strategy;
        this.task = task;
      } catch (e) {
        console.error(e);
        this.error = e;
      }
      this.loading = false;
    },
    methods: {
      async handleImport(payload) {
        console.log('payload', payload);
        await HabiticaAPI.startImport(this.credentials, payload);
      }
    }
  }

  /**
   * @returns {Promise<{ strategy: string, task: HabiticaInternalTask }>}
   */
  function getDataFromContentScript() {
    return new Promise(((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, void 0, (result) => {
          chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve(result);
        });
      });
    }))
  }

  /**
   * @returns {Promise<HabiticaCredentials>}
   */
  function getSyncOptions() {
    return new Promise(((resolve, reject) => {
      chrome.storage.sync.get({ userId: '', apiKey: '' }, result => {
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve(result)
      })
    }))
  }
</script>

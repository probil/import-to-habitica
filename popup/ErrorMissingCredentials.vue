<template>
  <div>
    <h3 class="uppercase tracking-wide text-sm text-indigo-600 font-bold mb-4">Credentials are missing</h3>
    <p>Here is how you can find them on Habitica:</p>
    <img src="./assets/how-to-find-credentials.jpg" alt="How to find credentials" class="max-w-full">
    <br/>
    <div class="mt-2 mb-2 text-center">
      <div class="inline-flex">
        <button @click="openOptionsPage"
                class="bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-bold py-2 px-4">
          Open options page
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      openOptionsPage() {
        chrome.runtime.openOptionsPage();
      }
    }
  }
</script>

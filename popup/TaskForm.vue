<template>
  <form>
    <h3 class="uppercase tracking-wide text-sm text-indigo-600 font-bold mb-4">Import as To-Do to Habitica</h3>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="task-title">
        Title<sup>*</sup>
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="task-title"
        type="text"
        placeholder="Task name"
        :value="task.text"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="task-notes">
        Notes
      </label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="task-notes"
        type="text"
        placeholder="Task notes"
        rows="3"
        :value="task.notes"
      ></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Checklist:
      </label>
      <label v-for="item of task.checklist" :key="item" class="block text-gray-600">
        <input class="mr-2 leading-tight" type="checkbox" v-model="checkedItems" :value="item">
        <span class="text-sm">{{ item }}</span>
      </label>
    </div>
    <div class="mb-2 text-center">
      <div class="inline-flex">
        <button class="hover:bg-gray-200 text-gray-800 text-sm font-bold py-2 px-4">
          Cancel
        </button>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-bold py-2 px-4">
          Import
        </button>
      </div>
    </div>
  </form>
</template>
<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      checkedItems: []
    }),
    mounted() {
      this.checkedItems = [...this.task.checklist];
    }
  }
</script>

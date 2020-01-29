<template>
  <form>
    <h3 class="uppercase tracking-wide text-sm text-indigo-600 font-bold mb-4">Import to Habitica as To-Do</h3>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="task-title">
        Title<sup>*</sup>
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="task-title"
        type="text"
        placeholder="Task name"
        v-model="text"
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
        v-model="notes"
      ></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Checklist:
      </label>
      <label v-for="item of checklist" :key="item" class="block text-gray-600">
        <input class="mr-2 leading-tight" type="checkbox" v-model="checklist" :value="item">
        <span class="text-sm">{{ item }}</span>
      </label>
    </div>
    <div class="mb-2 text-center">
      <div class="inline-flex">
        <button type="button" @click.prevent="handleCancel" class="hover:bg-gray-200 text-gray-800 text-sm font-bold py-2 px-4">
          Cancel
        </button>
        <button type="button" @click.prevent="handleImport" class="bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-bold py-2 px-4">
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
      text: '',
      notes: '',
      checklist: []
    }),
    mounted() {
      this.text = this.task.text;
      this.notes = this.task.notes;
      this.checklist = JSON.parse(JSON.stringify(this.task.checklist));
    },
    methods: {
      handleImport() {
        this.$emit('import', {
          text: this.text,
          notes: this.notes,
          checklist: this.checklist,
        });
      },
      handleCancel() {
        window.close();
      }
    }
  }
</script>

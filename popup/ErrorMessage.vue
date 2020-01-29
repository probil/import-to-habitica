<template>
  <span class="whitespace-no-wrap">{{ error || 'Something went wrong' }}</span>
</template>
<script>
  export default {
    props: ['error']
  }
</script>

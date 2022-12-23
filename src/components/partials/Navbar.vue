<template>
  <div class="bg-indigo-500 flex justify-center">
    <div class="max-w-7xl flex justify-between self-center items-center h-16 w-full">
      <h4 class="text-white uppercase">Frontend Dev CS</h4>
      <Button @click="go()">Go</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['gone'])
const go = () => {
  emit('gone')
}
</script>
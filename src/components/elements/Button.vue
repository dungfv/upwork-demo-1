<template>
  <button type="button"
    class="inline-flex items-center rounded border border-transparent bg-rose-600 px-2.5 py-1.5 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 min-w-[80px] text-center justify-center">
    <slot name="loading"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>

</script>
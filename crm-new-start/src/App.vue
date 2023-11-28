<script setup>
import TheBaseHeader from "@/components/layouts/TheBaseHeader.vue";
import TheBaseSide from "@/components/layouts/TheBaseSide.vue";
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-800 dark:border-gray-700">
    <TheBaseHeader class="fixed w-full"/>
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <TheBaseSide/>
    </div>
    <div class=" p-4 sm:ml-64 bg-white dark:bg-gray-800 dark:border-gray-700">
        <RouterView/>
    </div>
  </div>
</template>

<style scoped>

</style>

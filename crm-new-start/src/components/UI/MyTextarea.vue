<script setup lang="ts">
const props = defineProps<{
  label: string
  id: string
  placeholder: string
  required?: boolean
  modelValue?: string
}>()
</script>

<template>
  <div>
    <label :for="props.id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Your message</label
    >
    <textarea
      :id="props.id"
      :placeholder="props.placeholder || 'Write your thoughts here...'"
      :required="props.required"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    ></textarea>
  </div>
</template>

<style scoped></style>

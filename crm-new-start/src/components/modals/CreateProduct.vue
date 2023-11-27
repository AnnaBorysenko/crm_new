<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'

import BaseModal from './BaseModal.vue'
import MyInput from '../UI/MyInput.vue'
import MyTextarea from '../UI/MyTextarea.vue'
import FileInput from '../UI/FileInput.vue'

import { createProduct } from '@/services/apollo/mutations/products/createProduct'
import { uploadSingle } from '@/services/files/uploadSingle'

const emit = defineEmits()
const showModal = ref(false)
const formValues = reactive({
  name: '',
  description: '',
  price: '',
  count: '',
  image: null
})

const { mutate } = useMutation(createProduct)

const handleCreateProduct = async () => {
  try {
    showModal.value = false
    const { image, ...values } = formValues

    const { file_url } = await uploadSingle(image)

    await mutate({
      ...values,
      price: Number(values.price),
      count: Number(values.count),
      imageUrl: file_url
    })

    clearFormValues()

    emit('refresh')
  } catch (error) {
    console.log(error)
  }
}

const setImage = (files: File[] | null) => {
  formValues.image = files?.[0] || null
}

function clearFormValues() {
  formValues.name = ''
  formValues.description = ''
  formValues.price = ''
  formValues.count = ''
  formValues.image = null
}
</script>

<template>
  <button id="show-modal" @click="showModal = true" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create product</button>
  <BaseModal :show="showModal" @close="showModal = false">
    <template #header><h3 class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Product</h3></template>
    <template #body>
      <form class="gap-4 flex flex-col snap-y">
        <FileInput @setFile="setImage" :image="formValues.image" />
        <MyInput
          id="productName"
          label="Name"
          placeholder="Name of your product"
          v-model="formValues.name"
        />
        <MyTextarea
          id="productDescription"
          label="Description"
          placeholder="Description of your product"
          v-model="formValues.description"
        />
        <MyInput
          id="productPrice"
          label="Price"
          placeholder="Price of your product"
          v-model="formValues.price"
        />
        <MyInput
          id="productCount"
          label="Count"
          placeholder="Count of your product"
          v-model="formValues.count"
        />
      </form>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <button @click="showModal = false">Cancel</button>
        <button @click="handleCreateProduct" class="btn">Create</button>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped></style>

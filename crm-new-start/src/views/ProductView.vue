<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'

import { GET_PRODUCT, getProduct } from '@/services/apollo/queries/products/getProduct'
import { Product } from '@/models/Product'

const route = useRoute()
const productId = computed(() => route.params.id)

const { result } = useQuery<GET_PRODUCT>(getProduct, { id: productId })
const productData = computed(() => result.value?.product ?? ({} as Product))
</script>

<template>
  <div v-if="productData.id" class="about bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h1>{{ productData.name }}</h1>
    <p>{{ productData.description }}</p>
  </div>
  <div v-else><h1>Product not found.</h1></div>
</template>

<style></style>
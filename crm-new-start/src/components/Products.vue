<script setup lang="ts">
import { computed, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useRoute, useRouter } from 'vue-router'

import {
  defaultResultGetProducts,
  GET_PRODUCTS,
  getProducts
} from '@/services/apollo/queries/products/getProducts'

import Pagination from './UI/Pagination.vue'

import ProductCard from './ProductCard.vue'
import CreateProduct from './modals/CreateProduct.vue'
import Spinner from './UI/Spinner.vue'

const router = useRouter()
const route = useRoute()

const page = computed(() => route.query.page || 1)

const { result, refetch, loading } = useQuery<GET_PRODUCTS>(getProducts, {
  limit: 6,
  page: Number(page.value)
})
const productsData = computed(() => result.value?.products ?? defaultResultGetProducts)

function setPage(page) {
  if (page < 1 || page > productsData.totalPages || page === productsData.currentPage) return
  router.push({
    path: route.path,
    query: {
      ...route.query,
      page
    }
  })
}

watch(
  () => page.value,
  () => refetch({ page: +page.value })
)
</script>

<template>
  <main class="min-w-80 min-h-48">
    <div class="flex justify-between align-center py-8 bg-white dark:bg-gray-800 ">
      <div>
        <CreateProduct @refresh="refetch" />
      </div>
      <h3>Total pages: {{ productsData.totalPages }}</h3>
    </div>
    <div>
      <div v-if="loading" class="w-full flex justify-center">
        <Spinner />
      </div>

      <div v-else class="flex justify-around align-center flex-wrap ">
        <ProductCard v-for="product in productsData.items" :product="product" />
      </div>
    </div>
    <Pagination
      @setPage="setPage"
      :total-pages="productsData.totalPages"
      :current-page="productsData.currentPage"
      :total-count="productsData.totalCount"
    />
  </main>

</template>

<style scoped></style>

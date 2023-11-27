<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {locale} = useI18n({useScope: 'global'})
const switchLang = () => {
  locale.value === 'en' ? locale.value = 'ua' : locale.value = 'en'
  localStorage.setItem('lang', locale.value)}

</script>

<template>

  <a href="#"
     @click="switchLang"
     class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{
      $t('switchLang')
    }}</a>
</template>
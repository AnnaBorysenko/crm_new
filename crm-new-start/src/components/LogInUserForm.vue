<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { reactive} from 'vue'
import { login } from '@/services/apollo/mutations/auth/login'



const formLogin = reactive({
  email: '',
  password: '',
})

const { mutate } = useMutation(login)

const handleCreateUser = async () => {
  try {
    const {  ...values } = formLogin

    await mutate({
      ...formLogin,
      email: values.email,
      password: values.password,

    })

    clearFormValues()

    // emit('refresh')
  } catch (error) {
    console.log(error)
  }
}
function clearFormValues() {
  formLogin.email = ''
  formLogin.password = ''
}
</script>
<template>

  <div class="w-1/2">

      <div class="w-full p-8 mt-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">{{ $t('signIn') }}</h5>
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('your.email') }}</label>
          <input type="email" name="email" id="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                 placeholder="name@company.com"
                 v-model="formLogin.email"
                 required>
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('your.password') }}
            </label>
          <input type="password" name="password" id="password" placeholder="••••••••"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                 v-model="formLogin.password"
                 required>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" value=""
                     class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                     required>
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('remember.me') }}</label>
          </div>
          <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">{{ $t('lost.password') }} ?</a>
        </div>
        <button type="text"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {{ $t('create.your.account') }}
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          {{ $t('not.registered') }}? <router-link :to="{ name: 'RegisterUserFrom'}" class="text-blue-700 hover:underline dark:text-blue-500">{{ $t('create.your.account') }}</router-link>
        </div>
      </form>
      </div>
    </div>

</template>
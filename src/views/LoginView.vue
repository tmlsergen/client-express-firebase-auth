<script setup>
import {useAuthStore} from "@/stores/auth";
import {ref} from "vue";
import router from "@/router";
import TextInput from "@/components/inputs/TextInput.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import DefaultButton from "@/components/buttons/DefaultButton.vue";

const authStore = useAuthStore()

const user = ref({
  username: '',
  password: ''
})

const error = ref(false)

const login = async () => {
  error.value = false
  let status = await authStore.loginUser({
    username: user.value.username,
    password: user.value.password,
  })

  if (status) {
    await router.push({name: 'home', replace: false})
    return
  }

  error.value = true
}

</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        Login
      </div>
      <div class="card-body">
        <h5 class="card-title">Login to your account</h5>
        <p class="card-text">Please enter your credentials to proceed.</p>
        <h5 class="card-title text-danger" v-if="error">Invalid username or password</h5>

        <text-input v-model="user.username" field="username" />

        <password-input v-model="user.password" />

        <default-button text="Login" color="primary" @onClick="login" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

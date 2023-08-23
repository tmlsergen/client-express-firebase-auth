<script setup>
import DefaultButton from "@/components/buttons/DefaultButton.vue";
import router from "@/router";
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";

const authStore = useAuthStore()

const username = computed(() => {
  return authStore.getUser?.username
})

const logout = async () => {
  await authStore.logoutUser()

  await router.push({name: 'login', replace: false})
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">User Panel</span>
      Welcome - {{username}}
      <default-button color="danger" text="Logout" @onClick="logout" />
    </div>
  </nav>
</template>

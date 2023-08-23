<script setup>
import {onMounted} from 'vue'
import {useAuthStore} from "@/stores/auth";
import router from "@/router";
import AppLayout from "@/components/layouts/AppLayout.vue";

const authStore = useAuthStore()

onMounted(async () => {
  if (localStorage.getItem('token') !== null) {
    let status = await authStore.refreshUser()
    if (!status) {
      await authStore.logoutUser()

      await router.push({name: 'login', replace: false})
    }
  }
})

</script>

<template>
  <div>
    <AppLayout />
  </div>
</template>

<style scoped>
</style>

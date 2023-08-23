<script setup>
import moment from "moment";
import {computed, ref} from "vue";

const appName = ref(import.meta.env.VITE_APP_NAME || 'app')

const date = computed(() => {
  return moment().format('DD/MM/YYYY')
})
</script>

<template>
  <footer class="navbar fixed-bottom navbar-light bg-light">
    <div class="container text-center">
      User Panel - {{date}} - {{appName}}
    </div>
  </footer>
</template>

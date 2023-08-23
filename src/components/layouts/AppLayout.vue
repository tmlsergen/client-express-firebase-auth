<script setup>
import NavBarLayout from "@/components/layouts/NavBarLayout.vue";
import FooterLayout from "@/components/layouts/FooterLayout.vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute()

const layout = ref(false)

watch(() => route.meta?.layout, (value) => {
  layout.value = !!value;
})
</script>

<template>
  <section>
    <nav-bar-layout v-if="layout" />
    <router-view />
    <footer-layout v-if="layout" />
  </section>
</template>

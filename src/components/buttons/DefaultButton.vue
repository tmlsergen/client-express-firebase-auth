<script setup>
const props = defineProps({
  text: String,
  color: String
})

</script>

<template>
  <button class="btn" :class="'btn-' + (color ? color : 'primary')" @click="$emit('onClick')">{{ props.text }}</button>
</template>

<style scoped></style>
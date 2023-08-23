<script setup>
import {computed} from "vue";

const props = defineProps({
  modelValue: String,
  field: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const fieldName = computed(() => {
  return props.field.charAt(0).toUpperCase() + props.field.slice(1);
})
const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div :class="fieldName ? 'mb-3' : ''">
    <label v-if="fieldName" :for="field" class="form-label">{{ fieldName }}</label>
    <input type="text" class="form-control" :id="field" :value="props.modelValue" @input="updateValue"/>
  </div>
</template>

<style scoped></style>
<script setup lang="ts">
import { provide } from 'vue'
import type { FormRules } from '@/types/form'

const {
  rules = {}
} = defineProps<{
  rules: FormRules
}>()

const emit = defineEmits<{
  (e: 'validateHandle', value: boolean): void
}>()

const validFields = new Set()

provide('rules', rules)

provide('validateHandle', (field: string, valid: boolean) => {
  if (valid) {
    validFields.add(field)
  } else {
    validFields.delete(field)
  }
  emit('validateHandle', validFields.size === Object.keys(rules).length)
})

</script>

<template>
  <form>
    <slot></slot>
  </form>
</template>

<style scoped lang="scss">

</style>
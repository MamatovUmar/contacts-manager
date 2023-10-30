<script setup lang="ts">
import { tagsList } from '@/constants'

const { modelValue } = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

</script>

<template>
  <div class="tags">
    <div
      :class="['tag', { active: modelValue === '' }]"
      @click="emit('update:modelValue', '')"
    >
      Все
    </div>
    <div
      :class="['tag', { active: tag === modelValue }]"
      v-for="(tag, key) in tagsList"
      :key="key"
      @click="emit('update:modelValue', String(key))"
    >
      {{ tag }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;

  .tag {
    border: 1px solid var(--border-color);
    border-radius: var(--base-border-radius);
    padding: 5px 10px;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 14px;
    transition: 0.2s;

    &:hover, &.active {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
}
</style>
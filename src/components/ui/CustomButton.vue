<script setup lang="ts">

const {
  type = 'plain',
  disabled = false
} = defineProps<{
  type?: 'primary' | 'plain'
  disabled?: boolean
}>()

</script>

<template>
  <button :class="['btn', `btn--${type}`]" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  height: 35px;
  padding: 0 20px;
  border: 1px solid var(--border-color);
  background: #ffffff;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s;
  border-radius: var(--base-border-radius);

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  &--primary {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #ffffff;

    &:hover {
      color: #ffffff;
    }
  }

  &:disabled {
    background: var(--border-color);
    border-color: var(--border-color);
    cursor: not-allowed;
  }
}
</style>
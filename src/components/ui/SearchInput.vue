<script setup lang="ts">

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()


const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <section class="search">
    <input
      class="search__field"
      type="text"
      placeholder="Поиск по контактам"
      :value="props.modelValue"
      @input="onInput"
    />
  </section>
</template>

<style scoped lang="scss">
.search {
  margin-bottom: 20px;
  &__field {
    width: 100%;
    outline: none;
    border: 1px solid var(--border-color);
    height: 35px;
    font-size: 14px;
    padding-left: 20px;
    border-radius: var(--base-border-radius);

    &:focus, &:active {
      border-color: var(--primary-color);
    }
  }
}
</style>
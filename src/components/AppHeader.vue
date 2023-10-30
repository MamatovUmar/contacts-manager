<script setup lang="ts">

const { title } = defineProps<{
  title: string
}>()

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__title">
        {{ title }}
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid var(--border-color);
  height: 55px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  &__title {
    font-weight: 500;
    font-size: 20px;
  }
}
</style>
<script setup lang="ts">

import { useRouter } from "vue-router";

const router = useRouter()

const { title, backButton } = defineProps<{
  title: string
  backButton?: boolean
}>()

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <div v-if="backButton" class="header__back" @click="router.go(-1)">
          <img src="@/assets/images/arrow-left-icon.svg" alt="left">
        </div>
        <div class="header__title">
          {{ title }}
        </div>
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

  &__top {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__back {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
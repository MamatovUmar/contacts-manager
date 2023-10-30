<script setup lang="ts">
import type { ContactItem } from "@/types/contact";
import { useContacts } from "@/composables/useContacts";

const { tagsList } = useContacts()

const { contact } = defineProps<{
  contact: ContactItem
}>()

</script>

<template>
<div class="card">
  <div class="card__header">
    <div class="card__fio">{{ contact.fio }}</div>
    <div class="card__actions"></div>
  </div>
  <div class="card__info">
    <div class="card__option">Номер телефона:</div>
    <div class="card__value">{{ contact.phone }}</div>

    <div class="card__option">Email:</div>
    <div class="card__value">{{ contact.email }}</div>

    <div class="card__option">Теги: </div>
    <div class="card__value">
      <span
        class="card__tag"
        v-for="(tag, index) of contact.tags"
        :key="index"
      >
        {{ tagsList[tag] }}
      </span>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid var(--border-color);
  border-radius: var(--base-border-radius);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: var(--box-shadow);
  }

  &__header {
    display: flex;
    padding: 20px;
    font-weight: 600;
    border-bottom: 1px solid var(--border-color);
  }

  &__info {
    display: grid;
    grid-template-columns: 150px auto;
    padding: 20px;
    font-size: 14px;
    row-gap: 10px;
  }

  &__option {
    font-weight: 600;
  }

  &__value {
    display: flex;
    gap: 6px;
  }

  &__tag {
    border: 1px solid var(--border-color);
    font-size: 12px;
    padding: 3px 6px;
  }
}
</style>
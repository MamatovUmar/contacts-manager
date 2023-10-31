<script setup lang="ts">
import type { ContactItem } from '@/types/contact'
import { useContacts } from '@/composables/useContacts'
import { useRouter } from 'vue-router'

const { tagsList } = useContacts()
const router = useRouter()

const { contact, disable = false } = defineProps<{
  contact: ContactItem
  disable?: boolean
}>()

</script>

<template>
<div
  :class="['card', { disable }]"
  @click="router.push(`/${contact.id}`)"
>
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

  <template v-if="$slots.footer">
    <div class="card__footer">
      <slot name="footer" />
    </div>
  </template>
</div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid var(--border-color);
  border-radius: var(--base-border-radius);
  transition: 0.3s;

  &:not(.disable):hover {
    box-shadow: var(--box-shadow);
    cursor: pointer;
  }

  &__footer {
    border-top: 1px solid var(--border-color);
    padding: 20px;
    display: flex;
    gap: 20px;
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
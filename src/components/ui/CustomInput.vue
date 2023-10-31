<script setup lang="ts">

import {ref, inject, computed, onMounted} from 'vue'
import type {FormRules} from '@/types/form'

const {
  label,
  modelValue,
  prop,
  type = 'text',
} = defineProps<{
  label?: string
  placeholder?: string
  modelValue: string | number
  type?: string
  prop?: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const validateHandle = inject('validateHandle') as (field: string, valid: boolean) => void
const rules = inject<FormRules>('rules') || {}
const errorMessage = ref<string>('')

const follow = computed<string[]>(() => {
  if (!prop) return []
  if (!rules.hasOwnProperty(prop)) return []
  return rules[prop as keyof typeof rules]
})

const onInput = (event: Event) => {
  const val = (event.target as HTMLInputElement).value
  validate(val)

  emit('update:modelValue', val)
}

const onFocusOut = (event: Event) => {
  const val = (event.target as HTMLInputElement).value
  validate(val)
}

const validate = (val: string) => {
  if (follow.value.includes('required') && !val) {
    errorMessage.value = 'Обязательное поле'
  } else if (type === 'email' || follow.value.includes('email')) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errorMessage.value = re.test(val.toLowerCase()) ? '' : 'Введите правильную почту'
  } else {
    errorMessage.value = ''
  }
  if (prop) validateHandle?.(prop, !errorMessage.value)
}

onMounted(() => {
  if (modelValue) validate(modelValue as string)
})
</script>

<template>
  <div class="custom-input">
    <div
      class="custom-input__label"
      v-if="label"
    >
      {{ label }}
    </div>
    <input
      :class="['custom-input__field', { 'has-error': !!errorMessage }]"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @focusout="onFocusOut"
    >
    <div v-if="errorMessage" class="custom-input__hint">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  padding-bottom: 20px;
  position: relative;

  &__label {
    font-size: 14px;
    margin-bottom: 6px;
  }

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

    &.has-error {
      border-color: var(--error-color);
    }
  }

  &__hint {
    color: var(--error-color);
    font-size: 12px;
    margin-top: 4px;
    position: absolute;
    bottom: 3px;
    left: 0;
  }
}
</style>
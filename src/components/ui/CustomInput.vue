<script setup lang="ts">

import {ref} from "vue";

const {
  label,
  modelValue,
  type = 'text',
  required = false
} = defineProps<{
  label?: string
  placeholder?: string
  modelValue: string | number
  type?: string
  required: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const errorMessage = ref<string>('')

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
  if (required && !val) {
    errorMessage.value = 'Обязательное поле'
  } else if (type === 'email') {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errorMessage.value = re.test(val.toLowerCase()) ? '' : 'Введите правильную почту'
    console.log(re.test(val.toLowerCase()), errorMessage.value)
  } else {
    errorMessage.value = ''
  }
}
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
<script setup lang="ts">

import {onMounted, reactive, ref, watch, watchEffect} from 'vue';
import type { SelectOption } from '@/types/form'
import { tagsList } from '@/constants'
import { computed, inject } from 'vue'
import type { FormRules } from '@/types/form'

const {
  modelValue,
  options,
  label,
  prop
} = defineProps<{
  modelValue: string[]
  options: SelectOption[]
  label?: string
  prop?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
}>()

const validateHandle = inject('validateHandle') as (field: string, valid: boolean) => void
const rules = inject<FormRules>('rules') || {}
const errorMessage = ref<string>('')
const openDropdown = ref(false)
const selectedOptions = reactive(new Set())

const follow = computed<string[]>(() => {
  if (!prop) return []
  if (!rules.hasOwnProperty(prop)) return []
  return rules[prop as keyof typeof rules]
})

watchEffect(() => {
  modelValue.forEach(item => selectedOptions.add(item))
})

const validate = (size: number) => {
  if (follow.value.includes('required') && size === 0) {
    errorMessage.value = 'Обязательное поле'
  } else {
    errorMessage.value = ''
  }
  if (prop) validateHandle?.(prop, !errorMessage.value)
}

const selectOption = (option: string) => {
  if (selectedOptions.has(option)) {
    selectedOptions.delete(option)
  } else {
    selectedOptions.add(option)
  }
  emit('update:modelValue', Array.from(selectedOptions) as string[])
  validate(selectedOptions.size)
}

onMounted(() => {
  if (modelValue.length) validate(selectedOptions.size)
})
</script>

<template>
  <div class="select" v-click-outside="() => openDropdown = false">
    <div v-if="label" class="select__label" @click="openDropdown = false">
      {{ label }}
    </div>
    <div
      :class="['select__field', { 'has-error': !!errorMessage }]"
      @click="openDropdown = !openDropdown"
    >
      <span
        v-for="tag of selectedOptions"
        :key="`tag-${tag}`"
      >
        {{ tagsList[tag as string] }}
      </span>
    </div>
    <div v-if="errorMessage" class="select__hint">
      {{ errorMessage }}
    </div>
    <transition name="fade">
      <div
        v-if="openDropdown"
        class="select__dropdown"
      >
        <div
          v-for="option of options"
          :key="option.value"
          :class="['select__option', { active: selectedOptions.has(option.value) }]"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.select {
  padding-bottom: 20px;
  position: relative;

  &__label {
    font-size: 14px;
    margin-bottom: 6px;
  }

  &__field {
    width: 100%;
    border: 1px solid var(--border-color);
    height: 35px;
    padding-left: 10px;
    border-radius: var(--base-border-radius);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;

    &.has-error {
      border-color: var(--error-color);
    }

    span {
      font-size: 12px;
      border: 1px solid var(--border-color);
      padding: 4px 6px;
      border-radius: var(--base-border-radius);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% - 20px);
    left: 0;
    width: 100%;
    box-shadow: var(--box-shadow);
    border-radius: var(--base-border-radius);
    background: #ffffff;
    padding: 5px 0;
  }

  &__hint {
    color: var(--error-color);
    font-size: 12px;
    margin-top: 4px;
    position: absolute;
    bottom: 3px;
    left: 0;
  }

  &__option {
    font-size: 14px;
    padding: 6px 15px;
    cursor: pointer;
    &.active {
      color: var(--primary-color);
    }
  }
}
</style>
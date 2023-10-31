<script setup lang="ts">

const { isOpen } = defineProps<{
  isOpen: boolean,
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal">
      <div class="modal__bg" @click="emit('close')"></div>
      <div class="modal__content">
        <img
          class="modal__close"
          src="@/assets/images/close-icon.svg"
          alt="close"
          @click="emit('close')"
        >
        <div class="modal__header"> {{ title }} </div>
        <div class="modal__body">
          <slot></slot>
        </div>

        <template v-if="$slots.footer">
          <div class="modal__footer">
            <slot name="footer" />
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 15px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: rotate(180deg);
    }
  }

  &__content {
    position: absolute;
    background: #ffffff;
    border-radius: var(--base-border-radius);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
  }

  &__header {
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
  }

  &__footer {
    border-top: 1px solid var(--border-color);
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }

  &__body {
    padding: 20px;
  }
}
</style>
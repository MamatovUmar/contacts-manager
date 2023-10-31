<script setup lang="ts">

import CustomModal from '@/components/ui/CustomModal.vue'
import {reactive, ref} from 'vue'
import type { ContactForm } from '@/types/contact'
import CustomInput from '@/components/ui/CustomInput.vue'
import CustomButton from '@/components/ui/CustomButton.vue'
import CustomForm from '@/components/ui/CustomForm.vue'
import { useContacts } from '@/composables/useContacts'
import CustomMultipleSelect from '@/components/ui/CustomMultipleSelect.vue'

const { addContact, tagOptions } = useContacts()
const isOpen = ref(true)
const isValidForm = ref(false)
const form = reactive<ContactForm>({
  fio: '',
  phone: '',
  email: '',
  tags: []
})
const rules = reactive({
  fio: ['required'],
  email: ['required', 'email'],
  phone: ['required'],
  tags: ['required']
})

const validateForm = (valid: boolean) => {
  isValidForm.value = valid
}

const submitForm = () => {
  console.log(form)
  addContact(form)
}

</script>

<template>
  <div class="new-contact">
    <CustomButton @click="isOpen = true">
      Создать контакт
    </CustomButton>

    <CustomModal
      :is-open="isOpen"
      title="Создать контракт"
      @close="isOpen = false"
    >
      <CustomForm
        @validateHandle="validateForm"
        :rules="rules"
      >
        <CustomInput
          label="ФИО"
          v-model="form.fio"
          required
          prop="fio"
        />

        <CustomInput
          label="Email адрес"
          v-model="form.email"
          type="email"
          prop="email"
        />

        <CustomInput
          label="Номер телефона"
          v-model="form.phone"
          prop="phone"
        />

        <CustomMultipleSelect
          label="Выберить тег"
          v-model="form.tags"
          prop="tags"
          :options="tagOptions"
        />
      </CustomForm>

      <template #footer>
        <CustomButton @click="isOpen = false">
          Отменить
        </CustomButton>

        <CustomButton
          type="primary"
          :disabled="!isValidForm"
          @click="submitForm"
        >
          Создать
        </CustomButton>
      </template>
    </CustomModal>
  </div>
</template>

<style scoped lang="scss">

</style>
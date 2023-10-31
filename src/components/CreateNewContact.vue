<script setup lang="ts">

import CustomModal from '@/components/ui/CustomModal.vue'
import {onMounted, reactive, ref} from 'vue'
import type {ContactForm, ContactItem} from '@/types/contact'
import CustomInput from '@/components/ui/CustomInput.vue'
import CustomButton from '@/components/ui/CustomButton.vue'
import CustomForm from '@/components/ui/CustomForm.vue'
import { useContacts } from '@/composables/useContacts'
import CustomMultipleSelect from '@/components/ui/CustomMultipleSelect.vue'

const { editData } = defineProps<{
  editData?: ContactItem
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const { addContact, tagOptions, editContact } = useContacts()
const isOpen = ref(false)
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

const resetForm = () => {
  form.fio = ''
  form.phone = ''
  form.email = ''
  form.tags = []
}

const submitForm = () => {
  if (editData) {
    editContact({
      ...form,
      id: editData.id
    })
    emit('update')
  } else {
    addContact(form)
    resetForm()
  }
  isOpen.value = false
}

onMounted(() => {
  if (editData) {
    form.fio = editData.fio
    form.email = editData.email
    form.phone = editData.phone
    form.tags = editData.tags
    isValidForm.value = true
  }
})

</script>

<template>
  <div class="new-contact">
    <CustomButton type="primary" @click="isOpen = true">
      {{ editData ? 'Редактировать' : 'Создать контакт' }}
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
          {{ editData ? 'Сохранить' : 'Создать' }}
        </CustomButton>
      </template>
    </CustomModal>
  </div>
</template>
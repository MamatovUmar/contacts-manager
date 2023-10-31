<script setup lang="ts">
import { useContacts } from "@/composables/useContacts";
import { useRoute, useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import { onMounted, ref } from "vue";
import type {ContactItem} from "@/types/contact";
import ContactCard from "@/components/ContactCard.vue";
import CustomButton from "@/components/ui/CustomButton.vue";

const { getContact, removeContact } = useContacts()
const route = useRoute()
const router = useRouter()

const contact = ref<ContactItem>()

const deleteContactHandler = () => {
  removeContact(route.params.id as string)
  router.go(-1)
}

onMounted(() => {
  try {
    contact.value = getContact(route.params.id as string)
  } catch (e) {
    console.log(e)
  }
})


</script>

<template>
  <main class="contact">
    <AppHeader title="Информация о контакте" back-button />

    <div v-if="contact" class="container">
      <ContactCard :contact="contact" disable>
        <template #footer>
          <CustomButton @click="deleteContactHandler">
            Удалить
          </CustomButton>
          <CustomButton type="primary">
            Редактировать
          </CustomButton>
        </template>
      </ContactCard>
    </div>
  </main>
</template>

<style scoped>

</style>
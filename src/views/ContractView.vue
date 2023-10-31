<script setup lang="ts">
import { useContacts } from "@/composables/useContacts";
import { useRoute, useRouter } from "vue-router";
import AppHeader from "@/components/AppHeader.vue";
import { onMounted, ref } from "vue";
import type {ContactItem} from "@/types/contact";
import ContactCard from "@/components/ContactCard.vue";
import CustomButton from "@/components/ui/CustomButton.vue";
import CreateNewContact from "@/components/CreateNewContact.vue";

const { getContact, removeContact } = useContacts()
const route = useRoute()
const router = useRouter()

const contact = ref<ContactItem>()

const deleteContactHandler = () => {
  removeContact(route.params.id as string)
  router.go(-1)
}

const contactHandler = () => {
  contact.value = getContact(route.params.id as string)
  if (!contact.value) {
    router.go(-1)
  }
}


onMounted(() => {
  contactHandler()
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
          <CreateNewContact
            :edit-data="contact"
            @update="contactHandler"
          />
        </template>
      </ContactCard>
    </div>
  </main>
</template>

<style scoped>

</style>
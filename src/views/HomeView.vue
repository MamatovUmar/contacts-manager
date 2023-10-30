<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import ContactCard from '@/components/ContactCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'
import {computed, ref} from 'vue'

import type { ContactItem } from "@/types/contact";
import TagsFilter from "@/components/TagsFilter.vue";
import { useContacts } from "@/composables/useContacts";

const contacts = useContacts()
console.log(contacts)

const search = ref<string>('')
const selectedTag = ref<string>('')

const filteredContacts = computed<ContactItem[]>(() => {
  let data: ContactItem[] = [...contacts.list.value]

  if (search.value) {
    data = data.filter((el) => {
      return el.fio.toLowerCase().includes(search.value.toLowerCase()) ||
      el.phone.toLowerCase().includes(search.value.toLowerCase()) ||
      el.email.toLowerCase().includes(search.value.toLowerCase())
    })
  }

  if (selectedTag.value) {
    data = data.filter((el) => el.tags.includes(selectedTag.value))
  }
  return data
})

</script>

<template>
  <main class="home">
    <AppHeader title="Список контактов" />

    <div class="container">
      <SearchInput v-model="search" />

      <TagsFilter v-model="selectedTag"/>

      <transition-group name="list" tag="section" class="contacts">
        <ContactCard
            v-for="(contact, index) of filteredContacts"
            :key="index"
            :contact="contact"
        />
      </transition-group>

      <div v-if="filteredContacts.length === 0" class="empty-result">
        Ничего не найдено
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.contacts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.empty-result {
  text-align: center;
}


</style>

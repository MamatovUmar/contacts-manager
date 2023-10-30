import { contactList, tagsList } from '@/constants'
import type { ContactForm, ContactItem, Tags } from '@/types/contact'
import { ref } from 'vue'
import { uuid } from 'vue3-uuid'

export const useContacts = () => {
    const list = ref<ContactItem[]>(contactList)

    const addContact = (data: ContactForm) => {
        list.value.push({
            ...data,
            id: uuid.v4()
        })
    }

    const editContact = (data: ContactItem) => {
        const index = list.value.findIndex(el => el.id === data.id)
        if (index !== -1) {
            list.value[index] = data
        }
    }

    const removeContact = (id: string) => {
        const index = list.value.findIndex(el => el.id === id)
        if (index !== -1) {
            list.value.splice(index, 1)
        }
    }

    return {
        list,
        tagsList,
        removeContact,
        editContact,
        addContact
    }
}
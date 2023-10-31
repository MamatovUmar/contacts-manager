import { contactList, tagsList } from '@/constants'
import type { ContactForm, ContactItem } from '@/types/contact'
import { ref } from 'vue'
import { uuid } from 'vue3-uuid'
import type {SelectOption} from "@/types/form";

export const useContacts = () => {
    const list = ref<ContactItem[]>(contactList)

    const addContact = (data: ContactForm) => {
        list.value.unshift({
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

    const tagOptions: SelectOption[] = Object.entries(tagsList).map(([value, label]) => ({value, label}))

    return {
        list,
        tagsList,
        removeContact,
        editContact,
        addContact,
        tagOptions
    }
}
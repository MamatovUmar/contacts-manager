import type { ContactItem, Tags } from '@/types/contact'

export const tagsList: Tags = {
    work: 'Работа',
    family: 'Семя',
    friends: 'Друзя'
}

export const contactList: ContactItem[] = [
    {
        id: 'c2d882b7-476a-4e52-997e-182fd48df603',
        fio: 'John Doe',
        phone: '+1-202-555-0192',
        email: 'johndoe@example.com',
        tags: [
            'work'
        ]
    },
    {
        id: 'cfe50040-6ada-4904-98e6-3ce029a318a5',
        fio: 'Jane Smith',
        phone: '+1-202-555-0193',
        email: 'janesmith@example.com',
        tags: [
            'family'
        ]
    },
    {
        id: 'f298afe4-3642-42bd-b5ad-c43923b6bc52',
        fio: 'Bob Johnson',
        phone: '+1-202-555-0194',
        email: 'bobjohnson@example.com',
        tags: [
            'work',
            'family'
        ]
    },
    {
        id: '9a26779d-8fd5-4c82-ac8f-6eddfc25d0a3',
        fio: 'Alice Brown',
        phone: '+1-202-555-0195',
        email: 'alicebrown@example.com',
        tags: [
            'friends'
        ]
    },
    {
        id: 'b311242c-9037-4b09-88b7-1857b3684ae6',
        fio: 'David Lee',
        phone: '+1-202-555-0196',
        email: 'davidlee@example.com',
        tags: [
            'work'
        ]
    },
    {
        id: '56a9b363-5ee5-477d-a4d2-44824000d4fe',
        fio: 'Sarah Wilson',
        phone: '+1-202-555-0197',
        email: 'sarahwilson@example.com',
        tags: [
            'family'
        ]
    },
    {
        id: '78d515c2-8f51-4d70-b938-3b686e349408',
        fio: 'Tom Davis',
        phone: '+1-202-555-0198',
        email: 'tomdavis@example.com',
        tags: [
            'friends'
        ]
    },
    {
        id: 'affcec28-cb37-41e9-bb7a-5912060e8ef3',
        fio: 'Emily Taylor',
        phone: '+1-202-555-0199',
        email: 'emilytaylor@example.com',
        tags: [
            'work',
            'family'
        ]
    },
    {
        id: '334e1fdc-646b-4270-a9c1-9347e56203eb',
        fio: 'Mike Brown',
        phone: '+1-202-555-0200',
        email: 'mikebrown@example.com',
        tags: [
            'friends'
        ]
    },
    {
        id: '2b1929cb-b607-4401-a022-fd3c3efeb4f9',
        fio: 'Lisa Johnson',
        phone: '+1-202-555-0201',
        email: 'lisajohnson@example.com',
        tags: [
            'family'
        ]
    }
]


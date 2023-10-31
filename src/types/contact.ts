export interface ContactForm {
    fio: string
    phone: string
    email: string
    tags: string[]
}

export interface ContactItem extends ContactForm {
    id: string
}

export interface Tags {
    [key: string]: string
}
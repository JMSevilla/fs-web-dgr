import {z} from 'zod'
import { requiredString } from '../utils/requiredString'

export const BasePostSchema = z.object({
    id: z.number(),
    title: requiredString('Title is required.'),
    author: requiredString('Author is required.'),
    firstname: requiredString('Your firstname is required.'),
    middlename: requiredString('Middlename is required.'),
    lastname: requiredString('Your lastname is required.'),
    status: z.number()
})

export type PostInfer = z.infer<typeof BasePostSchema>
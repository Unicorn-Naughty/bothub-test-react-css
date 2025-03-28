import { z } from 'zod'
export const formLoginSchema = z.object({
    email: z.string().min(4, { message: 'Введите корректную почту' }),
    password: z.string().min(4, { message: 'Введите корректный пароль' })
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
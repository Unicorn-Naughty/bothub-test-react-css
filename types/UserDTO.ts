
export type UserDTO = {
    user: UserEntity
    accessToken: string
    refreshToken: string
}

export type SubscriptionEntity = {
    id: string
    plan_id:string
    user_id: string
    enterprise_id: string
    balance: string
    payment_plan: string
    hard_limit: number
    soft_limit: number
    credit_limit: number
    system_limit: number
    created_at: string
}
export type UserEntity = {
    id: string
    email: string
    tg_id: string
    name: string
    avatar: string
    role: "USER" | "ADMIN"
    created_at: "string"
    useEncryption:boolean
    subscription: SubscriptionEntity
    region: "RU" | "KZ" | "OTHER"
}

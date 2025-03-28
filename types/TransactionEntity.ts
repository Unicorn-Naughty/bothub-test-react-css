export type TransactionEntity = {
    id: string
    provider: "YOOMONEY" | "CRYPTO" | "BOTHUB"
    currency: "RUB" | "USD" | "EUR" | "BOTHUB_TOKEN"
    meta: object
    amount: number
    status: "FAILED" | "SUCCEDED" | "PENDING"
    type: "SUBSCRIPTION" | "WRITE_OFF" | "REPLINSH" | "WITHDRAW"
    plan_id: string
    user_id: string
    referral_id: string
    external_id: string
    created_at: string
}
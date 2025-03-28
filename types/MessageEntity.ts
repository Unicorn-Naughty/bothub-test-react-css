import { TransactionEntity } from "./TransactionEntity"

export type MessageEntity = {
    id: string
    role?: "assistant" | "user" | "action"
    type: "TEXT" | "IMAGE" | "ACTION"
    status?: "PENDING" | "DONE"
    tokens?: number
    action_type?: "CONTEXT_CLEARED"
    user_id?: string
    chat_id?: string
    additional_content?: string
    tg_bot_message_id?: string
    disabled?: boolean
    content?: string
    request_id?: string
    transaction_id?: string
    model_id?: string
    created_at: string
    transaction?: TransactionEntity
    model?: {
        parent?: {
            label: string
        }
    }
}

export type ResponseMessageEntity = Omit<MessageEntity, "transaction">
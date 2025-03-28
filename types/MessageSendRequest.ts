export type MessageSendRequest= {
    chatId: string
    message: string
    tgBotMessageId?: string
    platform?:"MAIN" | "DASHBOARD" | "TELEGRAM" | "BOTHUB_API"
} 
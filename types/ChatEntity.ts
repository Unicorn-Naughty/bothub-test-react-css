export type ChatEntity = {
    id: string
    group_id: string
    user_id: string
    name: string
    total_caps: number
    highlight: string
    model_id: string
    created_at: string
}

export type PatchChatEntityRequest  = {
    name?: string,
    highlight?: string
    modelId?: string
    modelFunctionId?: string
    initial?: boolean
    groupId?: string
}
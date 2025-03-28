export type PostChatDTO = {
    modelId: string
    groupId: string
    name: string
    highlight: string
    platform: "WEB"
}

export type StrippedPostChatDTO = Pick<PostChatDTO, "name">
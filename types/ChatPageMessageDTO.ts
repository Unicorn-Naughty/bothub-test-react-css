import { MessageEntity } from "./MessageEntity"

export type ChatPageMessageDTO = {
    data: MessageEntity[]
    pages: number
}
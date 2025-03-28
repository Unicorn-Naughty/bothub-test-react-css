import { MessageSendRequest } from "@/types/MessageSendRequest"
import { instance } from "../instance"
import { ResponseMessageEntity } from "@/types/MessageEntity"
import { ChatPageMessageDTO } from "@/types/ChatPageMessageDTO"

export const postMessageToChat = async (token: string, body: MessageSendRequest) => {
    const { data } = await instance.post<ResponseMessageEntity>('/message/send', body, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}
export const getMessagesFromChat = async (token: string, id: string) => {
    const { data } = await instance.get<ChatPageMessageDTO>(`/message/list?chatId=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}
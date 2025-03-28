import { ChatPageDTO } from "@/types/ChatPageDTO"
import { instance } from "../instance"
import { StrippedPostChatDTO } from "@/types/PostChatDTO"
import { ChatEntity, PatchChatEntityRequest } from "@/types/ChatEntity"
import { clearChunks } from "@/lib/streams"
export const getAllChats = async (token: string) => {
    const { data } = await instance.get<ChatPageDTO>('/chat/list', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}

export const postChat = async (token: string, body: StrippedPostChatDTO) => {
    const { data } = await instance.post<ChatEntity>('/chat', body, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}

export const deleteChat = async (token: string, id: string) => {
    const { data } = await instance.delete<ChatEntity>(`/chat/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}



export async function* getMessagesFromChatSSE(token: string, id: string) {
    const response = await fetch(`https://bothubq.com/api/v2/chat/${id}/stream`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'text/event-stream'
        }
    })

    if (!response.body) {
        throw new Error('no body')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    const chunks = []

    while (true) {
        const { value, done } = await reader.read()

        if (done) {
            break;
        }

        const decodedChunk = decoder.decode(value, { stream: true })
        chunks.push(decodedChunk)
        const cleanChunks = clearChunks(decodedChunk)
        for (const chunk of cleanChunks) {
            if (chunk.name === "MESSAGE_UPDATE") {
                yield chunk.data.message
            }
        }
    }
}

export const patchChat = async (token: string, id: string, body: PatchChatEntityRequest) => {
    const { data } = await instance.patch<ChatEntity>(`/chat/${id}`, body, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}


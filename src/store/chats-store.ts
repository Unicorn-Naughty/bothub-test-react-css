import { ChatPageDTO } from "@/types/ChatPageDTO";
import { create } from "zustand";
import { clientApi } from "../services/client-api";
import { StrippedPostChatDTO } from "@/types/PostChatDTO";
import { ChatEntity, PatchChatEntityRequest } from "@/types/ChatEntity";
interface IChatsStoreZustnad {
    loading: boolean
    chatPage: ChatPageDTO
    selectedChat: string
    fetchChatPage: (token: string) => void
    createChat: (token: string, body: StrippedPostChatDTO) => Promise<ChatEntity>;
    deleteChat: (token: string, id: string) => void
    updateChat: (token: string, id: string, body: PatchChatEntityRequest) => void
    selectChat: (id: string) => void
}
export const chatsStoreZustand = create<IChatsStoreZustnad>((set) => ({
    loading: true,
    selectedChat: "",
    chatPage: {
        data: [],
        pages: 0
    },
    fetchChatPage: async (token) => {
        try {
            const response = await clientApi.chats.getAllChats(token)
            set({ chatPage: response })
        } catch (error) {
            console.log(error);

        } finally {
            set({ loading: false })
        }
    },
    createChat: async (token, body): Promise<ChatEntity> => {
        try {
            const response: ChatEntity = await clientApi.chats.postChat(token, body);
            set(state => ({
                chatPage: {
                    ...state.chatPage,
                    data: [...state.chatPage.data, response]
                }
            }));
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    deleteChat: async (token, id) => {
        try {
            await clientApi.chats.deleteChat(token, id)
            set(state => ({
                chatPage: {
                    ...state.chatPage,
                    data: state.chatPage.data.filter((chat) => chat.id !== id)
                }
            }))
        } catch (error) {
            console.log(error);

        }
    },
    updateChat: async (token, id, body) => {
        try {
            await clientApi.chats.patchChat(token, id, body)
            set((state) => ({
                chatPage: {
                    ...state.chatPage,
                    data: state.chatPage.data.map((chat) => chat.id === id ?
                        {
                            ...chat,
                            name: body.name ? body.name : chat.name,
                            highlight: body.highlight ? body.highlight : chat.highlight,
                            model_id: body.modelId ? body.modelId : chat.model_id
                        }
                        : chat)
                }
            }))
        } catch (error) {
            console.log(error);

        }
    },
    selectChat: (id) => {
        set({ selectedChat: id })
    }
}))
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChatPageMessageDTO } from "@/types/ChatPageMessageDTO";
import { create } from "zustand";
import { clientApi } from "../services/client-api";
import { MessageSendRequest } from "@/types/MessageSendRequest";
import { debounce } from "@/lib/debounce-func";

interface IOneChatMessagesStoreZustand {
    loading: boolean;
    error: string
    chatMessagePage: ChatPageMessageDTO
    fetchMessage: (token: string, id: string) => void;
    postMessageToChat: (token: string, body: MessageSendRequest) => void;
    getMessageFromChatSSE: (token: string, id: string) => void;
}

export const oneChatMessagesStoreZustand = create<IOneChatMessagesStoreZustand>((set) => ({
    loading: true,
    error: "",
    chatMessagePage: {
        data: [],
        pages: 0
    },

    fetchMessage: async (token, id) => {
        try {
            const response = await clientApi.messages.getMessagesFromChat(token, id);
            const constCorrectData = {
                ...response,
                data: response.data.reverse()
            }
            set({
                chatMessagePage: constCorrectData
            });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    postMessageToChat: async (token, body) => {
        try {
            await clientApi.messages.postMessageToChat(token, body);
        } catch (error) {
            console.log(error);
        }
    },
    getMessageFromChatSSE: async (token, id) => {
        try {
            const response = clientApi.chats.getMessagesFromChatSSE(token, id);
            
            const debouncedSet = debounce((newData: any) => {
                set(state => ({
                    chatMessagePage: {
                        ...state.chatMessagePage,
                        data: newData
                    }
                }));
            }, 25);

            for await (const message of response) {
                console.log("Received message:", message);
                set(state => {
                    const existingIndex = state.chatMessagePage.data.findIndex(msg => msg.id === message.id);
                    const newData = [...state.chatMessagePage.data];
                    if (existingIndex !== -1) {
                        newData[existingIndex] = message;
                    } else {
                        newData.push(message);
                    }
                    debouncedSet(newData);
                    return state;
                });
            }
        } catch (errResp) {
            const err = errResp as Error;
            console.error("Error in getMessageFromChatSSE:", err.message);
            set({ error: err.message });
        }
    },
}));

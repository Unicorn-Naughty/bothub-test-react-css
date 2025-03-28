import { ModelEntity } from "@/types/ModelEntity";
import { create } from "zustand";
import { clientApi } from "../services/client-api";

interface IAiModelsStoreZustand {
    loading: boolean
    models: ModelEntity[]
    currentModel: ModelEntity
    fetchModels: (token: string) => void
    setCurrentModel: (model: ModelEntity) => void
}
export const aiModelsStoreZustand = create<IAiModelsStoreZustand>((set) => ({
    loading: true,
    models: [],
    fetchModels: async (token) => {
        try {
            const resp = await clientApi.models.getModelsList(token)
            set({ models: resp })
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false })
        }

    },
    currentModel: {
        id: "",
        owned_by: "",
        created_at: ""
    },
    setCurrentModel: (model) => {
        set({ currentModel: model })
    },
}))
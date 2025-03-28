import { ModelEntity } from "@/types/ModelEntity"
import { instance } from "../instance"


export const getModelsList = async (token: string) => {
    const { data } = await instance.get<ModelEntity[]>(`model/list`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data
}
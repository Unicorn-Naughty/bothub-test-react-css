import { create } from 'zustand'
interface ISideBarStateStore {
    open: boolean
    changeState: () => void
    changeStateClose: () => void
    changeStateOpen: () => void
}
export const sideBarStateStore = create<ISideBarStateStore>((set) => ({
    open: false,
    changeState: () => {
        set((state) => ({ open: !state.open }))
    },
    changeStateClose: () => {
        set({ open: false })
    },
    changeStateOpen: () => {
        set({ open: true })
    },
})) 


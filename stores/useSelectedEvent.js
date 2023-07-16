import {create} from 'zustand'

const useSelectedEvent = create((set) => ({
    selectedEventHomePage: null,
    setSelectedEventHomePage: (x) => {
        set((state) => ({
            selectedEventHomePage: x
        }))
    },
    selectedEventLikesPage: null,
    setSelectedEventLikesPage: (x) => {
        set((state) => ({
            selectedEventLikesPage: x
        }))
    }
}));

export default useSelectedEvent;
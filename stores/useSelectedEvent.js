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
    },
    selectedEvenTicketsPage: null,
    setSelectedEventTicketsPage: (x) => {
        set((state) => ({
            selectedEvenTicketsPage: x
        }))
    },
}));

export default useSelectedEvent;
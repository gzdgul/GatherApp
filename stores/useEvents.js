import {create} from 'zustand'

const useEvents = create((set) => ({
    events: [],
    liked: [],
    purchased: [],
    setEvents: (x) => {
        set(() => ({
            events: x || []
        }))
    },
    setLikedEvents: (x) => {
        set((prevState) => ({
            liked: x
        }))
    },
    setPurchasedEvents: (x) => {
        set((prevState) => ({
            purchased: x
        }))
    }
}));

export default useEvents;
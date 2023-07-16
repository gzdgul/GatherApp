import {create} from 'zustand'

const useEvents = create((set) => ({
    events: [],
    liked: [],
    setEvents: (x) => {
        set(() => ({
            events: x || []
        }))
    },
    setLikedEvents: (x) => {
        set((prevState) => ({
            liked: x
        }))
    }
}));

export default useEvents;
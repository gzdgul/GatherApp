import {create} from 'zustand'

const useSelectedEvent = create((set) => ({
    selectedEvent: null,
    setSelectedEvent: (x) => {
        set((state) => ({
            selectedEvent: x
        }))
    }
}));

export default useSelectedEvent;
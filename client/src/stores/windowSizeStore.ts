import { create } from 'zustand';

interface WindowSizeStore {
    width: number;
    height: number;
    updateSize: () => void;
}

const useWindowSizeStore = create<WindowSizeStore>((set) => {
    const updateSize = () => {
        set({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return {
        width: window.innerWidth,
        height: window.innerHeight,
        updateSize,
    };
});

export default useWindowSizeStore;

// Författare: Chatgpt
// En store som kollar hur stor viewport är.

import { useEffect, useState } from 'react';
const useSize = () => {
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const windowSizeHandler = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', windowSizeHandler);
        return () => {
            window.removeEventListener('resize', windowSizeHandler);
        };
    }, []);

    return {
        windowWidth: windowSize[0],
        windowHeight: windowSize[1],
    };
};

export default useSize;

// https://dev.to/payalsasmal/custom-hook-to-get-windows-width-and-height-in-react-dynamically-4b4l

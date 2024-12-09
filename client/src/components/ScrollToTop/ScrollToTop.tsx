import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;

/*
 * Författare: Magnus
 * Skapat komponent som scrollar upp dig till toppen av sidan varje gång du byter url
 */

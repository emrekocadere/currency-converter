import { useMediaQuery } from 'react-responsive';

export default function useResponsive() {
    
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

    const isTablet = useMediaQuery({ query: '(min-width: 481px) and (max-width: 1024px)' });

    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });

    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    return {
        isMobile,
        isTablet,
        isDesktop,
        isBigScreen,
        isPortrait,
        isRetina,
    };
}

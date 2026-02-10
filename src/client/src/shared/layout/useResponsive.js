import { useMediaQuery } from 'react-responsive';

export function useResponsive() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1500px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1920px) and (min-height: 720px) and (max-height: 1080px)' });
    const isBigScreen = useMediaQuery({ query: '(min-width: 1921px)' });
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

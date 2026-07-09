"use client";

import { useEffect, useState } from 'react';

/**
 * Hook para detectar si el usuario prefiere animaciones reducidas
 * Útil para accesibilidad y performance en dispositivos lentos
 *
 * @returns {boolean} true si el usuario prefiere movimiento reducido
 *
 * @example
 * const shouldReduce = useReducedMotion();
 *
 * <motion.div
 *   animate={shouldReduce ? {} : { y: [0, -10, 0] }}
 *   transition={{ duration: shouldReduce ? 0 : 2 }}
 * />
 */
export function useReducedMotion(): boolean {
    const [shouldReduce, setShouldReduce] = useState(false);

    useEffect(() => {
        // Verificar si la API está disponible
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setShouldReduce(mediaQuery.matches);

        // Escuchar cambios en la preferencia
        const onChange = (event: MediaQueryListEvent) => {
            setShouldReduce(event.matches);
        };

        // Agregar listener
        mediaQuery.addEventListener('change', onChange);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', onChange);
        };
    }, []);

    return shouldReduce;
}

/**
 * Hook para detectar el tamaño de pantalla (mobile/tablet/desktop)
 * Útil para optimizar animaciones por dispositivo
 *
 * @returns {object} { isMobile, isTablet, isDesktop }
 *
 * @example
 * const { isMobile } = useMediaQuery();
 * const particleCount = isMobile ? 5 : 20;
 */
export function useMediaQuery() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isMobile: windowSize.width < 768,
        isTablet: windowSize.width >= 768 && windowSize.width < 1024,
        isDesktop: windowSize.width >= 1024,
        width: windowSize.width,
        height: windowSize.height,
    };
}

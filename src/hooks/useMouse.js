import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Global mouse position hook with lerp smoothing
 * Provides smooth, interpolated cursor coordinates
 */
export const useMouse = (lerpFactor = 0.1) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    // Throttled mouse tracking
    const lastUpdate = useRef(0);
    const handleMouseMove = useCallback((e) => {
        const now = Date.now();
        if (now - lastUpdate.current < 16) return;
        lastUpdate.current = now;

        targetRef.current = { x: e.clientX, y: e.clientY };
        setPosition({ x: e.clientX, y: e.clientY });
    }, []);

    // Lerp animation loop
    useEffect(() => {
        const animate = () => {
            const target = targetRef.current;
            const current = currentRef.current;

            // Linear interpolation
            current.x += (target.x - current.x) * lerpFactor;
            current.y += (target.y - current.y) * lerpFactor;

            setSmoothPosition({ x: current.x, y: current.y });
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [lerpFactor]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return {
        position,        // Raw position
        smoothPosition,  // Lerp-smoothed position
        normalized: {
            x: smoothPosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1),
            y: smoothPosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1),
        },
    };
};

export default useMouse;

import { useMemo, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Magnetic pull effect hook.
 * Usage: const magnetic = useMagnetic(ref)
 */
export const useMagnetic = (ref, options = {}) => {
    const {
        maxOffset = 10,
        radius = 140,
        strength = 0.22,
        springBackDuration = 320,
    } = options;

    const prefersReducedMotion = useReducedMotion();
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    const handleMouseMove = useCallback((event) => {
        if (prefersReducedMotion || !ref?.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > radius) {
            setOffset({ x: 0, y: 0 });
            return;
        }

        const pull = (radius - distance) / radius;
        const nextX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * strength * pull));
        const nextY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * strength * pull));

        setOffset({ x: nextX, y: nextY });
    }, [maxOffset, prefersReducedMotion, radius, ref, strength]);

    const handleMouseEnter = useCallback(() => {
        if (prefersReducedMotion) return;
        setIsActive(true);
    }, [prefersReducedMotion]);

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
        setIsActive(false);
    }, []);

    const style = useMemo(() => {
        if (prefersReducedMotion) return undefined;

        return {
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            transition: isActive
                ? 'transform 100ms ease-out'
                : `transform ${springBackDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            willChange: 'transform',
        };
    }, [isActive, offset.x, offset.y, prefersReducedMotion, springBackDuration]);

    return {
        style,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
    };
};

export default useMagnetic;

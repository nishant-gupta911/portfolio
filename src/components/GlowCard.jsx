import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Card with animated glow border on hover
 * Uses pseudo-element technique for performance
 */
const GlowCard = ({
    children,
    className = '',
    glowColor = 'accent-purple',
    borderRadius = 'rounded-2xl',
    ...props
}) => {
    const ref = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const handleMouseMove = (e) => {
        if (prefersReducedMotion || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative ${borderRadius} ${className}`}
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            {...props}
        >
            {/* Glow effect that follows mouse */}
            {!prefersReducedMotion && (
                <motion.div
                    className={`absolute inset-0 ${borderRadius} pointer-events-none`}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: isHovered
                            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 124, 255, 0.15), transparent 40%)`
                            : 'transparent',
                    }}
                />
            )}

            {/* Border glow */}
            <motion.div
                className={`absolute inset-0 ${borderRadius} pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    border: '1px solid rgba(124, 124, 255, 0.3)',
                    boxShadow: isHovered
                        ? '0 0 20px rgba(124, 124, 255, 0.2), inset 0 0 20px rgba(124, 124, 255, 0.05)'
                        : 'none',
                }}
            />

            {/* Card content */}
            <div className={`relative glass-card ${borderRadius} h-full`}>
                {children}
            </div>
        </motion.div>
    );
};

export default GlowCard;

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Magnetic button that moves toward cursor on hover
 * Uses spring physics for smooth natural movement
 */
const MagneticButton = ({
    children,
    className = '',
    href,
    onClick,
    type = 'button',
    magnetStrength = 0.3,
    glowOnHover = true,
    ...props
}) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Spring animation for smooth magnetic effect
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });
    const scale = useSpring(1, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        if (prefersReducedMotion || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * magnetStrength;
        const deltaY = (e.clientY - centerY) * magnetStrength;

        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!prefersReducedMotion) {
            scale.set(1.03);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
        scale.set(1);
    };

    const baseClasses = `
    relative overflow-hidden
    px-8 py-3 rounded-full font-medium
    transition-colors duration-300
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-purple
    ${className}
  `;

    const Component = href ? motion.a : motion.button;
    const componentProps = href ? { href } : { type, onClick };

    return (
        <Component
            ref={ref}
            {...componentProps}
            {...props}
            style={{ x, y, scale }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={baseClasses}
        >
            {/* Glow layer */}
            {glowOnHover && (
                <motion.span
                    className="absolute inset-0 rounded-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        boxShadow: isHovered
                            ? '0 0 30px rgba(124, 124, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2)'
                            : '0 0 0px transparent',
                    }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* Ripple effect on click */}
            <span className="relative z-10">{children}</span>
        </Component>
    );
};

export default MagneticButton;

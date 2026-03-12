import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Wrapper component for scroll-triggered section reveal
 * Subtle fade + translateY animation
 */
const SectionReveal = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    distance = 20,
    duration = 0.6,
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-80px' });
    const prefersReducedMotion = useReducedMotion();

    // Direction-based initial position
    const getInitialY = () => {
        if (prefersReducedMotion) return 0;
        switch (direction) {
            case 'up': return distance;
            case 'down': return -distance;
            default: return distance;
        }
    };

    const variants = {
        hidden: {
            opacity: prefersReducedMotion ? 1 : 0,
            y: getInitialY(),
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : duration,
                delay: prefersReducedMotion ? 0 : delay,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default SectionReveal;

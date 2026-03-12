import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { useReducedMotion } from '../hooks/useReducedMotion';

const MagneticLink = ({ href, children }) => {
    const linkRef = useRef(null);
    const { style, handlers } = useMagnetic(linkRef, { maxOffset: 4, radius: 70, strength: 0.2 });
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.a
            ref={linkRef}
            href={href}
            style={prefersReducedMotion ? undefined : style}
            {...handlers}
            className="relative text-text-muted hover:text-text-main transition-colors duration-300 text-[13px] tracking-wide uppercase font-medium py-2 group"
        >
            {children}
            <motion.span
                className="absolute bottom-0 left-0 h-px bg-accent-purple origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ width: '100%' }}
            />
        </motion.a>
    );
};

export default MagneticLink;

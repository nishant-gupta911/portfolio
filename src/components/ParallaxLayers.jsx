import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * 3-layer depth parallax background that responds to mouse movement
 * Far: gradient mesh, Mid: particle dots, Near: glow blobs
 */
const ParallaxLayers = () => {
    const containerRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

    // Throttled mouse tracking
    const lastUpdate = useRef(0);
    const handleMouseMove = useCallback((e) => {
        const now = Date.now();
        if (now - lastUpdate.current < 16) return; // ~60fps throttle
        lastUpdate.current = now;

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        setMousePosition({ x, y });
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [prefersReducedMotion, handleMouseMove]);

    // Spring values for smooth movement
    const springConfig = { stiffness: 50, damping: 30 };
    const mouseX = useSpring(mousePosition.x, springConfig);
    const mouseY = useSpring(mousePosition.y, springConfig);

    // Layer transforms at different intensities
    const farX = useTransform(mouseX, [0, 1], [-10, 10]);
    const farY = useTransform(mouseY, [0, 1], [-10, 10]);
    const midX = useTransform(mouseX, [0, 1], [-20, 20]);
    const midY = useTransform(mouseY, [0, 1], [-20, 20]);
    const nearX = useTransform(mouseX, [0, 1], [-40, 40]);
    const nearY = useTransform(mouseY, [0, 1], [-40, 40]);

    // Update spring values when mouse moves
    useEffect(() => {
        mouseX.set(mousePosition.x);
        mouseY.set(mousePosition.y);
    }, [mousePosition, mouseX, mouseY]);

    if (prefersReducedMotion) {
        return (
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 via-dark to-accent-cyan/10" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden -z-10">
            {/* Far layer: Gradient mesh */}
            <motion.div
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ x: farX, y: farY }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/15 via-transparent to-accent-cyan/10" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px]" />
            </motion.div>

            {/* Mid layer: Subtle dot grid */}
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%]"
                style={{ x: midX, y: midY }}
            >
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(rgba(124, 124, 255, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </motion.div>

            {/* Near layer: Glow blobs */}
            <motion.div
                className="absolute inset-0"
                style={{ x: nearX, y: nearY }}
            >
                <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-accent-purple/20 rounded-full blur-[60px] animate-float" />
                <div
                    className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent-cyan/15 rounded-full blur-[80px] animate-float"
                    style={{ animationDelay: '2s' }}
                />
                <div
                    className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent-purple/25 rounded-full blur-[50px] animate-float"
                    style={{ animationDelay: '4s' }}
                />
            </motion.div>
        </div>
    );
};

export default ParallaxLayers;

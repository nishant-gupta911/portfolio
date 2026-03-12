import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Interactive particle field with lerp-smoothed cursor response
 * Particles have velocity easing, color shift, and idle drift
 */
const ParticleField = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const smoothMouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const timeRef = useRef(0);
    const prefersReducedMotion = useReducedMotion();

    const handleMouseMove = useCallback((e) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -1000, y: -1000 };
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            const density = Math.floor((width * height) / 12000);
            const count = Math.min(density, 150);
            particlesRef.current = [];

            for (let i = 0; i < count; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particlesRef.current.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.4 + 0.1,
                    hue: 240 + Math.random() * 40, // Purple-blue range
                    driftSpeed: Math.random() * 0.0005 + 0.0002,
                    driftOffset: Math.random() * Math.PI * 2,
                });
            }
        };

        const animate = () => {
            timeRef.current += 0.016;
            ctx.clearRect(0, 0, width, height);

            // Lerp smooth mouse position (0.08 factor for smooth following)
            smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
            smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

            const mouse = smoothMouseRef.current;
            const particles = particlesRef.current;
            const interactionRadius = 120;
            const time = timeRef.current;

            particles.forEach((p) => {
                // Idle parallax drift
                const driftX = Math.sin(time * p.driftSpeed * 100 + p.driftOffset) * 20;
                const driftY = Math.cos(time * p.driftSpeed * 80 + p.driftOffset) * 15;
                const targetX = p.baseX + driftX;
                const targetY = p.baseY + driftY;

                // Cursor displacement
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < interactionRadius && mouse.x > 0) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    const angle = Math.atan2(dy, dx);
                    // Velocity-based displacement with easing
                    p.vx -= Math.cos(angle) * force * 2;
                    p.vy -= Math.sin(angle) * force * 2;
                }

                // Apply velocity with friction
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.92;
                p.vy *= 0.92;

                // Return to target with easing
                p.x += (targetX - p.x) * 0.03;
                p.y += (targetY - p.y) * 0.03;

                // Color shift based on cursor proximity
                let hue = p.hue;
                if (distance < interactionRadius * 2 && mouse.x > 0) {
                    const shift = ((interactionRadius * 2 - distance) / (interactionRadius * 2)) * 40;
                    hue = p.hue + shift; // Shift toward cyan
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${p.opacity})`;
                ctx.fill();

                // Subtle glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${p.opacity * 0.15})`;
                ctx.fill();
            });

            // Cursor glow halo
            if (mouse.x > 0 && mouse.y > 0) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 200
                );
                gradient.addColorStop(0, 'rgba(124, 124, 255, 0.08)');
                gradient.addColorStop(0.4, 'rgba(0, 229, 255, 0.03)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [prefersReducedMotion, handleMouseMove, handleMouseLeave]);

    if (prefersReducedMotion) {
        return (
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-dark" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px]" />
            </div>
        );
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10 pointer-events-none"
                aria-hidden="true"
            />
            {/* Static gradient underlays */}
            <div className="fixed inset-0 -z-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-accent-purple/8 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px]" />
            </div>
        </>
    );
};

export default ParticleField;

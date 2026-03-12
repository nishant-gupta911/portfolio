import { useEffect, useRef, useCallback } from 'react';

const CursorField = () => {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);
    const particlesRef = useRef([]);
    const pointerRef = useRef({ x: -2000, y: -2000 });
    const smoothPointerRef = useRef({ x: -2000, y: -2000 });
    const reducedMotionRef = useRef(false);
    const pointerTickingRef = useRef(false);

    const setPointerPosition = useCallback((x, y) => {
        pointerRef.current.x = x;
        pointerRef.current.y = y;
    }, []);

    const handleMouseMove = useCallback((event) => {
        if (pointerTickingRef.current) return;

        pointerTickingRef.current = true;
        requestAnimationFrame(() => {
            setPointerPosition(event.clientX, event.clientY);
            pointerTickingRef.current = false;
        });
    }, [setPointerPosition]);

    const handleMouseLeave = useCallback(() => {
        setPointerPosition(-2000, -2000);
    }, [setPointerPosition]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotionRef.current = media.matches;

        const onChange = (event) => {
            reducedMotionRef.current = event.matches;
        };

        media.addEventListener('change', onChange);

        return () => {
            media.removeEventListener('change', onChange);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d', { alpha: true });
        let width = 0;
        let height = 0;
        let dpr = 1;

        const initParticles = () => {
            const area = width * height;
            const targetCount = Math.max(80, Math.min(220, Math.floor(area / 9000)));
            const next = [];

            for (let i = 0; i < targetCount; i += 1) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const angle = (Math.PI * 2 * i) / targetCount;
                const radial = Math.sqrt(Math.random());
                next.push({
                    baseX: x,
                    baseY: y,
                    x,
                    y,
                    vx: 0,
                    vy: 0,
                    size: 0.7 + Math.random() * 1.6,
                    alpha: 0.18 + Math.random() * 0.38,
                    angle,
                    radial,
                });
            }

            particlesRef.current = next;
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = window.devicePixelRatio || 1;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            initParticles();
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const pointer = pointerRef.current;
            const smoothPointer = smoothPointerRef.current;

            if (!reducedMotionRef.current) {
                smoothPointer.x += (pointer.x - smoothPointer.x) * 0.12;
                smoothPointer.y += (pointer.y - smoothPointer.y) * 0.12;
            }

            const hasPointer = smoothPointer.x > -1000 && smoothPointer.y > -1000;
            const ovalX = 120;
            const ovalY = 88;

            for (let i = 0; i < particlesRef.current.length; i += 1) {
                const particle = particlesRef.current[i];

                if (!reducedMotionRef.current) {
                    if (hasPointer) {
                        const targetX = smoothPointer.x + Math.cos(particle.angle) * ovalX * particle.radial;
                        const targetY = smoothPointer.y + Math.sin(particle.angle) * ovalY * particle.radial;
                        particle.vx += (targetX - particle.x) * 0.06;
                        particle.vy += (targetY - particle.y) * 0.06;
                    } else {
                        particle.vx += (particle.baseX - particle.x) * 0.04;
                        particle.vy += (particle.baseY - particle.y) * 0.04;
                    }

                    particle.vx *= 0.92;
                    particle.vy *= 0.92;
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 124, 255, ${particle.alpha})`;
                ctx.fill();
            }

            if (!reducedMotionRef.current && hasPointer) {
                const gradient = ctx.createRadialGradient(
                    smoothPointer.x,
                    smoothPointer.y,
                    0,
                    smoothPointer.x,
                    smoothPointer.y,
                    140
                );
                gradient.addColorStop(0, 'rgba(124, 124, 255, 0.12)');
                gradient.addColorStop(0.55, 'rgba(0, 229, 255, 0.04)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }
        };

        const loop = () => {
            draw();
            rafRef.current = requestAnimationFrame(loop);
        };

        resize();

        if (reducedMotionRef.current) {
            draw();
        } else {
            rafRef.current = requestAnimationFrame(loop);
        }

        window.addEventListener('resize', resize, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleMouseLeave, handleMouseMove]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0">
                <div className="absolute -top-24 left-[12%] h-[42vw] w-[42vw] rounded-full bg-accent-purple/10 blur-[160px]" />
                <div className="absolute -bottom-28 right-[10%] h-[32vw] w-[32vw] rounded-full bg-accent-cyan/10 blur-[140px]" />
            </div>
        </div>
    );
};

export default CursorField;

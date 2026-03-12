import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const pushArcPoints = (points, cx, cy, radius, start, end, count) => {
    for (let i = 0; i < count; i += 1) {
        const t = count === 1 ? 0 : i / (count - 1);
        const angle = start + (end - start) * t;
        points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
    }
};

const buildDeveloperShape = (w, h) => {
    const points = [];
    const cx = w * 0.5;
    const cy = h * 0.5;
    const rx = Math.min(w * 0.33, 185);
    const ry = Math.min(h * 0.29, 150);
    const r = Math.min(w * 0.14, 74);

    pushArcPoints(points, cx - rx, cy - ry, r, Math.PI * 0.95, Math.PI * 1.55, 72);
    pushArcPoints(points, cx + rx, cy - ry, r, Math.PI * 1.45, Math.PI * 2.05, 72);
    pushArcPoints(points, cx - rx, cy + ry, r, Math.PI * 0.45, Math.PI * 1.05, 72);
    pushArcPoints(points, cx + rx, cy + ry, r, Math.PI * -0.05, Math.PI * 0.55, 72);

    return points;
};

const buildBuilderShape = (w, h) => {
    const points = [];
    const cx = w * 0.5;
    const cy = h * 0.5;
    const circles = [
        { x: cx, y: cy - 138, r: 64, n: 72 },
        { x: cx - 130, y: cy - 24, r: 72, n: 80 },
        { x: cx + 130, y: cy - 24, r: 72, n: 80 },
        { x: cx - 130, y: cy + 132, r: 72, n: 80 },
        { x: cx + 130, y: cy + 132, r: 72, n: 80 },
    ];

    for (let i = 0; i < circles.length; i += 1) {
        const c = circles[i];
        pushArcPoints(points, c.x, c.y, c.r, 0, Math.PI * 2, c.n);
    }

    return points;
};

const InteractiveAtomShape = ({ variant = 'developer' }) => {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);
    const particlesRef = useRef([]);
    const targetsRef = useRef([]);
    const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
    const rafRef = useRef(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return undefined;

        const ctx = canvas.getContext('2d', { alpha: true });
        let width = 0;
        let height = 0;

        const rebuild = () => {
            width = wrap.clientWidth;
            height = wrap.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            const base = variant === 'developer' ? buildDeveloperShape(width, height) : buildBuilderShape(width, height);
            targetsRef.current = base;

            const dense = [];
            for (let i = 0; i < base.length; i += 1) {
                dense.push(base[i]);
                if (i % 2 === 0) dense.push(base[i]);
            }

            particlesRef.current = dense.map((p) => ({
                x: p.x + (Math.random() - 0.5) * 10,
                y: p.y + (Math.random() - 0.5) * 10,
                tx: p.x,
                ty: p.y,
                vx: 0,
                vy: 0,
                a: 0.72 + Math.random() * 0.24,
            }));
        };

        const onMove = (event) => {
            const rect = wrap.getBoundingClientRect();
            const inside = event.clientX >= rect.left && event.clientX <= rect.right
                && event.clientY >= rect.top && event.clientY <= rect.bottom;

            mouseRef.current.inside = inside;
            if (inside) {
                mouseRef.current.x = event.clientX - rect.left;
                mouseRef.current.y = event.clientY - rect.top;
            }
        };

        const onLeave = () => {
            mouseRef.current.inside = false;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particlesRef.current.length; i += 1) {
                const p = particlesRef.current[i];

                p.vx += (p.tx - p.x) * 0.08;
                p.vy += (p.ty - p.y) * 0.08;

                if (!prefersReducedMotion && mouseRef.current.inside) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.hypot(dx, dy) || 1;
                    const radius = 110;
                    if (dist < radius) {
                        const force = (radius - dist) / radius;
                        p.vx += (dx / dist) * force * 0.6;
                        p.vy += (dy / dist) * force * 0.6;
                    }
                }

                p.vx *= 0.86;
                p.vy *= 0.86;
                p.x += p.vx;
                p.y += p.vy;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.75, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(47, 109, 255, ${p.a})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rebuild();
        rafRef.current = requestAnimationFrame(draw);

        window.addEventListener('resize', rebuild, { passive: true });
        window.addEventListener('mousemove', onMove, { passive: true });
        wrap.addEventListener('mouseleave', onLeave, { passive: true });

        return () => {
            window.removeEventListener('resize', rebuild);
            window.removeEventListener('mousemove', onMove);
            wrap.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, [prefersReducedMotion, variant]);

    return (
        <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    );
};

export default InteractiveAtomShape;

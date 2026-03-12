import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { useReducedMotion } from '../hooks/useReducedMotion';
import InteractiveAtomShape from './InteractiveAtomShape';

const RoleSplitSection = () => {
    const prefersReducedMotion = useReducedMotion();

    const dsRef = useRef(null);
    const devRef = useRef(null);

    const dsMagnetic = useMagnetic(dsRef, { maxOffset: 8, radius: 120, strength: 0.2 });
    const devMagnetic = useMagnetic(devRef, { maxOffset: 8, radius: 120, strength: 0.2 });

    return (
        <section className="relative overflow-hidden py-[120px] md:py-[150px]">
            <div
                className="pointer-events-none absolute inset-0 opacity-55"
                style={{
                    backgroundImage: 'radial-gradient(rgba(150,160,180,0.42) 1px, transparent 1px)',
                    backgroundSize: '26px 26px',
                }}
            />

            <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-12">
                <RoleColumn
                    badge="Available now"
                    title="For data science"
                    subtitle="Build intelligent systems end to end"
                    button="Explore data work"
                    href="#work"
                    magneticRef={dsRef}
                    magnetic={dsMagnetic}
                    prefersReducedMotion={prefersReducedMotion}
                    left
                />

                <RoleColumn
                    badge="Available now"
                    title="For web/app development"
                    subtitle="Ship high-performance product experiences"
                    button="Explore dev work"
                    href="#capabilities"
                    magneticRef={devRef}
                    magnetic={devMagnetic}
                    prefersReducedMotion={prefersReducedMotion}
                />
            </div>
        </section>
    );
};

const RoleColumn = ({
    badge,
    title,
    subtitle,
    button,
    href,
    magneticRef,
    magnetic,
    prefersReducedMotion,
    left = false,
}) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[420px] items-center justify-center"
        >
            <InteractiveAtomShape variant={left ? 'developer' : 'builder'} />

            <div className="relative z-10 text-center">
                <span className="mb-4 inline-block rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-text-muted">
                    {badge}
                </span>
                <h3 className="text-[clamp(2rem,4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-text-main">
                    {title}
                </h3>
                <p className="mx-auto mt-2 max-w-[18ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-text-muted">
                    {subtitle}
                </p>

                <a
                    ref={magneticRef}
                    href={href}
                    style={prefersReducedMotion ? undefined : magnetic.style}
                    {...magnetic.handlers}
                    className="mt-10 inline-flex items-center justify-center rounded-full bg-text-main px-8 py-3 text-xl font-medium text-dark transition-colors hover:bg-white"
                >
                    {button}
                </a>
            </div>
        </motion.article>
    );
};

export default RoleSplitSection;

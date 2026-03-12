import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import { useReducedMotion } from '../hooks/useReducedMotion';

const EditorialHero = () => {
    const prefersReducedMotion = useReducedMotion();
    const ctaRef = useRef(null);
    const { style: ctaStyle, handlers: ctaHandlers } = useMagnetic(ctaRef, { maxOffset: 6, radius: 100, strength: 0.2 });

    const lineVariants = {
        hidden: {
            opacity: 0,
            filter: 'blur(8px)',
            y: 20,
        },
        visible: (delay) => ({
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : delay,
                ease: [0.25, 0.1, 0.25, 1],
            },
        }),
    };

    const caretVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delay: 1.8, duration: 0.3 },
        },
        blink: {
            opacity: [1, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 2.2,
            },
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-20"
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
                    <div className="absolute inset-0 bg-accent-purple/10 rounded-full blur-[150px] mix-blend-screen" />
                    <div className="absolute inset-0 translate-x-20 bg-accent-cyan/8 rounded-full blur-[120px] mix-blend-screen" />
                </div>
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-text-muted text-[13px] tracking-[0.2em] uppercase mb-8"
                >
                    AI/ML Engineer
                </motion.p>

                <h1
                    className="font-semibold leading-[1.05] tracking-[-0.03em] mb-8"
                    style={{ fontSize: 'clamp(40px, 8vw, 84px)' }}
                    aria-label="Building intelligent systems that transform complex data into actionable insight"
                >
                    <motion.span className="block" custom={0.4} initial="hidden" animate="visible" variants={lineVariants}>
                        <span className="text-text-main">Building intelligent</span>
                    </motion.span>
                    <motion.span className="block" custom={0.6} initial="hidden" animate="visible" variants={lineVariants}>
                        <span className="text-text-main">systems that </span>
                        <span className="text-accent-purple">transform</span>
                    </motion.span>
                    <motion.span className="block relative inline-flex items-baseline" custom={0.8} initial="hidden" animate="visible" variants={lineVariants}>
                        <span className="text-text-main">complex data</span>
                        <motion.span
                            className="inline-block w-[3px] h-[0.85em] bg-accent-cyan ml-2"
                            initial="hidden"
                            animate={['visible', 'blink']}
                            variants={caretVariants}
                            aria-hidden="true"
                        />
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-text-muted text-lg md:text-xl max-w-[48ch] mx-auto leading-relaxed mb-12"
                >
                    Crafting machine learning solutions and full-stack applications
                    that bridge the gap between research and production.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.a
                        ref={ctaRef}
                        href="#work"
                        style={prefersReducedMotion ? undefined : ctaStyle}
                        {...ctaHandlers}
                        className="group relative px-8 py-4 bg-accent-purple text-white font-medium rounded-full overflow-hidden"
                    >
                        <span className="relative z-10">View selected work</span>
                        <span className="absolute inset-0 bg-accent-purple opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                    </motion.a>

                    <a
                        href="#contact"
                        className="px-8 py-4 text-text-muted hover:text-text-main transition-colors font-medium"
                    >
                        Schedule a call →
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default EditorialHero;

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Database, Code2, Smartphone, Wrench } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GlowingEffect } from './ui/glowing-effect';
import skills from '../data/skills';

const iconMap = {
    languages: Code2,
    mlAi: Brain,
    dataScience: Database,
    databases: Database,
    frontend: Code2,
    backend: Code2,
    mobile: Smartphone,
    tools: Wrench,
};

const CapabilitySection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const prefersReducedMotion = useReducedMotion();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    const skillEntries = Object.entries(skills);

    return (
        <section id="capabilities" className="py-30 md:py-40 relative bg-black">
            {/* Subtle top gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-dark to-transparent pointer-events-none" />

            <div className="max-w-350 mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >
                    <p className="text-accent-purple text-[11px] tracking-[0.25em] uppercase mb-4 font-mono">
                        What I&apos;m Working On Right Now
                    </p>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/40">
                        Currently fine-tuning a model for women&apos;s health, focused on early detection and pattern recognition from clinical data. It&apos;s a sensitive space, so I&apos;m being careful with data handling, class imbalance, and making sure the model does not overfit on minority cases. Still early, but the direction feels clear.
                    </p>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/40">
                        Also improving Invincible by setting up a proper retrieval eval to check how often the right chunk lands in the top-4, and I&apos;m planning to deploy it publicly soon.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <p className="text-accent-purple text-[11px] tracking-[0.25em] uppercase mb-4 font-mono">
                        Technical Arsenal
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-main leading-[1.1] tracking-tight">
                        Skills &amp; Capabilities
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-white/40">
                        From ML pipelines to full-stack deployment — here is what I work with.
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {skillEntries.map(([key, category]) => {
                        const IconComponent = iconMap[key] || Code2;
                        return (
                            <motion.div
                                key={key}
                                variants={itemVariants}
                                className="group relative p-6 rounded-2xl border border-white/6 bg-white/2 hover:bg-white/5 hover:border-accent-purple/20 transition-all duration-500"
                            >
                                {/* Glowing border effect */}
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />

                                {/* Glow on hover */}
                                <div className="absolute -inset-px rounded-2xl bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                                            <IconComponent size={18} className="text-accent-purple" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {category.items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2.5 py-1 text-[11px] rounded-full border border-white/8 text-white/50 bg-white/2 hover:text-white/80 hover:border-white/15 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CapabilitySection;

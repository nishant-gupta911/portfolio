import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GlowingEffect } from './ui/glowing-effect';
import { Tilt } from './ui/tilt';
import { Spotlight } from './ui/spotlight';
import projects from '../data/projects';

const ProjectShowcase = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

    return (
        <section id="work" className="relative py-30 md:py-40 bg-[#050810]">
            {/* Section background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />
            </div>

            <div className="relative mx-auto w-full max-w-350 px-6 lg:px-12" ref={sectionRef}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 text-center"
                >
                    <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-accent-purple font-mono">
                        Selected Projects
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">
                        What I&apos;ve Built
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-white/40">
                        End-to-end ML solutions and full-stack applications — from data pipelines to deployed products.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} index={index} project={project} inView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, index, inView }) => {
    const prefersReducedMotion = useReducedMotion();
    const [hovered, setHovered] = useState(false);

    // Gradient colors for each card
    const gradientColors = [
        'from-accent-purple/20 via-transparent to-accent-cyan/10',
        'from-blue-500/15 via-transparent to-purple-500/10',
        'from-emerald-500/15 via-transparent to-blue-500/10',
        'from-amber-500/15 via-transparent to-rose-500/10',
        'from-rose-500/15 via-transparent to-orange-500/10',
        'from-cyan-500/15 via-transparent to-violet-500/10',
        'from-green-500/15 via-transparent to-emerald-500/10',
    ];

    return (
        <Tilt
            rotationFactor={6}
            isRevese
            style={{ transformOrigin: 'center center' }}
            springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
            className="rounded-2xl"
        >
        <motion.article
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative rounded-2xl border border-white/6 bg-white/2 hover:border-white/12 overflow-hidden transition-all duration-500"
        >
            {/* Spotlight shine effect */}
            <Spotlight
                className="z-10 from-white/50 via-white/20 to-white/5 blur-2xl"
                size={300}
                springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
            />
            {/* Glowing Effect */}
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
            />

            {/* Card gradient bg */}
            <div className={`absolute inset-0 bg-linear-to-br ${gradientColors[index % gradientColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="relative p-8 md:p-10 flex flex-col h-full min-h-85">
                {/* Top row: context tag + year */}
                <div className="flex items-center justify-between mb-6">
                    <span className="py-1 px-3 rounded-full border border-white/10 bg-white/3 text-white/40 text-[10px] uppercase tracking-[0.18em] font-mono">
                        {project.context || `Project ${String(index + 1).padStart(2, '0')}`}
                    </span>
                    {project.year && (
                        <span className="text-[11px] font-mono text-white/25">{project.year}</span>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight mb-2 group-hover:text-accent-purple transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-sm text-accent-cyan/70 mb-4">{project.subtitle}</p>
                    <p className="leading-relaxed text-sm mb-6 max-w-prose text-white/40">
                        {project.description}
                    </p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-2.5 py-1 text-[10px] rounded-full border font-mono border-white/8 text-white/40 bg-white/2"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium transition-colors text-white/50 hover:text-white"
                    >
                        <Github size={14} />
                        Source
                    </a>
                    {project.demo && project.demo !== '#' && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium transition-colors text-white/50 hover:text-accent-cyan"
                        >
                            <ExternalLink size={14} />
                            Demo
                        </a>
                    )}
                </div>

                {/* Hover arrow */}
                <motion.div
                    className="absolute top-8 right-8"
                    animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -5, y: hovered ? 0 : 5 }}
                    transition={{ duration: 0.25 }}
                >
                    <ArrowUpRight size={20} className="text-white/30" />
                </motion.div>
            </div>
        </motion.article>
        </Tilt>
    );
};

export default ProjectShowcase;

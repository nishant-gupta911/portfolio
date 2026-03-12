import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import projects from '../data/projects';
import GlowCard from './GlowCard';
import SectionReveal from './SectionReveal';

/**
 * Projects section with interactive glow cards
 */
const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="projects" className="py-20 md:py-32 relative">
            <div className="section-container">
                <SectionReveal>
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto rounded-full" />
                        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
                            A selection of projects showcasing my experience in AI/ML, full-stack development, and data science
                        </p>
                    </div>
                </SectionReveal>

                {/* Project cards grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {projects.map((project, index) => (
                        <motion.div key={project.id} variants={cardVariants}>
                            <GlowCard className="h-full">
                                <article className="p-6 md:p-8">
                                    {/* Header with featured badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-text-main group-hover:text-accent-purple transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-text-muted text-sm">{project.subtitle}</p>
                                        </div>
                                        {project.featured && (
                                            <span className="px-2 py-1 text-xs bg-accent-purple/20 text-accent-purple rounded-full">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-text-muted mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 text-xs bg-dark text-text-muted rounded-md border border-glass-border hover:border-accent-purple/50 hover:text-accent-purple transition-all duration-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-text-muted hover:text-accent-purple transition-colors"
                                            aria-label={`View ${project.title} on GitHub`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <span className="text-sm">Code</span>
                                        </a>
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-text-muted hover:text-accent-cyan transition-colors"
                                            aria-label={`View ${project.title} demo`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span className="text-sm">Demo</span>
                                        </a>
                                    </div>
                                </article>
                            </GlowCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;

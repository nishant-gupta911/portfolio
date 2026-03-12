import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import skills from '../data/skills';
import SectionReveal from './SectionReveal';

/**
 * Skills section with categorized badges and hover effects
 */
const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section id="skills" className="py-20 md:py-32 relative">
            {/* Subtle background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-light/30 to-transparent pointer-events-none" />

            <div className="section-container relative">
                <SectionReveal>
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Technical <span className="gradient-text">Skills</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto rounded-full" />
                        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
                            A comprehensive toolkit built through hands-on projects and continuous learning
                        </p>
                    </div>
                </SectionReveal>

                {/* Skills grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {Object.entries(skills).map(([key, category]) => (
                        <motion.div
                            key={key}
                            variants={itemVariants}
                            className="glass-card p-6 hover:border-accent-purple/30 transition-all duration-300 group"
                        >
                            <h3 className="text-lg font-semibold text-text-main mb-4 group-hover:text-accent-purple transition-colors">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-3 py-1.5 bg-dark-card text-text-muted text-sm rounded-full border border-glass-border hover:border-accent-purple/50 hover:text-accent-purple transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

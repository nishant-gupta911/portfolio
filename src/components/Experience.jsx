import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionReveal from './SectionReveal';

/**
 * Education and Experience section with timeline layout
 */
const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const experiences = [
        {
            id: 1,
            type: 'education',
            title: 'B.Tech in Computer Science & Engineering',
            subtitle: 'Data Science Specialization',
            organization: 'Manipal University Jaipur',
            period: '2022 - Present',
            description: 'Pursuing a comprehensive curriculum covering machine learning, deep learning, data structures, algorithms, and software engineering. Active participant in hackathons and technical clubs.',
            highlights: ['Data Science', 'Machine Learning', 'Cloud Computing'],
        },
    ];

    return (
        <section id="experience" className="py-20 md:py-32 relative">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-light/30 to-transparent pointer-events-none" />

            <div className="section-container relative">
                <SectionReveal>
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Education & <span className="gradient-text">Experience</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto rounded-full" />
                    </div>
                </SectionReveal>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto" ref={ref}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative pl-8 pb-12 last:pb-0"
                        >
                            {/* Timeline line */}
                            <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-accent-purple to-transparent" />

                            {/* Timeline dot with glow */}
                            <motion.div
                                className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-accent-purple"
                                animate={{
                                    boxShadow: [
                                        '0 0 10px rgba(124, 124, 255, 0.5)',
                                        '0 0 20px rgba(124, 124, 255, 0.8)',
                                        '0 0 10px rgba(124, 124, 255, 0.5)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Card */}
                            <div className="glass-card p-6 md:p-8 hover:border-accent-purple/30 transition-colors duration-300 group">
                                {/* Type badge */}
                                <span className="inline-block px-3 py-1 text-xs bg-accent-cyan/10 text-accent-cyan rounded-full mb-4 capitalize">
                                    {exp.type}
                                </span>

                                {/* Header */}
                                <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-accent-purple transition-colors">
                                    {exp.title}
                                </h3>
                                <p className="text-accent-purple font-medium mb-1">
                                    {exp.subtitle}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 text-text-muted text-sm mb-4">
                                    <span>{exp.organization}</span>
                                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                                    <span>{exp.period}</span>
                                </div>

                                {/* Description */}
                                <p className="text-text-muted leading-relaxed mb-4">
                                    {exp.description}
                                </p>

                                {/* Highlights */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.highlights.map((highlight) => (
                                        <span
                                            key={highlight}
                                            className="px-2.5 py-1 text-xs bg-dark text-text-muted rounded-md border border-glass-border hover:border-accent-purple/50 transition-colors"
                                        >
                                            {highlight}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import certifications from '../data/certifications';
import SectionReveal from './SectionReveal';

/**
 * Certifications section with badge cards
 */
const Certifications = () => {
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
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <section id="certifications" className="py-20 md:py-32 relative">
            <div className="section-container">
                <SectionReveal>
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="gradient-text">Certifications</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto rounded-full" />
                        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
                            Continuous learning through industry-recognized certifications
                        </p>
                    </div>
                </SectionReveal>

                {/* Certification cards */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {certifications.map((cert) => (
                        <motion.a
                            key={cert.id}
                            href={cert.credential}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="glass-card p-5 flex items-start gap-4 hover:border-accent-purple/30 transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <span className="text-3xl flex-shrink-0">{cert.icon}</span>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-text-main group-hover:text-accent-purple transition-colors line-clamp-2">
                                    {cert.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 text-sm text-text-muted">
                                    <span>{cert.issuer}</span>
                                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                                    <span>{cert.date}</span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <svg
                                className="w-5 h-5 text-text-muted group-hover:text-accent-purple transition-colors flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;

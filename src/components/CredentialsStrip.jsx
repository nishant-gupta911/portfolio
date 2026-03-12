import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import certifications from '../data/certifications';

const CredentialsStrip = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const education = [
        {
            degree: 'B.Tech Computer Science & Engineering',
            specialization: 'Specialization: Data Science',
            institution: 'Manipal University Jaipur, Rajasthan',
            period: '2023 — 2027',
        },
        {
            degree: 'Class 12 (CBSE)',
            specialization: '',
            institution: 'ST Karen\'s High School',
            period: '2023',
        },
        {
            degree: 'Class 10 (CBSE)',
            specialization: '',
            institution: 'ST Karen\'s High School',
            period: '2021',
        },
    ];

    return (
        <section id="credentials" className="py-25 md:py-35 relative bg-black">
            {/* Top border glow */}
            <div className="absolute top-0 left-6 right-6 lg:left-12 lg:right-12 h-px bg-linear-to-r from-transparent via-accent-purple/30 to-transparent" />

            <div className="max-w-350 mx-auto px-6 lg:px-12" ref={ref}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <p className="text-accent-purple text-[11px] tracking-[0.25em] uppercase mb-4 font-mono">
                        Background
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-main tracking-tight">
                        Education &amp; Certifications
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-9 h-9 rounded-lg bg-accent-purple/10 flex items-center justify-center">
                                <GraduationCap size={18} className="text-accent-purple" />
                            </div>
                            <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider">Education</h3>
                        </div>

                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i} className="group p-5 rounded-xl border border-white/6 bg-white/2 hover:border-white/10 transition-all duration-300">
                                    <h4 className="text-lg font-medium text-text-main mb-1">
                                        {edu.degree}
                                    </h4>
                                    {edu.specialization && (
                                        <p className="text-accent-cyan/70 text-sm mb-1">
                                            {edu.specialization}
                                        </p>
                                    )}
                                    <p className="text-sm text-white/40">
                                        {edu.institution}
                                    </p>
                                    <p className="text-xs mt-2 font-mono text-white/20">
                                        {edu.period}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                                <Award size={18} className="text-accent-cyan" />
                            </div>
                            <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider">Certifications</h3>
                        </div>

                        <ul className="space-y-2">
                            {certifications.map((cert) => (
                                <li key={cert.id}>
                                    <a
                                        href={cert.credential}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-white/6 bg-white/2 hover:border-accent-purple/20 hover:bg-white/4 transition-all duration-300"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-text-main group-hover:text-accent-purple transition-colors truncate">
                                                {cert.title}
                                            </p>
                                            <p className="text-xs mt-0.5 text-white/30">
                                                {cert.issuer} · {cert.date}
                                            </p>
                                        </div>
                                        <ExternalLink size={14} className="transition-colors shrink-0 text-white/15 group-hover:text-accent-purple/50" />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-4 text-xs text-center text-white/20">
                            All certificates available on{' '}
                            <a href="https://www.linkedin.com/in/nishant-gupta-b20636255/" target="_blank" rel="noopener noreferrer" className="text-accent-purple/60 hover:text-accent-purple transition-colors underline underline-offset-2">
                                LinkedIn
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CredentialsStrip;

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionReveal from './SectionReveal';

/**
 * About section with professional summary
 */
const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="py-20 md:py-32 relative" ref={ref}>
            <div className="section-container">
                <SectionReveal>
                    {/* Section header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto rounded-full" />
                    </div>
                </SectionReveal>

                {/* Content */}
                <SectionReveal delay={0.2}>
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-card p-8 md:p-12 hover:border-accent-purple/20 transition-all duration-500">
                            <p className="text-text-main text-lg leading-relaxed mb-6">
                                I&apos;m a Computer Science student specializing in Data Science at Manipal University Jaipur,
                                with a deep passion for Artificial Intelligence and Machine Learning. My focus lies in
                                building end-to-end ML systems that bridge the gap between research and production.
                            </p>
                            <p className="text-text-muted text-lg leading-relaxed mb-6">
                                Over the past years, I&apos;ve developed expertise in deep learning, computer vision, and
                                natural language processing. I enjoy tackling complex problems—from predicting air quality
                                patterns to detecting anomalies in medical imaging.
                            </p>
                            <p className="text-text-muted text-lg leading-relaxed">
                                When I&apos;m not training models, you&apos;ll find me exploring new frameworks, contributing
                                to open-source projects, or writing about emerging trends in AI. I believe technology
                                should create meaningful impact, and that drives everything I build.
                            </p>

                            {/* Quick stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-glass-border">
                                {[
                                    { label: 'Projects', value: '10+' },
                                    { label: 'Certifications', value: '5+' },
                                    { label: 'Technologies', value: '20+' },
                                    { label: 'Coffee Cups', value: '∞' },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center group">
                                        <div className="text-2xl md:text-3xl font-bold gradient-text group-hover:animate-glow transition-all">
                                            {stat.value}
                                        </div>
                                        <div className="text-text-muted text-sm mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
};

export default About;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import LightningBg from './ui/lightning-bg';
import TypewriterText from './TypewriterText';
import { useReducedMotion } from '../hooks/useReducedMotion';

const HERO_HEADLINE = 'Building intelligent systems that transform data into decisions.';

const Hero = () => {
    const prefersReducedMotion = useReducedMotion();
    const [shouldType, setShouldType] = useState(false);
    const [typedCompleteState, setTypedCompleteState] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion) return undefined;
        const timer = window.setTimeout(() => setShouldType(true), 400);
        return () => window.clearTimeout(timer);
    }, [prefersReducedMotion]);

    const typedComplete = prefersReducedMotion ? true : typedCompleteState;

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
            {/* ===== Lightning WebGL Background ===== */}
            <div className="absolute inset-0 z-0">
                {/* Dark base overlay */}
                <div className="absolute inset-0 bg-black/50 z-[1]"></div>

                {/* Central lightning beam */}
                <div className="absolute inset-0">
                    <LightningBg
                        hue={260}
                        xOffset={0}
                        speed={1.6}
                        intensity={0.6}
                        size={2}
                    />
                </div>


            </div>

            {/* ===== Content Overlay ===== */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
                <div className="max-w-4xl w-full text-center space-y-8">
                    {/* Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-block"
                    >
                        <span className="py-1.5 px-4 border border-white/15 text-white/50 bg-white/3 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase backdrop-blur-sm">
                            AI / ML Engineer &amp; Web Developer
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text tracking-tighter leading-[0.95] bg-linear-to-b from-white via-white/90 to-white/30"
                    >
                        Nishant<br />Gupta
                    </motion.h1>

                    {/* Typewriter tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >
                        <p className="text-lg md:text-xl font-light leading-relaxed min-h-14 text-white/50" aria-label={HERO_HEADLINE}>
                            {prefersReducedMotion ? (
                                <span>{HERO_HEADLINE}</span>
                            ) : (
                                shouldType && (
                                    <TypewriterText
                                        text={HERO_HEADLINE}
                                        speed={30}
                                        onComplete={() => setTypedCompleteState(true)}
                                        showCaret
                                    />
                                )
                            )}
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: typedComplete ? 1 : 0, y: typedComplete ? 0 : 14 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="pt-4 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
                    >
                        <a
                            href="#work"
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 text-sm uppercase bg-white text-black"
                        >
                            <span>View Projects</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/3 text-white/80 hover:border-accent-purple/50 hover:text-white hover:bg-white/6 text-sm font-medium uppercase tracking-wide transition-all backdrop-blur-sm"
                        >
                            Get in Touch
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: typedComplete ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex items-center justify-center gap-6 pt-4 pointer-events-auto"
                    >
                        <a href="https://github.com/nishant-gupta911" target="_blank" rel="noopener noreferrer" className="transition-colors text-white/30 hover:text-white/80" aria-label="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/nishant-gupta-b20636255/" target="_blank" rel="noopener noreferrer" className="transition-colors text-white/30 hover:text-white/80" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:nishantgupta2999@gmail.com" className="transition-colors text-white/30 hover:text-white/80" aria-label="Email">
                            <Mail size={20} />
                        </a>
                    </motion.div>
                </div>
            </div>


        </section>
    );
};

export default Hero;

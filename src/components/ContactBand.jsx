import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ContactBand = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const prefersReducedMotion = useReducedMotion();

    return (
        <section id="contact" className="py-30 md:py-45 relative overflow-hidden bg-black">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 h-125 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] bg-accent-purple/8" />
            </div>

            <div className="max-w-350 mx-auto px-6 lg:px-12 relative" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <p className="text-accent-purple text-[11px] tracking-[0.25em] uppercase mb-4 font-mono">
                        Let&apos;s Connect
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-main leading-[1.04] tracking-tight mb-6">
                        Ready to build<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-purple to-accent-cyan">
                            something great?
                        </span>
                    </h2>
                    <p className="text-lg leading-relaxed mb-10 max-w-lg mx-auto text-white/40">
                        I&apos;m actively looking for opportunities in AI/ML engineering and full-stack development. Let&apos;s talk!
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center mb-12">
                        <a
                            href="mailto:nishantgupta2999@gmail.com"
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide transition-all hover:scale-105 active:scale-95 text-sm uppercase bg-white text-black"
                        >
                            <Mail size={16} />
                            <span>Get in Touch</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-6">
                        <SocialLink href="https://github.com/nishant-gupta911" icon={Github} label="GitHub" />
                        <SocialLink href="https://www.linkedin.com/in/nishant-gupta-b20636255/" icon={Linkedin} label="LinkedIn" />
                        <SocialLink href="mailto:nishantgupta2999@gmail.com" icon={Mail} label="Email" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-2"
        aria-label={label}
    >
        <div className="w-12 h-12 rounded-full border border-white/8 bg-white/3 group-hover:border-accent-purple/30 group-hover:bg-accent-purple/5 flex items-center justify-center transition-all duration-300">
            <Icon size={18} className="transition-colors text-white/40 group-hover:text-accent-purple" />
        </div>
        <span className="text-[10px] uppercase tracking-widest transition-colors text-white/20 group-hover:text-white/40">
            {label}
        </span>
    </a>
);

export default ContactBand;

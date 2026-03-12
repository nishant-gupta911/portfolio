import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';
import SectionReveal from './SectionReveal';

/**
 * Contact section with form and social links
 */
const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Email',
            value: 'nishantgupta2999@gmail.com',
            href: 'mailto:nishantgupta2999@gmail.com',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
            label: 'GitHub',
            value: 'github.com/nishant-gupta911',
            href: 'https://github.com/nishant-gupta911',
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            label: 'LinkedIn',
            value: 'linkedin.com/in/nishant-gupta-b20636255',
            href: 'https://www.linkedin.com/in/nishant-gupta-b20636255/',
        },
    ];

    return (
        <section id="contact" className="py-20 md:py-32 relative">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-light/30 to-transparent pointer-events-none" />

            <div className="section-container relative">
                <SectionReveal>
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Get In <span className="gradient-text">Touch</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto rounded-full" />
                        <p className="text-text-muted mt-6 max-w-2xl mx-auto">
                            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
                        </p>
                    </div>
                </SectionReveal>

                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold text-text-main mb-6">
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            {contactInfo.map((info) => (
                                <a
                                    key={info.label}
                                    href={info.href}
                                    target={info.href.startsWith('http') ? '_blank' : undefined}
                                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="flex items-center gap-4 p-4 glass-card hover:border-accent-purple/30 transition-all duration-300 group"
                                >
                                    <span className="text-accent-purple group-hover:scale-110 transition-transform">
                                        {info.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm text-text-muted">{info.label}</p>
                                        <p className="text-text-main group-hover:text-accent-purple transition-colors">
                                            {info.value}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-dark border border-glass-border rounded-lg text-text-main placeholder:text-text-muted focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-dark border border-glass-border rounded-lg text-text-main placeholder:text-text-muted focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 bg-dark border border-glass-border rounded-lg text-text-main placeholder:text-text-muted focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-colors resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        <MagneticButton
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </MagneticButton>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

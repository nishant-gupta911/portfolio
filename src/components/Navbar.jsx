import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { NavMenu, NavMenuItem, IconItem, HoveredLink } from './ui/navbar-menu';
import projects from '../data/projects';
import skills from '../data/skills';
import certifications from '../data/certifications';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [active, setActive] = useState(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const mobileLinks = [
        { href: '#work', label: 'Projects' },
        { href: '#capabilities', label: 'Skills' },
        { href: '#credentials', label: 'Credentials' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <motion.header
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-black/70 backdrop-blur-xl border-b border-white/6'
                    : 'bg-transparent'
            }`}
        >
            <nav className="max-w-350 mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="font-bold text-sm text-black">NG</span>
                        </div>
                        <span className="font-medium tracking-wide text-lg hidden sm:inline text-white">
                            Nishant<span className="text-accent-purple">.</span>
                        </span>
                    </a>

                    {/* Desktop Nav with hover dropdowns */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavMenu setActive={setActive}>
                            {/* Projects dropdown */}
                            <NavMenuItem setActive={setActive} active={active} item="Projects" href="#work">
                                <div className="grid grid-cols-2 gap-1 p-1">
                                    {projects.slice(0, 4).map((project) => (
                                        <HoveredLink
                                            key={project.id}
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {project.title}
                                        </HoveredLink>
                                    ))}
                                </div>
                            </NavMenuItem>

                            {/* Skills dropdown */}
                            <NavMenuItem setActive={setActive} active={active} item="Skills" href="#capabilities">
                                <div className="grid grid-cols-2 gap-1 p-1">
                                    {Object.values(skills).map((category) => (
                                        <HoveredLink key={category.title} href="#capabilities">
                                            {category.title}
                                        </HoveredLink>
                                    ))}
                                </div>
                            </NavMenuItem>

                            {/* Credentials dropdown */}
                            <NavMenuItem setActive={setActive} active={active} item="Credentials" href="#credentials">
                                <div className="flex flex-col gap-1 p-1">
                                    {certifications.map((cert) => (
                                        <HoveredLink
                                            key={cert.id}
                                            href={cert.credential}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {cert.title}
                                        </HoveredLink>
                                    ))}
                                </div>
                            </NavMenuItem>

                            {/* Contact dropdown */}
                            <NavMenuItem setActive={setActive} active={active} item="Contact" href="#contact">
                                <div className="flex flex-col gap-1 p-1">
                                    <IconItem
                                        title="Email"
                                        description="nishantgupta2999@gmail.com"
                                        href="mailto:nishantgupta2999@gmail.com"
                                        icon={Mail}
                                    />
                                    <IconItem
                                        title="GitHub"
                                        description="nishant-gupta911"
                                        href="https://github.com/nishant-gupta911"
                                        icon={Github}
                                        external
                                    />
                                    <IconItem
                                        title="LinkedIn"
                                        description="nishant-gupta-b20636255"
                                        href="https://www.linkedin.com/in/nishant-gupta-b20636255/"
                                        icon={Linkedin}
                                        external
                                    />
                                </div>
                            </NavMenuItem>
                        </NavMenu>

                        <a
                            href="/Nishant_Gupta_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 px-5 py-2 text-[13px] tracking-wide uppercase font-medium rounded-full transition-all duration-300 hover:scale-105 text-black bg-white hover:bg-white/90"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="w-10 h-10 flex items-center justify-center transition-colors text-white/70 hover:text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden border-t border-white/6"
                        >
                            <div className="py-6 flex flex-col gap-4">
                                {mobileLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="text-lg transition-colors text-white/60 hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href="/Nishant_Gupta_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileOpen(false)}
                                    className="mt-4 px-5 py-3 text-center rounded-full font-medium text-black bg-white"
                                >
                                    Resume
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Navbar;

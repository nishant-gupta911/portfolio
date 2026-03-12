import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { RetroGrid } from './ui/retro-grid';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative pt-44 pb-14 border-t border-white/6 bg-black overflow-hidden">
            <RetroGrid angle={65} className="opacity-60" />
            <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <span className="font-bold text-[10px] text-black">NG</span>
                        </div>
                        <p className="text-sm text-white/30">
                            © {year} Nishant Gupta
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="https://github.com/nishant-gupta911" target="_blank" rel="noopener noreferrer" className="transition-colors text-white/20 hover:text-white/50" aria-label="GitHub">
                            <Github size={16} />
                        </a>
                        <a href="https://www.linkedin.com/in/nishant-gupta-b20636255/" target="_blank" rel="noopener noreferrer" className="transition-colors text-white/20 hover:text-white/50" aria-label="LinkedIn">
                            <Linkedin size={16} />
                        </a>
                        <a href="mailto:nishantgupta2999@gmail.com" className="transition-colors text-white/20 hover:text-white/50" aria-label="Email">
                            <Mail size={16} />
                        </a>
                    </div>

                    <p className="flex items-center gap-1.5 text-xs text-white/15">
                        Built with <Heart size={12} className="text-accent-purple/40" /> and React
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

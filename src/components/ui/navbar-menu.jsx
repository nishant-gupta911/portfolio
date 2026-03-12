import React from 'react';
import { motion } from 'framer-motion';

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const NavMenuItem = ({ setActive, active, item, href, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.a
        href={href}
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-[13px] tracking-wide uppercase font-medium text-white/50 hover:text-white transition-colors duration-300"
      >
        {item}
      </motion.a>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/50"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const NavMenu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center space-x-8"
    >
      {children}
    </nav>
  );
};

export const IconItem = ({ title, description, href, icon: Icon, external = false }) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
    >
      <div className="w-9 h-9 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-purple/20 transition-colors">
        <Icon size={16} className="text-accent-purple" />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-medium text-white group-hover:text-accent-purple transition-colors leading-tight">
          {title}
        </h4>
        {description && (
          <p className="text-white/35 text-[11px] leading-tight mt-0.5 truncate max-w-[11rem]">
            {description}
          </p>
        )}
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, href, icon: Icon, ...rest }) => {
  return (
    <a
      href={href}
      {...rest}
      className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/5"
    >
      {Icon && (
        <div className="w-7 h-7 rounded-md bg-accent-cyan/10 border border-accent-cyan/15 flex items-center justify-center flex-shrink-0">
          <Icon size={13} className="text-accent-cyan" />
        </div>
      )}
      <span className="text-sm">{children}</span>
    </a>
  );
};

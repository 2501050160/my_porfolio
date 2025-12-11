import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { useCounter } from '../utils/counters';
import { ArrowRight, Github, Linkedin, Mail, Phone, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCounter: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const { count, elementRef } = useCounter(value, 2500);
  
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors duration-300">
      <div ref={elementRef} className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
        {count}+
      </div>
      <div className="text-sm font-bold text-gray-600 dark:text-gray-300 mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const Home: React.FC = () => {
  const { hero } = siteData;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Optimized typing effect
  useEffect(() => {
    const currentRole = hero.roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % hero.roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, hero.roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-950">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
         {/* Gradient Blobs */}
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-500/20 rounded-full blur-[100px] animate-blob"></div>
         <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
         
         {/* Grid Pattern Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-gray-200 dark:border-slate-700 shadow-sm mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        {hero.availability}
                    </span>
                </div>

                <h2 className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2 font-sans">
                    {hero.greeting}
                </h2>
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                    {hero.firstName} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
                        {hero.lastName}
                    </span>
                </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="h-12 flex items-center justify-center lg:justify-start">
              <span className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 font-mono">
                {text}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-3 h-8 ml-1 bg-primary-500 align-middle"
                />
              </span>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {hero.lead}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to={hero.cta.projects} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary-600 border border-transparent rounded-full shadow-lg hover:bg-primary-700 hover:shadow-primary-500/30 hover:-translate-y-1">
                Explore Projects <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to={hero.cta.contact} className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 dark:text-white transition-all duration-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 hover:-translate-y-1">
                Get in Touch
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 justify-center lg:justify-start pt-6">
                <a href={hero.social.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110"><Github size={28} /></a>
                <a href={hero.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"><Linkedin size={28} /></a>
                <a href={`mailto:${hero.social.email}`} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors transform hover:scale-110"><Mail size={28} /></a>
                <a href={`tel:${hero.social.phone}`} className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors transform hover:scale-110"><Phone size={28} /></a>
            </motion.div>
          </motion.div>

          {/* Right Content / Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6 relative z-10">
                {hero.stats.map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (idx * 0.1) }}
                    >
                        <StatCounter label={stat.label} value={stat.value} />
                    </motion.div>
                ))}
                
                {/* Visual Decorative Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-xl flex items-center justify-between overflow-hidden relative group cursor-pointer"
                >
                    <div className="relative z-10">
                        <div className="text-sm font-semibold opacity-90 mb-1">Current Focus</div>
                        <div className="text-xl font-bold">Building Scalable IoT Solutions</div>
                    </div>
                    <ArrowRight className="w-8 h-8 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                    
                    {/* Abstract Shapes */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 translate-y-10"></div>
                </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
        >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
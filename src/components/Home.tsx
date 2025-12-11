import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData.json';
import { useCounter } from '../utils/counters';
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCounter: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const { count, elementRef } = useCounter(value);
  
  return (
    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-100 dark:border-slate-700 shadow-sm">
      <div ref={elementRef} className="text-3xl font-bold text-primary-600 dark:text-primary-400">
        {count}+
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{label}</div>
    </div>
  );
};

export const Home: React.FC = () => {
  const { hero } = siteData;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRole = hero.roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % hero.roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, hero.roles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div>
            <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase text-sm">
              {hero.greeting}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-4 leading-tight">
              {hero.firstName} <span className="text-primary-600">{hero.lastName}</span>
            </h1>
            <div className="h-8">
              <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-mono">
                {text}<span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            {hero.lead}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to={hero.cta.projects} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors">
              View Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link to={hero.cta.contact} className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Contact Me
            </Link>
          </div>

          <div className="flex gap-4 pt-4 text-gray-500 dark:text-gray-400">
             <a href={hero.social.github} target="_blank" rel="noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
             <a href={hero.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
             <a href={`mailto:${hero.social.email}`} className="hover:text-red-600 dark:hover:text-red-400 transition-colors"><Mail className="w-6 h-6" /></a>
             <a href={`tel:${hero.social.phone}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors"><Phone className="w-6 h-6" /></a>
          </div>
        </motion.div>

        {/* Right Content / Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card rounded-2xl p-8 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-100 dark:border-slate-700">
              Impact at a Glance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hero.stats.map((stat, idx) => (
                <StatCounter key={idx} label={stat.label} value={stat.value} />
              ))}
              <div className="text-center p-4 rounded-xl bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800">
                 <div className="text-lg font-bold text-primary-700 dark:text-primary-300 mb-1">Status</div>
                 <div className="text-xs text-primary-600 dark:text-primary-400">{hero.availability}</div>
              </div>
            </div>
          </div>
          
          {/* Decorative shapes behind card */}
          <div className="absolute top-10 -right-10 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full -z-10 blur-2xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full -z-10 blur-2xl opacity-50"></div>
        </motion.div>
      </div>
    </section>
  );
};
import React from 'react';
import { useCounter } from '../utils/counters';
import { Trophy, Medal, Award, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatProps {
  icon: any;
  label: string;
  value: number;
  color: string;
  delay: number;
}

const StatBox: React.FC<StatProps> = ({ icon: Icon, label, value, color, delay }) => {
  const { count, elementRef } = useCounter(value, 2000);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
        
        {/* Card Content */}
        <div className="relative h-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center transform transition duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]">
            <div ref={elementRef} className={`p-4 rounded-full bg-white/50 dark:bg-slate-700/50 mb-4 shadow-sm ${color}`}>
                <Icon size={32} />
            </div>
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2 font-sans">{count}</span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
    </motion.div>
  );
};

export const CertificateStats: React.FC<{
  first: number;
  second: number;
  third: number;
  prof: number;
}> = ({ first, second, third, prof }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <StatBox icon={Trophy} label="First Prizes" value={first} color="text-yellow-500 dark:text-yellow-400" delay={0.1} />
      <StatBox icon={Medal} label="Second Prizes" value={second} color="text-gray-500 dark:text-gray-400" delay={0.2} />
      <StatBox icon={Award} label="Third Prizes" value={third} color="text-amber-700 dark:text-amber-600" delay={0.3} />
      <StatBox icon={GraduationCap} label="Certifications" value={prof} color="text-blue-500 dark:text-blue-400" delay={0.4} />
    </div>
  );
};
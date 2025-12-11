import React from 'react';
import { useCounter } from '../utils/counters';
import { Layers, Cpu, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatProps {
  icon: any;
  label: string;
  value: number;
  color: string;
  delay: number;
}

const StatBox: React.FC<StatProps> = ({ icon: Icon, label, value, color, delay }) => {
  // Pass value as key to trigger animation reset when number changes
  const { count, elementRef } = useCounter(value, 1500);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
        {/* Glow effect on hover */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500`}></div>
        
        {/* Card Content */}
        <div className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4 transform transition duration-500 group-hover:-translate-y-1">
            <div>
                 <span className="block text-3xl font-extrabold text-gray-900 dark:text-white font-sans tracking-tight mb-1">
                    <span ref={elementRef}>{count}</span>
                 </span>
                 <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            <div className={`p-3 rounded-xl bg-white/50 dark:bg-slate-700/50 shadow-sm ${color.replace('from-', 'text-').split(' ')[0]}`}>
                <Icon size={24} />
            </div>
        </div>
    </motion.div>
  );
};

interface ProjectStatsProps {
  displayedCount: number;
  iotCount: number;
  majorCount: number;
  miniCount: number;
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ displayedCount, iotCount, majorCount, miniCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      <StatBox 
        icon={Layers} 
        label="Showing Projects" 
        value={displayedCount} 
        color="from-primary-500 to-blue-600" 
        delay={0.1} 
      />
      <StatBox 
        icon={Cpu} 
        label="Total IoT" 
        value={iotCount} 
        color="from-emerald-500 to-green-600" 
        delay={0.2} 
      />
      <StatBox 
        icon={Zap} 
        label="Major Projects" 
        value={majorCount} 
        color="from-amber-500 to-orange-600" 
        delay={0.3} 
      />
      <StatBox 
        icon={Globe} 
        label="Mini Projects" 
        value={miniCount} 
        color="from-purple-500 to-indigo-600" 
        delay={0.4} 
      />
    </div>
  );
};
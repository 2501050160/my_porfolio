import React from 'react';
import siteData from '../data/siteData.json';
import { useCounter } from '../utils/counters';
import { Cpu, Globe, Wrench, Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const SkillCard = ({ title, skills, icon: Icon }: { title: string; skills: string[]; icon: any }) => (
  <div className="glass-card p-6 rounded-xl h-full">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TimelineItem = ({ degree, institution, period, grade }: any) => (
  <div className="relative pl-8 pb-8 border-l-2 border-primary-200 dark:border-slate-700 last:pb-0">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-primary-50 dark:ring-slate-900"></div>
    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{degree}</h4>
    <p className="text-primary-600 dark:text-primary-400 font-medium">{institution}</p>
    <div className="flex justify-between items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
      <span>{period}</span>
      <span className="font-semibold">{grade}</span>
    </div>
  </div>
);

const CounterCard: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const { count, elementRef } = useCounter(value);
  return (
    <div className="text-center p-4">
      <div ref={elementRef} className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
        {count}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</div>
    </div>
  );
};

export const About: React.FC = () => {
  const { about } = siteData;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {about.summary}
          </p>
        </div>

        {/* Counters Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 glass-card rounded-xl p-4">
          {about.counters.map((c, idx) => (
            <CounterCard key={idx} label={c.label} value={c.value} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Expertise</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <SkillCard title="IoT & Embedded" skills={about.skills.iot} icon={Cpu} />
              <SkillCard title="Web Development" skills={about.skills.web} icon={Globe} />
              <SkillCard title="Tools & Design" skills={about.skills.tools} icon={Wrench} />
            </div>

            <div className="glass-card p-8 rounded-xl mt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="text-primary-600" /> Professional Experience
              </h3>
              
              {/* Internship */}
              <div className="mb-8">
                 <h4 className="text-xl font-bold text-gray-900 dark:text-white">{about.internship.company}</h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{about.internship.period}</p>
                 <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {about.internship.highlights.map((h, i) => <li key={i}>{h}</li>)}
                 </ul>
              </div>

              {/* Leadership */}
              <div>
                 <h4 className="text-xl font-bold text-gray-900 dark:text-white">{about.leadership.role}</h4>
                 <div className="flex gap-4 text-sm text-primary-600 dark:text-primary-400 my-2">
                    <span>{about.leadership.members} Members</span>
                    <span>{about.leadership.projectsGuided} Projects Guided</span>
                 </div>
                 <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {about.leadership.achievements.map((a, i) => <li key={i}>{a}</li>)}
                 </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <GraduationCap className="text-primary-600" /> Education
             </h3>
             <div className="glass-card p-8 rounded-xl">
               {about.education.map((edu, idx) => (
                 <TimelineItem key={idx} {...edu} />
               ))}
             </div>

             <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <Award className="w-8 h-8 mb-4 opacity-80" />
                <h4 className="text-lg font-bold mb-2">Did you know?</h4>
                <p className="text-primary-50 text-sm">
                  I've guided over 50 student projects, bridging the gap between theoretical mechanical engineering and practical IoT implementation.
                </p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
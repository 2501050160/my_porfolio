import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Filter } from 'lucide-react';
import { clsx } from 'clsx';
import { ProjectStats } from './ProjectStats';

type Project = typeof siteData.projects.keyProjects[0];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'iot' | 'fullstack' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { keyProjects, stats } = siteData.projects;

  const filteredProjects = keyProjects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4"
            >
              Project Portfolio
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
            >
                Exploring the intersection of embedded systems, real-time data, and modern web technologies.
            </motion.p>
        </div>

        {/* Dynamic Stats Section */}
        <ProjectStats 
            displayedCount={filteredProjects.length}
            iotCount={stats.iotTotal}
            majorCount={stats.major}
            miniCount={stats.mini}
        />

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {['all', 'iot', 'fullstack', 'web'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={clsx(
                "px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-300 flex items-center gap-2 border",
                filter === cat
                  ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/30 transform scale-105"
                  : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400"
              )}
            >
              {cat === 'all' && <Filter size={14} />}
              {cat === 'all' ? 'All Projects' : cat === 'iot' ? 'IoT Systems' : cat + ' Apps'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col h-full border-t border-white/50 dark:border-white/5"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary-600/5 group-hover:bg-primary-600/10 transition-colors duration-300"></div>
                   
                   {/* Animated Background Element */}
                   <div className="absolute w-32 h-32 bg-primary-500/10 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                   <Tag className="w-12 h-12 text-gray-300 dark:text-slate-600 relative z-10 group-hover:text-primary-500 transition-colors duration-300" />
                   
                   {project.highlighted && (
                     <span className="absolute top-4 right-4 bg-yellow-400/90 backdrop-blur-sm text-yellow-950 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-yellow-300/50 uppercase tracking-wide z-20">
                       Featured
                     </span>
                   )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col relative">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                    {project.short}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-slate-800/50">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-md border border-gray-200 dark:border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-50 dark:bg-slate-800/50 text-xs font-medium text-gray-500 dark:text-gray-400 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found in this category.</p>
                <button 
                    onClick={() => setFilter('all')}
                    className="mt-4 text-primary-600 hover:underline font-medium"
                >
                    View all projects
                </button>
            </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-slate-700"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors z-10 text-gray-500"
                >
                  <X size={20} />
                </button>

                <div className="p-8 md:p-10">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                            {selectedProject.category}
                        </span>
                        {selectedProject.highlighted && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 uppercase tracking-wide flex items-center gap-1">
                                Featured
                            </span>
                        )}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Overview</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                          {selectedProject.description}
                        </p>

                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Features</h4>
                        <ul className="grid sm:grid-cols-1 gap-3 mb-8">
                          {selectedProject.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-5">
                            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-200 dark:border-slate-700 shadow-sm">
                                {tech}
                                </span>
                            ))}
                            </div>
                        </div>
                        
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-5 border border-primary-100 dark:border-primary-800/30">
                            <p className="text-sm text-primary-800 dark:text-primary-300 font-medium italic">
                                "This project demonstrates capability in {selectedProject.category === 'iot' ? 'embedded systems and real-time data' : 'full-stack architecture'}."
                            </p>
                        </div>
                      </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
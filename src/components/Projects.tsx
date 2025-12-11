import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';
import { clsx } from 'clsx';

type Project = typeof siteData.projects.keyProjects[0];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'iot' | 'fullstack' | 'web'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { keyProjects, categories } = siteData.projects;

  const filteredProjects = keyProjects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Featured Projects
        </h2>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {['all', 'iot', 'fullstack', 'web'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium capitalize transition-all",
                filter === cat
                  ? "bg-primary-600 text-white shadow-md transform scale-105"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              )}
            >
              {cat === 'all' ? 'All Projects' : cat === 'iot' ? 'IoT Systems' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative overflow-hidden">
                   {/* Placeholder visual since no actual images provided for projects in JSON */}
                   <div className="absolute inset-0 bg-primary-600/10 group-hover:bg-primary-600/20 transition-colors"></div>
                   <Tag className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                   {project.highlighted && (
                     <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                       Featured
                     </span>
                   )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <span className="text-xs font-semibold tracking-wider text-primary-600 dark:text-primary-400 uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                    {project.short}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-400 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-400 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Other Projects Lists */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">Major Implementations</h3>
                <ul className="space-y-2">
                    {categories.major.map((p, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span> {p}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">Mini Projects</h3>
                <ul className="space-y-2">
                    {categories.mini.map((p, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span> {p}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">Web Solutions</h3>
                <ul className="space-y-2">
                    {categories.web.map((p, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span> {p}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors z-10"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-300" />
                </button>

                <div className="p-8">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                        {selectedProject.category.toUpperCase()}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="prose dark:prose-invert max-w-none mb-8">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Features</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-md text-sm border border-gray-200 dark:border-slate-700">
                          {tech}
                        </span>
                      ))}
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
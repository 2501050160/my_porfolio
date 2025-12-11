import React from 'react';
import siteData from '../data/siteData.json';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { footer } = siteData;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {year} {footer.copyrightName}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href={footer.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={footer.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ZoomIn } from 'lucide-react';
import { CertificateStats } from './CertificateStats';

const CertificateItem: React.FC<{ item: any; onClick: () => void }> = ({ item, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  // Use Picsum as fallback if local image fails
  const imgSrc = imgError ? `https://picsum.photos/seed/${item.id}/800/600` : item.image;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card p-4 rounded-2xl cursor-pointer group relative overflow-hidden h-full flex flex-col"
      onClick={onClick}
    >
      <div className="aspect-[4/3] bg-gray-100 dark:bg-slate-700/50 rounded-xl mb-4 overflow-hidden relative shadow-inner">
        <img 
            src={imgSrc} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <ZoomIn className="text-white w-10 h-10 drop-shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight mb-2">{item.title}</h4>
        {item.event && <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto flex items-center gap-1"><Award size={12} /> {item.event}</p>}
      </div>
    </motion.div>
  );
};

export const Certificates: React.FC = () => {
  const { certificates } = siteData;
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const Section = ({ title, items, className }: { title: string; items: any[], className?: string }) => (
    <div className={`mb-16 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3 border-l-4 border-primary-500 pl-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <CertificateItem key={item.id} item={item} onClick={() => setSelectedCert(item)} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Hall of Fame</h2>
           <p className="text-lg text-gray-600 dark:text-gray-400">
             A showcase of my journey through competitions, research presentations, and technical milestones.
           </p>
        </div>

        {/* Stats Section */}
        <CertificateStats 
            first={certificates.firstPrize.length}
            second={certificates.secondPrize.length}
            third={certificates.thirdPrize.length}
            prof={certificates.professional.length}
        />

        <Section title="First Prize & Gold Awards" items={certificates.firstPrize} />
        <Section title="Second Prize & Silver Awards" items={certificates.secondPrize} />
        <Section title="Third Prize & Bronze Awards" items={certificates.thirdPrize} />
        <Section title="Professional Certifications" items={certificates.professional} />
        
        <p className="text-center text-sm text-gray-400 italic mt-12 opacity-60">{certificates.notes}</p>

        {/* Preview Modal */}
        <AnimatePresence>
            {selectedCert && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                    >
                         <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
                         >
                            <X size={24} />
                         </button>
                         
                         <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black">
                            <img 
                                src={selectedCert.image} 
                                alt={selectedCert.title}
                                className="w-full h-full object-contain max-h-[80vh]"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedCert.id}/1200/800`;
                                }}
                            />
                         </div>

                         <div className="mt-6 text-center text-white">
                             <h3 className="text-2xl font-bold mb-1">{selectedCert.title}</h3>
                             {selectedCert.event && <p className="text-lg text-primary-400">{selectedCert.event}</p>}
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import siteData from '../data/siteData.json';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ZoomIn } from 'lucide-react';

const CertificateItem: React.FC<{ item: any; onClick: () => void }> = ({ item, onClick }) => {
  const [imgError, setImgError] = useState(false);
  
  // Use Picsum as fallback if local image fails
  const imgSrc = imgError ? `https://picsum.photos/seed/${item.id}/400/300` : item.image;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card p-4 rounded-xl cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-200 dark:bg-slate-700 rounded-lg mb-4 overflow-hidden relative">
        <img 
            src={imgSrc} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="text-white w-8 h-8" />
        </div>
      </div>
      <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{item.title}</h4>
      {item.event && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.event}</p>}
    </motion.div>
  );
};

export const Certificates: React.FC = () => {
  const { certificates } = siteData;
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const Section = ({ title, items }: { title: string; items: any[] }) => (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Award className="text-primary-600" size={20} /> {title}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <CertificateItem key={item.id} item={item} onClick={() => setSelectedCert(item)} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Achievements & Certifications</h2>
           <p className="text-gray-600 dark:text-gray-400">Recognitions for technical excellence and paper presentations.</p>
        </div>

        <Section title="First Prize Wins" items={certificates.firstPrize} />
        <Section title="Second Prize Wins" items={certificates.secondPrize} />
        <Section title="Third Prize Wins" items={certificates.thirdPrize} />
        <Section title="Professional Certifications" items={certificates.professional} />
        
        <p className="text-center text-sm text-gray-500 italic mt-8">{certificates.notes}</p>

        {/* Preview Modal */}
        <AnimatePresence>
            {selectedCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative max-w-4xl w-full max-h-[90vh] bg-transparent"
                    >
                         <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300"
                         >
                            <X size={32} />
                         </button>
                         <img 
                            src={selectedCert.image} 
                            alt={selectedCert.title}
                            className="w-full h-full object-contain rounded-lg shadow-2xl bg-white"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedCert.id}/800/600`;
                            }}
                         />
                         <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white backdrop-blur-md rounded-b-lg">
                             <h3 className="text-lg font-bold">{selectedCert.title}</h3>
                             {selectedCert.event && <p className="text-sm opacity-80">{selectedCert.event}</p>}
                         </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};
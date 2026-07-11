"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function GalleryPage() {
  const { lang, t } = useLanguage();

  const allImages = PlaceHolderImages.filter(img => 
    img.id.startsWith("edu-") || img.id.startsWith("hygiene-")
  );
  const eduImages = PlaceHolderImages.filter(img => img.id.startsWith("edu-"));
  const hygieneImages = PlaceHolderImages.filter(img => img.id.startsWith("hygiene-"));

  // Gallery view filter state
  const [filter, setFilter] = useState<'all' | 'edu' | 'hygiene'>('all');

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getFilteredImages = () => {
    switch (filter) {
      case 'edu': return eduImages;
      case 'hygiene': return hygieneImages;
      default: return allImages;
    }
  };

  const activeImagesList = getFilteredImages();

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % activeImagesList.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + activeImagesList.length) % activeImagesList.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, activeImagesList.length]);

  const triggerLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        
        {/* Gallery Header */}
        <header className="max-w-4xl mb-16 space-y-4 text-center md:text-left">
          <span className="text-primary font-black uppercase tracking-[0.25em] text-xs bg-primary/5 px-4 py-1.5 rounded-full inline-block">
            {t.gallery}
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-zinc-900 leading-[0.95] font-headline">
            {t.galleryTitle.split('. ').map((part, i) => (
              <span key={i} className={i === 1 ? "text-primary italic" : ""}>
                {part}{i === 0 ? ". " : ""}
              </span>
            ))}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
            {t.galleryDesc}
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12">
          <Button 
            onClick={() => { setFilter('all'); setLightboxIndex(0); }} 
            className={`rounded-full font-black text-xs uppercase tracking-wider px-6 h-11 ${filter === 'all' ? 'bg-primary text-white hover:bg-primary/95' : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
          >
            {t.allContributions}
          </Button>
          <Button 
            onClick={() => { setFilter('edu'); setLightboxIndex(0); }} 
            className={`rounded-full font-black text-xs uppercase tracking-wider px-6 h-11 ${filter === 'edu' ? 'bg-primary text-white hover:bg-primary/95' : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
          >
            {t.eduTitle}
          </Button>
          <Button 
            onClick={() => { setFilter('hygiene'); setLightboxIndex(0); }} 
            className={`rounded-full font-black text-xs uppercase tracking-wider px-6 h-11 ${filter === 'hygiene' ? 'bg-primary text-white hover:bg-primary/95' : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'}`}
          >
            {t.hygieneTitle}
          </Button>
        </div>
        
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activeImagesList.map((img, i) => (
            <Card 
              key={img.id} 
              className="overflow-hidden border border-zinc-100 shadow-sm group rounded-[2rem] bg-white cursor-pointer hover:shadow-xl transition-all duration-500"
              onClick={() => triggerLightbox(i)}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                <Image 
                  src={img.imageUrl} 
                  alt={img.description} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    console.error("Gallery Page image failed to load:", img.imageUrl, e);
                  }}
                />
                
                {/* Visual hover layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <span className="text-secondary font-black text-[10px] uppercase tracking-widest block">
                        {img.id.startsWith('edu') ? 'EDUCATION' : 'SANITATION'}
                      </span>
                      <h3 className="font-bold text-sm mt-0.5">{img.description}</h3>
                    </div>
                    <Maximize2 className="w-5 h-5 text-secondary shrink-0" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/98 backdrop-blur-md p-4 animate-in fade-in duration-300">
          
          {/* Top Status Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-zinc-400 font-bold text-xs">
            <span>
              {filter === 'all' ? 'All Active Works' : filter === 'edu' ? t.eduTitle : t.hygieneTitle} • {lightboxIndex + 1} / {activeImagesList.length}
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Display Stage */}
          <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
            
            {/* Prev Image */}
            <button 
              className="absolute left-2 md:-left-16 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
              onClick={() => setLightboxIndex((prev) => (prev - 1 + activeImagesList.length) % activeImagesList.length)}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Stage Frame */}
            <div className="relative w-full h-full max-w-3xl aspect-[4/3] md:aspect-auto">
              <Image 
                src={activeImagesList[lightboxIndex]?.imageUrl} 
                alt={activeImagesList[lightboxIndex]?.description}
                fill 
                className="object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  console.error("Gallery lightbox image load error:", activeImagesList[lightboxIndex]?.imageUrl, e);
                }}
              />
            </div>

            {/* Next Image */}
            <button 
              className="absolute right-2 md:-right-16 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
              onClick={() => setLightboxIndex((prev) => (prev + 1) % activeImagesList.length)}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="mt-6 text-center max-w-xl px-4">
            <h4 className="text-white font-black text-lg md:text-xl tracking-tight">
              {activeImagesList[lightboxIndex]?.description}
            </h4>
            <p className="text-zinc-400 text-xs mt-1.5 font-medium">
              Shri Padmavati Grameen Abhivruddhi Sansthe • North Karnataka rural welfare.
            </p>
          </div>
        </div>
      )}

      {/* Simple Dark Footer */}
      <footer className="bg-zinc-950 py-12 text-zinc-500 border-t border-white/5">
        <div className="container mx-auto px-4 text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) • Community Gallery
          </p>
          <p className="text-[10px] font-bold text-zinc-600">
            Athani Taluk, Belagavi District, Karnataka. NGO Darpan: KA/2018/0202992
          </p>
        </div>
      </footer>
    </div>
  );
}

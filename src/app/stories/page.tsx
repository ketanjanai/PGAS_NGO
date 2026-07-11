"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles } from "lucide-react";

export default function StoriesPage() {
  const { lang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use existing education and hygiene images as robust story assets to avoid undefined crashes
  const storyImages = PlaceHolderImages.filter(img => 
    img.id.startsWith("edu-") || img.id.startsWith("hygiene-")
  );

  const handleReadStory = (title: string) => {
    try {
      setNotification({
        title: title,
        message: `Simulation: Loading the full story "${title}". Dynamic AI Genkit content generator is available for full-length logs on the admin dashboard.`
      });
    } catch (e) {
      console.error("Failed to read story:", title, e);
    }
  };

  const stories = [
    { title: "Empowering Rural Entrepreneurs", area: t.eduTitle, village: "Athani" },
    { title: "Strengthening Village Sanitation", area: t.eduTitle, village: "Awarakhod" },
    { title: "The First Graduate of Akkol Tot", area: t.eduTitle, village: "Athani" },
    { title: "Sowing Seeds of Social Resilience", area: t.eduTitle, village: "Belagavi" },
    { title: "Water: The Lifeline Restored in Athani", area: t.hygieneTitle, village: "Awarakhod" },
    { title: "Youth Leading Village Digitalization", area: t.hygieneTitle, village: "Athani" },
  ];

  // Localized headers
  const getHeaderTitle = () => {
    if (lang === 'kn') return "ಬದಲಾವಣೆಯ ಯಶೋಗಾಥೆಗಳು";
    if (lang === 'hi') return "परिवर्तन की गौरवगाथाएं";
    return "Our Journey in Stories";
  };

  const getHeaderSub = () => {
    if (lang === 'kn') return "ನಮ್ಮ ನೈಜ ಪ್ರಭಾವವನ್ನು ನಾವು ಸೇವೆ ಸಲ್ಲಿಸುವ ಜನರ ಜೀವನದ ಮೂಲಕ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಹುದು. ಬೆಳಗಾವಿ ಜಿಲ್ಲೆಯ ಅಥಣಿ ತಾಲೂಕಿನ ಹಳ್ಳಿಗಳಲ್ಲಿನ ಪರಿವರ್ತನೆಯ ಕ್ಷಣಗಳು ಇಲ್ಲಿವೆ.";
    if (lang === 'hi') return "हमारे काम के प्रभाव को उन लोगों के जीवन के माध्यम से सबसे अच्छी तरह समझा जा सकता है जिनकी हम सेवा करते हैं। कर्नाटक के गांवों से परिवर्तन के कुछ क्षण यहां दिए गए हैं।";
    return "The impact of our work is best understood through the lives of the people we serve. Here are actual moments of transformation from the villages of Athani, Karnataka.";
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <header className="max-w-3xl mb-16 space-y-4 text-center md:text-left">
          <span className="text-primary font-black uppercase tracking-[0.25em] text-xs bg-primary/5 px-4 py-1.5 rounded-full inline-block">
            {t.stories}
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-zinc-900 leading-tight font-headline">
            {mounted && getHeaderTitle()}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
            {mounted && getHeaderSub()}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => {
            // Safely fetch an image index to avoid crashes
            const imgObj = storyImages[idx % storyImages.length] || PlaceHolderImages[0];
            return (
              <Card key={idx} className="overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 group rounded-[2rem] bg-white flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <Image 
                      src={imgObj.imageUrl} 
                      alt={story.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        console.error("Story image loading failed:", imgObj.imageUrl, e);
                      }}
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-primary hover:bg-primary text-white font-black uppercase text-[10px] tracking-wider px-3 py-1 rounded-full border border-white/10">
                        {story.area}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                      {story.village}, Karnataka
                    </p>
                    <h3 className="text-xl md:text-2xl font-black mb-3 group-hover:text-primary transition-colors tracking-tight leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-3">
                      Before the intervention, the local community faced severe challenges in accessing educational support and sanitary structures. Today, through collective local leadership and transparent programs, we have unlocked incredible opportunities...
                    </p>
                  </CardContent>
                </div>
                
                <div className="px-8 pb-8 pt-0">
                  <button 
                    onClick={() => handleReadStory(story.title)}
                    className="font-black text-primary inline-flex items-center gap-2 group-hover:gap-4 transition-all text-xs uppercase tracking-wider"
                  >
                    Read Full Story <span>→</span>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 text-zinc-500 border-t border-white/5 mt-12">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) • Stories of Change
          </p>
          <p className="text-[10px] font-bold text-zinc-600">
            Athani Taluk, Belagavi District, Karnataka. NGO Darpan: KA/2018/0202992
          </p>
        </div>
      </footer>

      {/* Stateful Notification Modal */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-zinc-100 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-secondary fill-secondary/20" /> Impact Narrative
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">{notification.title}</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{notification.message}</p>
            </div>
            <Button 
              onClick={() => setNotification(null)}
              className="w-full bg-primary hover:bg-primary/95 text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Close Story
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

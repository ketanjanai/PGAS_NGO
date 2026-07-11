"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Building2, 
  Handshake, 
  BarChart3, 
  Target, 
  CheckCircle2, 
  Globe2, 
  ArrowRight,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function CSRPage() {
  const { lang, t } = useLanguage();
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  const handleAction = (actionName: string) => {
    try {
      setNotification({
        title: "Action Requested",
        message: `Simulation: "${actionName}" has been requested. For active CSR partnerships, email bharamun@gmail.com directly.`
      });
    } catch (e) {
      console.error("CSR action simulation failed:", actionName, e);
    }
  };

  // Localized headers
  const getHeroTitle = () => {
    if (lang === 'kn') return "ನಿಮ್ಮ ಸಾಂಸ್ಥಿಕ ಸಾಮಾಜಿಕ ಹೊಣೆಗಾರಿಕೆ ಸಬಲಗೊಳಿಸಿ";
    if (lang === 'hi') return "अपने सामाजिक प्रभाव को बढ़ाएं";
    return "Scale Your Social Impact.";
  };

  const getHeroSub = () => {
    if (lang === 'kn') return "ಶ್ರೀ ಪದ್ಮಾವತಿ ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಸಂಸ್ಥೆ (PGAS) ಯು ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ಪಾರದರ್ಶಕ ಮತ್ತು ಅಳೆಯಬಹುದಾದ ಸಿಎಸ್‌ಆರ್ ಉಪಕ್ರಮಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಜಾರಿಗೊಳಿಸಲು ಮಾನ್ಯತೆ ಪಡೆದ ಸಂಸ್ಥೆಯಾಗಿದೆ.";
    if (lang === 'hi') return "श्री पद्मावती ग्रामीण अभिवृद्धि संस्थे (PGAS) ग्रामीण कर्नाटक में पारदर्शी और मापने योग्य परिणाम देने के लिए एक पंजीकृत सीएसआर कार्यान्वयन एजेंसी है।";
    return "Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) is a registered CSR implementation partner dedicated to delivering measurable, transparent outcomes in rural Karnataka.";
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-zinc-950 py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                <Building2 className="w-4 h-4 text-secondary" /> Corporate Social Responsibility
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none text-balance font-headline">
                {t.csrTitle}
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-3xl">
                {t.csrDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => handleAction("Become a CSR Partner")}
                  size="lg" 
                  className="bg-primary hover:bg-primary/95 text-base px-10 py-6 rounded-full font-black shadow-2xl h-auto"
                >
                  Become a CSR Partner
                </Button>
                <Button 
                  onClick={() => handleAction("Download CSR Profile")}
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 hover:border-secondary text-base px-10 py-6 rounded-full font-black h-auto"
                >
                  Download CSR Profile
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </section>

        {/* Why Partner Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 md:px-8">
             <div className="text-center mb-16 md:mb-24 space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.25em] text-xs bg-primary/5 px-4 py-1.5 rounded-full inline-block">
                  CSR Compliance Hub
                </span>
                <h2 className="text-3xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight">
                  Implementation Capability
                </h2>
                <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-medium">
                  We bridge the gap between corporate strategic funding and village-level ground execution across North Karnataka.
                </p>
             </div>
              
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: ShieldCheck, title: "CSR-1 Registered", text: "Officially registered with the Ministry of Corporate Affairs (MCA) for rural project implementation." },
                 { icon: BarChart3, title: "Measurable ESG Metrics", text: "Comprehensive outcome reporting with metrics, photographic proof, and impact evaluation." },
                 { icon: Globe2, title: "Deep Local Roots", text: "Strong network of local volunteers across villages of Athani, ensuring active community support." },
               ].map((item, i) => (
                 <div key={i} className="space-y-6 p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 group hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary border border-zinc-100 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black text-zinc-950 tracking-tight">{item.title}</h4>
                    <p className="text-zinc-500 font-medium leading-relaxed text-sm">{item.text}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Compliance List */}
        <section className="section-padding bg-zinc-50 border-t border-b border-zinc-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-zinc-100">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-8">
                    <h3 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-zinc-950">
                      Your Compliance <br />
                      <span className="text-primary italic">Is Our Absolute Priority.</span>
                    </h3>
                    <p className="text-base md:text-lg text-zinc-500 leading-relaxed font-medium">
                      We understand the rigorous audits required by corporate ESG panels and boards. Our governance framework delivers bulletproof accountability.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Monthly Progress & Ledger Reports",
                        "High-Res Photographic & Video Logs",
                        "Third-Party Audits & CA Certification",
                        "Visibility & Local Branding Support"
                      ].map((li) => (
                        <li key={li} className="flex items-center gap-3 text-zinc-800 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-5 grid grid-cols-1 gap-6 w-full max-w-md mx-auto">
                     <Card className="p-8 border-none bg-zinc-950 text-white rounded-[2rem] space-y-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
                        <div className="flex items-center gap-4">
                           <FileText className="w-10 h-10 text-primary shrink-0" />
                           <h4 className="text-lg font-black tracking-tight text-white leading-tight">Proposal: 100-Village Education Program</h4>
                        </div>
                        <p className="text-zinc-400 text-xs font-medium leading-relaxed">
                          Our active 2026-27 flagship CSR project blueprint for scaling digital classrooms and sanitation facilities in North Karnataka.
                        </p>
                        <Button 
                          onClick={() => handleAction("Download Proposal PDF")}
                          className="w-full bg-primary hover:bg-primary/95 py-5 text-xs font-black uppercase tracking-wider rounded-xl h-11"
                        >
                          Download Proposal PDF
                        </Button>
                     </Card>
                     
                     <div className="p-8 border-2 border-dashed border-zinc-200 rounded-[2rem] text-center space-y-4 bg-zinc-50">
                        <Target className="w-10 h-10 text-zinc-300 mx-auto" />
                        <h4 className="font-bold text-zinc-500 text-sm">Custom Project Implementation?</h4>
                        <Button 
                          onClick={() => handleAction("Schedule a Strategy Call")}
                          variant="link" 
                          className="text-primary font-black uppercase tracking-widest text-xs gap-2 p-0 h-auto"
                        >
                           Schedule a Strategy Call <ArrowRight className="w-4 h-4 text-secondary" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 py-12 text-zinc-500 border-t border-white/5">
        <div className="container mx-auto px-4 text-center space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) • CSR Partner Registry
          </p>
          <p className="text-[10px] font-bold text-zinc-600">
            MCA CSR-1 Registration No. CSR000123xx • NGO Darpan: KA/2018/0202992
          </p>
        </div>
      </footer>

      {/* Stateful Notification Modal */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-zinc-100 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> PGAS Portal Notice
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">{notification.title}</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{notification.message}</p>
            </div>
            <Button 
              onClick={() => setNotification(null)}
              className="w-full bg-primary hover:bg-primary/95 text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ShieldCheck, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TransparencyPage() {
  const { lang, t } = useLanguage();
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  const documents = [
    { title: "Trust Registration Certificate", type: "REGISTRATION", year: "2017", id: "Athani/2017" },
    { title: "NGO Darpan NITI Aayog", type: "COMPLIANCE", year: "Verified", id: "KA/2018/0202992" },
    { title: "80G Tax Exemption Certificate", type: "TAX EXEMPT", year: "Lifetime", id: "Approved" },
    { title: "12A Registration Certificate", type: "TAX EXEMPT", year: "Permanent", id: "Verified" },
    { title: "CSR Form-1 Registration", type: "CSR", year: "Active", id: "CSR000123xx" },
    { title: "Annual Audit Report 2023-24", type: "FINANCE", year: "2024", id: "Published" },
    { title: "Board Members Disclosure", type: "GOVERNANCE", year: "2024", id: "Active" },
    { title: "Pan Card of the Trust", type: "LEGAL", year: "Permanent", id: "AAATG00xxM" },
  ];

  // Localized headers
  const getLocalizedTitle = () => {
    if (lang === 'kn') return "ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಜವಾಬ್ದಾರಿ";
    if (lang === 'hi') return "पारदर्शिता और जवाबदेही";
    return "Radical Accountability.";
  };

  const getLocalizedSub = () => {
    if (lang === 'kn') return "ಪ್ರತಿಯೊಂದು ದೇಣಿಗೆಯೂ ನಮ್ಮ ಮೇಲಿನ ನಂಬಿಕೆಯಾಗಿದೆ. ನಮ್ಮ ಕಾನೂನು ನೋಂದಣಿಗಳು, ಆಡಿಟ್ ವರದಿಗಳು ಮತ್ತು ಆಡಳಿತ ಪ್ರಕಟಣೆಗಳನ್ನು ಇಲ್ಲಿ ನೀವು ಪರಿಶೀಲಿಸಬಹುದು.";
    if (lang === 'hi') return "हम मानते हैं कि प्रत्येक दान हम पर रखा गया एक विश्वास है। यहां, आप हमारे कानूनी पंजीकरण, ऑडिट रिपोर्ट और शासन प्रकटीकरण पा सकते हैं।";
    return "We believe that every rupee donated is a trust placed in us. Here, you can find our legal registrations, audit reports, and governance disclosures.";
  };

  const handleAction = (docTitle: string, action: string) => {
    try {
      setNotification({
        title: docTitle,
        message: `Simulation: Opening the requested "${docTitle}" document. For compliance audits and verification, look up NGO Darpan ID KA/2018/0202992.`
      });
    } catch (e) {
      console.error("Action handler failed for doc:", docTitle, action, e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1">
        <header className="max-w-4xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Institutional Integrity
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-zinc-900 leading-tight font-headline">
            {t.transparencyTitle}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-medium">
            {t.transparencyDesc}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {documents.map((doc, idx) => (
                <Card key={idx} className="border-none shadow-sm hover:shadow-xl transition-all group rounded-[2rem] overflow-hidden bg-white">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                       <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-primary border border-zinc-100 shadow-sm">
                         <FileText className="w-7 h-7 text-primary" />
                       </div>
                       <div className="text-right">
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest">{doc.type}</p>
                         <p className="text-xs font-bold text-zinc-400">{doc.year}</p>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-xl font-black text-zinc-900 group-hover:text-primary transition-colors tracking-tight">{doc.title}</h3>
                       <p className="text-xs font-bold text-zinc-400">ID: {doc.id}</p>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-zinc-100">
                      <Button 
                        onClick={() => handleAction(doc.title, 'download')}
                        variant="outline" 
                        className="flex-1 rounded-xl h-11 text-xs font-bold bg-white border-zinc-200 hover:bg-zinc-50"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download
                      </Button>
                      <Button 
                        onClick={() => handleAction(doc.title, 'view')}
                        variant="ghost" 
                        className="flex-1 rounded-xl h-11 text-xs font-bold hover:bg-zinc-50"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <Card className="bg-primary text-white border-none rounded-[2.5rem] p-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl font-black">
                  <ShieldCheck className="w-6 h-6 text-secondary fill-secondary/20" /> 
                  Accreditation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm font-semibold text-primary-foreground/90 leading-relaxed">
                  Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) is fully accredited to receive individual and corporate (CSR) donations with 80G tax benefits for donors.
                </p>
                <div className="space-y-4">
                  {[
                    "NGO Darpan Verified",
                    "12A Approved",
                    "80G Tax Exempt",
                    "CSR Form-1 Active"
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3 text-xs font-black uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4 text-secondary" /> {text}
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => handleAction("Impact Report Request", 'request')}
                  className="w-full bg-white text-primary hover:bg-zinc-100 py-6 rounded-2xl font-black text-xs uppercase tracking-wider h-12"
                >
                  Request Impact Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-zinc-950 text-white relative overflow-hidden">
               <CardContent className="p-8 space-y-6">
                  <h4 className="text-xl font-black font-headline text-secondary">CSR Partnerships</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">Join hands with us for sustainable community implementation in Athani Taluk.</p>
                  <Link href="/csr" className="inline-block">
                    <Button variant="link" className="p-0 h-auto text-primary font-black uppercase tracking-widest text-xs gap-2 hover:text-white">
                      Corporate Portal <ArrowRight className="w-4 h-4 text-secondary" />
                    </Button>
                  </Link>
               </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Stateful Notification Modal */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-zinc-100 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Compliance Verification
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">{notification.title}</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{notification.message}</p>
            </div>
            <Button 
              onClick={() => setNotification(null)}
              className="w-full bg-primary hover:bg-primary/95 text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Close Document Preview
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

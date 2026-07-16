"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  QrCode,
  Building,
  Calendar,
  DollarSign,
  ArrowUp,
  X,
  Play,
  Pause,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const { lang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Enquiry Submission
  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const data = {
      name: (target.querySelector('#contact-name') as HTMLInputElement).value,
      email: (target.querySelector('#contact-email') as HTMLInputElement).value,
      phone: (target.querySelector('#contact-phone') as HTMLInputElement).value,
      message: (target.querySelector('#contact-message') as HTMLTextAreaElement).value,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "enquiries"), data);
      alert("Enquiry sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error saving enquiry:", error);
      alert("Failed to send enquiry. Please try again.");
    }
  };

  // Handle Donation Intent
  const handleDonationIntent = async () => {
    if (donorDetails.name && donorDetails.phone) {
      try {
        await addDoc(collection(db, "donations"), {
          ...donorDetails,
          timestamp: new Date().toISOString(),
        });
        setShowQR(true);
      } catch (error) {
        console.error("Error saving donation intent:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please fill name and phone");
    }
  };

  // Back to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Donation Form State
  const [showQR, setShowQR] = useState(false);
  const [donorDetails, setDonorDetails] = useState({ name: '', email: '', phone: '' });

  // Donation Tab State
  const [donationTab, setDonationTab] = useState<'qr' | 'bank' | 'monthly' | 'csr'>('qr');

  // Lightbox States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxCategory, setLightboxCategory] = useState<'edu' | 'hygiene'>('edu');

  // Interactive custom notification state
  const [notification, setNotification] = useState<{ title: string; message: string } | null>(null);

  // Grouped Images from direct converted Google Drive IDs
  const eduImages = PlaceHolderImages.filter(img => img.id.startsWith("edu-"));
  const hygieneImages = PlaceHolderImages.filter(img => img.id.startsWith("hygiene-"));
  const allLightboxImages = lightboxCategory === 'edu' ? eduImages : hygieneImages;

  // Team Members
  const teamMembers = [
    { 
      id: "chairman", 
      name: "Shri Bharamappa Nandaganv", 
      role: "Chairman", 
      desc: "Visionary leader with 15+ years of grassroot development experience in North Karnataka." 
    },
    { 
      id: "member-pooja", 
      name: "Mrs. Pooja Nandaganv", 
      role: "Secretary", 
      desc: "Strong advocate for women self-reliance and mother-child health programs." 
    },
    { 
      id: "member-prashant", 
      name: "Shri Prashant Ladagi", 
      role: "Member", 
      desc: "Spearheading community sanitation, primary hygiene audits, and water access." 
    },
    { 
      id: "member-jyotiba", 
      name: "Shri Jyotiba Akkol", 
      role: "Member", 
      desc: "Leading student reach programs and distribution of textbooks in remote regions." 
    },
    { 
      id: "member-shridhar", 
      name: "Shri Shridhar Gadale", 
      role: "Member", 
      desc: "Overseeing regulatory compliance, audit transparency, and reporting standards." 
    },
    { 
      id: "member-vidyanand", 
      name: "Shri Vidyanand Nadagoud", 
      role: "Member", 
      desc: "Connecting PGAS initiatives with agricultural training and soil health workshops." 
    },
    { 
      id: "member-chandrakanth", 
      name: "Shri Chandrakanth Kagawad", 
      role: "Member", 
      desc: "Youth coordinator fostering digital inclusion and computer literacy classes." 
    },
  ];

  const qrCodeImage = PlaceHolderImages.find(img => img.id === "qr-code");
  const logo = PlaceHolderImages.find(img => img.id === "pgas-logo");

  // Listen to scrolls for Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % allLightboxImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + allLightboxImages.length) % allLightboxImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, allLightboxImages.length]);

  // Handle lightbox trigger
  const openLightbox = (category: 'edu' | 'hygiene', index: number) => {
    setLightboxCategory(category);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 text-zinc-950 font-serif antialiased selection:bg-secondary/30 scroll-smooth">
      <Navbar />

      {/* Hero Section - Static Impactful Hero */}
      <section 
        className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-zinc-950"
      >
        <Image
          src="/images/hero_ngo.jpg"
          alt="Rural Students Quality Education & Hygiene"
          fill
          className="object-cover opacity-50 transition-transform duration-[5000ms] ease-out hover:scale-105"
          priority
          referrerPolicy="no-referrer"
        />
        
        {/* Dark elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40 z-20" />

        {/* Hero Content Container */}
        <div className="container mx-auto px-4 md:px-8 relative z-30 h-full flex items-center">
          <div className="max-w-4xl space-y-6 md:space-y-8 animate-in fade-in duration-700">
            {/* Slogan pill with NGO Green Theme indicator */}
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-md px-5 py-2 rounded-full border border-primary/30 text-primary font-black text-[10px] md:text-xs tracking-widest uppercase shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              {t.footerTag}
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] text-balance font-headline">
              {t.heroHeading.split(' ').map((word: string, i: number, arr: string[]) => (
                <span key={i} className={i >= arr.length - 2 ? "text-secondary italic" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            
            <p className="text-base md:text-xl text-zinc-300 max-w-2xl leading-relaxed font-medium">
              {t.heroSub}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#donate-section">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/95 text-lg px-10 py-7 rounded-full shadow-2xl h-auto font-black transform hover:scale-[1.02] transition-all">
                  ❤️ {t.donate}
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-10 py-7 rounded-full h-auto font-black hover:border-secondary transition-all">
                  Learn About Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section - Visual Storytelling & Lightbox Gallery */}
      <section className="section-padding bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.25em] text-xs md:text-sm bg-primary/5 px-4 py-1.5 rounded-full">
              {t.ourWork}
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-tight font-headline">
              Inspiring Change, <span className="text-primary italic">One Village</span> at a Time.
            </h2>
            <p className="text-lg md:text-xl text-zinc-500 font-medium">
              We focus on implementing real-world, transparent initiatives that foster social mobility, safe hygiene practices, and self-reliance.
            </p>
          </div>

          {/* Category 1: Contribution to Rural Education */}
          <div className="mb-24 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-100 pb-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 font-headline">{t.eduTitle}</h3>
                <p className="text-sm md:text-base text-zinc-500 font-medium mt-1">{t.eduDesc}</p>
              </div>
              <Link href="/gallery">
                <Button variant="link" className="text-primary font-black uppercase tracking-widest text-xs p-0 group">
                  {t.viewGallery} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eduImages.map((img, i) => (
                <Card 
                  key={img.id} 
                  className="group overflow-hidden rounded-[2rem] border-none shadow-md hover:shadow-xl transition-all duration-500 bg-zinc-50 cursor-pointer"
                  onClick={() => openLightbox('edu', i)}
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-zinc-100">
                    <Image 
                      src={img.imageUrl} 
                      alt={img.description} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        console.error("Education image failed to load:", img.imageUrl, e);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-secondary font-black text-xs uppercase tracking-wider">{t.learnMore}</span>
                      <h4 className="text-white font-bold text-sm mt-1">{img.description}</h4>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Category 2: Sanitation & Hygiene */}
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-100 pb-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 font-headline">{t.hygieneTitle}</h3>
                <p className="text-sm md:text-base text-zinc-500 font-medium mt-1">{t.hygieneDesc}</p>
              </div>
              <Link href="/gallery">
                <Button variant="link" className="text-primary font-black uppercase tracking-widest text-xs p-0 group">
                  {t.viewGallery} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hygieneImages.map((img, i) => (
                <Card 
                  key={img.id} 
                  className="group overflow-hidden rounded-[2rem] border-none shadow-md hover:shadow-xl transition-all duration-500 bg-zinc-50 cursor-pointer"
                  onClick={() => openLightbox('hygiene', i)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                    <Image 
                      src={img.imageUrl} 
                      alt={img.description} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        console.error("Hygiene image failed to load:", img.imageUrl, e);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-secondary font-black text-xs uppercase tracking-wider">{t.learnMore}</span>
                      <h4 className="text-white font-bold text-sm mt-1">{img.description}</h4>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal Component */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/98 backdrop-blur-md p-4 animate-in fade-in duration-300">
          {/* Top status rail */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-zinc-400 font-bold text-xs">
            <span>
              {lightboxCategory === 'edu' ? t.eduTitle : t.hygieneTitle} • {lightboxIndex + 1} / {allLightboxImages.length}
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage with Navigation */}
          <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
            {/* Prev Trigger */}
            <button 
              className="absolute left-2 md:-left-16 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
              onClick={() => setLightboxIndex((prev) => (prev - 1 + allLightboxImages.length) % allLightboxImages.length)}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Central Image Container */}
            <div className="relative w-full h-full max-w-3xl aspect-[4/3] md:aspect-auto">
              <Image 
                src={allLightboxImages[lightboxIndex]?.imageUrl} 
                alt={allLightboxImages[lightboxIndex]?.description}
                fill 
                className="object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  console.error("Lightbox image failed to load:", allLightboxImages[lightboxIndex]?.imageUrl, e);
                }}
              />
            </div>

            {/* Next Trigger */}
            <button 
              className="absolute right-2 md:-right-16 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
              onClick={() => setLightboxIndex((prev) => (prev + 1) % allLightboxImages.length)}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Description Display */}
          <div className="mt-6 text-center max-w-xl px-4">
            <h4 className="text-white font-black text-lg md:text-xl tracking-tight">
              {allLightboxImages[lightboxIndex]?.description}
            </h4>
            <p className="text-zinc-400 text-sm mt-2 font-medium">
              Registered implementation in Athani Taluk, Belagavi District. Supported by local partners.
            </p>
          </div>
        </div>
      )}

      {/* Team Section */}
      <section className="section-padding bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.25em] text-xs bg-primary/5 px-4 py-1.5 rounded-full">
              {t.teamTitle}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-tight font-headline">
              Driven by <span className="text-primary italic">Local Leadership</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium">
              {t.teamSub}
            </p>
          </div>
          
          {/* Responsive grid matching exact specifications (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {teamMembers.map((member) => {
              const img = PlaceHolderImages.find(p => p.id === member.id);
              const fallbackUrl = img ? img.imageUrl : `https://placehold.co/400x400/png?text=${encodeURIComponent(member.name)}`;
              return (
                <div key={member.id} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 text-center group flex flex-col justify-between items-center">
                  <div className="space-y-6 flex-1 flex flex-col items-center">
                    {/* Photo */}
                    <div className="relative aspect-[3/4] w-40 md:w-44 rounded-3xl overflow-hidden border-8 border-zinc-50 shadow-md group-hover:scale-105 transition-transform duration-500 bg-zinc-100">
                      <Image 
                        src={fallbackUrl} 
                        alt={member.name} 
                        fill 
                        className="object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          console.error("Team member image failed to load:", fallbackUrl, e);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight tracking-tight">
                        {member.name}
                      </h4>
                      <p className="text-primary font-black uppercase tracking-wider text-[11px] bg-primary/5 px-3 py-1 rounded-full inline-block">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-[220px]">
                      {member.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redesigned Donation Hub Section */}
      <section id="donate-section" className="section-padding bg-zinc-950 relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            
            {/* Narrative Area */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                <Heart className="w-3.5 h-3.5 fill-current text-secondary" /> {t.supportRural}
              </div>
              
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-none font-headline">
                Fuel a <span className="text-secondary italic">Grassroots Revolution</span>.
              </h2>
              
              <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl">
                Every single donation directly contributes to school learning resources, basic health workshops, and water harvesting structures in underprivileged villages across Karnataka.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { text: t.taxBenefit, desc: "Claim 50% deduction on your donation under IT Sec 80G." },
                  { text: t.receiptAvailable, desc: "Instant automated receipt sent right to your email." },
                  { text: t.secureContribution, desc: "UPI, IMPS, NEFT verified through leading banks." },
                  { text: "100% Transparency Guarantee", desc: "Access annual audits, registration files anytime." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white text-sm block">{item.text}</span>
                      <span className="text-xs text-zinc-500 font-medium">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Donation Interactivity Tabs */}
              <div className="flex flex-wrap gap-2 pt-4">
                <Button 
                  onClick={() => setDonationTab('qr')} 
                  variant={donationTab === 'qr' ? 'default' : 'outline'}
                  className={`rounded-full font-black text-xs uppercase tracking-wider h-11 px-5 ${donationTab === 'qr' ? 'bg-primary text-white' : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <QrCode className="w-4 h-4 mr-1.5" /> Donate via QR
                </Button>
                <Button 
                  onClick={() => setDonationTab('bank')} 
                  variant={donationTab === 'bank' ? 'default' : 'outline'}
                  className={`rounded-full font-black text-xs uppercase tracking-wider h-11 px-5 ${donationTab === 'bank' ? 'bg-primary text-white' : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Building className="w-4 h-4 mr-1.5" /> Bank Transfer
                </Button>
                <Button 
                  onClick={() => setDonationTab('monthly')} 
                  variant={donationTab === 'monthly' ? 'default' : 'outline'}
                  className={`rounded-full font-black text-xs uppercase tracking-wider h-11 px-5 ${donationTab === 'monthly' ? 'bg-primary text-white' : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Calendar className="w-4 h-4 mr-1.5" /> Become Monthly Donor
                </Button>
                <Link href="/csr">
                  <Button 
                    variant="outline"
                    className="rounded-full font-black text-xs uppercase tracking-wider h-11 px-5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                  >
                    <ShieldCheck className="w-4 h-4 mr-1.5" /> Corporate CSR
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive Card Presentation Stage */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl w-full max-w-[450px] border border-zinc-100 flex flex-col justify-between h-full relative overflow-hidden min-h-[460px] animate-in fade-in duration-500">
                
                {/* QR Code Presentation */}
                {donationTab === 'qr' && (
                  <div className="flex flex-col items-center gap-6 h-full justify-between">
                    {!showQR ? (
                      <div className="space-y-4 w-full">
                        <h4 className="text-zinc-950 font-black text-xl tracking-tight">{t.donationFormTitle}</h4>
                        <p className="text-zinc-500 text-xs font-medium">{t.donationFormSub}</p>
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            placeholder={t.formName} 
                            className="w-full border p-2 rounded-xl text-sm" 
                            onChange={(e) => setDonorDetails({...donorDetails, name: e.target.value})}
                          />
                          <input 
                            type="email" 
                            placeholder={t.formEmail} 
                            className="w-full border p-2 rounded-xl text-sm" 
                            onChange={(e) => setDonorDetails({...donorDetails, email: e.target.value})}
                          />
                          <input 
                            type="tel" 
                            placeholder={t.formPhone} 
                            className="w-full border p-2 rounded-xl text-sm" 
                            onChange={(e) => setDonorDetails({...donorDetails, phone: e.target.value})}
                          />
                          <Button className="w-full bg-primary" onClick={handleDonationIntent}>
                            {t.formSubmit} & View QR
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-full aspect-square max-w-[260px] bg-zinc-50 border border-zinc-100 rounded-3xl p-4 flex items-center justify-center">
                          <Image 
                            src={qrCodeImage ? qrCodeImage.imageUrl : "https://drive.google.com/uc?export=view&id=1b5QIHvv1jaoY9i3_9jjMB3N8MKh40ElL"} 
                            alt="UPI QR Code" 
                            fill 
                            className="object-contain" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              console.error("Donation QR Code image failed to load:", qrCodeImage?.imageUrl, e);
                            }}
                          />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-zinc-950 font-black text-2xl tracking-tight flex items-center justify-center gap-2">
                            <QrCode className="w-5 h-5 text-primary" /> {t.scanToDonate}
                          </p>
                          <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                            bharamun@gmail.com • UPI ID
                          </p>
                        </div>
                        <span className="bg-secondary/15 text-secondary-foreground text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-center w-full">
                          Scan via GPay, PhonePe, Paytm or BHIM
                        </span>
                        <Button variant="link" size="sm" onClick={() => setShowQR(false)}>Edit Details</Button>
                      </>
                    )}
                  </div>
                )}

                {/* Bank Details Presentation */}
                {donationTab === 'bank' && (
                  <div className="flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-zinc-950 font-black text-2xl tracking-tight border-b border-zinc-100 pb-3">Bank Transfer Details</h4>
                      <div className="space-y-4 font-medium text-sm text-zinc-700">
                        <div className="flex justify-between items-center py-1.5 border-b border-zinc-50">
                          <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider">Account Name</span>
                          <span className="font-bold text-zinc-950 text-right">Shri Padmavati Grameen Abhivruddhi Sansthe</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-zinc-50">
                          <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider">Account Number</span>
                          <span className="font-bold text-zinc-950">37123456789</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-zinc-50">
                          <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider">IFSC Code</span>
                          <span className="font-bold text-zinc-950">SBIN0021345</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-zinc-50">
                          <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider">Bank & Branch</span>
                          <span className="font-bold text-zinc-950">State Bank of India • Athani</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 italic leading-normal text-center">
                      *Please mail payment proof to bharamun@gmail.com to receive your 80G tax receipt.
                    </p>
                  </div>
                )}

                {/* Monthly Donor Program Presentation */}
                {donationTab === 'monthly' && (
                  <div className="flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-zinc-950 font-black text-2xl tracking-tight border-b border-zinc-100 pb-3">Become a Monthly Hero</h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        Continuous support lets us plan programs sustainably, build permanent sanitization units, and commit to long-term village goals.
                      </p>
                      <div className="space-y-3 pt-2">
                        {[
                          "₹500/month: Sponsors textbooks for 5 kids",
                          "₹1000/month: Funds regular hygiene audits in a school",
                          "₹2500/month: Finances digital literacy workshop series"
                        ].map((tier, i) => (
                          <div key={i} className="flex gap-2 items-center text-xs font-bold text-zinc-800 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                            <DollarSign className="w-4 h-4 text-primary shrink-0" /> {tier}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href="/#contact-section" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/95 text-white py-5 h-auto rounded-xl font-bold uppercase text-xs tracking-wider">
                        Enroll in Monthly Program
                      </Button>
                    </Link>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Contact Form & Location Section */}
      <section id="contact-section" className="section-padding bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-black uppercase tracking-[0.25em] text-xs">Stay Connected</span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 leading-none font-headline">
                  Get in Touch with Us.
                </h3>
                <p className="text-zinc-500 font-medium leading-relaxed">
                  Have questions about our 80G tax benefits, CSR proposals, or ongoing programs? Our representative office is active at Athani Taluk, Belagavi.
                </p>
              </div>

              <div className="space-y-6 text-sm font-medium text-zinc-700">
                <div className="flex gap-4 items-start p-4 bg-zinc-50 rounded-2xl border border-zinc-100/60">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-zinc-900 mb-0.5">Primary Office Address</h5>
                    <p className="text-zinc-500 leading-relaxed">Akkol Tot, Awarakhod, Athani Taluk, Belagavi District, Karnataka, India - 591304</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100/60">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h5 className="font-bold text-zinc-900 mb-0.5">Mobile Hotline</h5>
                    <p className="text-zinc-500 leading-relaxed">+91 96323 78928</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100/60">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <h5 className="font-bold text-zinc-900 mb-0.5">Email Communications</h5>
                    <p className="text-zinc-500 leading-relaxed">bharamun@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="lg:col-span-7 bg-zinc-50 p-8 md:p-12 rounded-[3rem] border border-zinc-100 shadow-sm">
              <form 
                onSubmit={handleEnquirySubmit} 
                className="space-y-6"
              >
                <h4 className="text-zinc-950 font-black text-2xl tracking-tight">Send a Direct Message</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-name">{t.formName}</label>
                    <input 
                      id="contact-name"
                      required 
                      type="text" 
                      placeholder={t.formName} 
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-email">{t.formEmail}</label>
                    <input 
                      id="contact-email"
                      required 
                      type="email" 
                      placeholder={t.formEmail} 
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-phone">{t.formPhone}</label>
                  <input 
                    id="contact-phone"
                    required 
                    type="tel" 
                    placeholder={t.formPhone} 
                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-message">{t.formMessage}</label>
                  <textarea 
                    id="contact-message"
                    required 
                    rows={4} 
                    placeholder={t.formMessage} 
                    className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-primary focus:outline-none transition-all font-medium text-sm" 
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/95 text-white py-4 h-12 rounded-xl font-bold uppercase tracking-wider text-xs">
                  {t.formSubmit}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="bg-zinc-950 text-zinc-500 py-16 md:py-24 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Column 1 - Brand description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
                  <Image 
                    src={logo ? logo.imageUrl : "https://drive.google.com/uc?export=view&id=1CrPqY4-6cK30VHR6VgdkrPKlyBlMnIXF"} 
                    alt="PGAS Logo" 
                    fill 
                    className="object-cover p-1" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      console.error("Footer logo failed to load:", logo?.imageUrl, e);
                    }}
                  />
                </div>
                <span className="text-xl font-headline font-black text-white tracking-tight">PGAS</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-medium text-zinc-400">
                Shri Padmavati Grameen Abhivruddhi Sansthe is a certified non-governmental organization working towards rural empowerment, education, and community sanitation in Athani, Karnataka.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">Quick Links</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link href="/" className="hover:text-secondary transition-colors">{t.home}</Link></li>
                <li><Link href="/gallery" className="hover:text-secondary transition-colors">{t.gallery}</Link></li>
                <li><Link href="/transparency" className="hover:text-secondary transition-colors">{t.transparency}</Link></li>
                <li><Link href="/csr" className="hover:text-secondary transition-colors">{t.csr}</Link></li>
                <li><Link href="/stories" className="hover:text-secondary transition-colors">{t.stories}</Link></li>
              </ul>
            </div>

            {/* Column 3 - i18n Selector & Contacts */}
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">{t.selectLanguage}</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(translations).map(([code, data]) => (
                  <button 
                    key={code} 
                    onClick={() => setLang(code as Language)}
                    className={`text-[11px] font-black px-4 py-2 rounded-full border transition-all ${lang === code ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'}`}
                  >
                    {data.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              © {mounted ? new Date().getFullYear() : "2026"} Shri Padmavati Grameen Abhivruddhi Sansthe. All Rights Reserved.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              NGO Darpan Registered: KA/2018/0202992 | ITA 1961 Sec 80G Certified
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 bg-primary text-white rounded-full shadow-2xl border border-white/10 hover:bg-primary/90 transition-all transform hover:scale-105 animate-in fade-in zoom-in-95"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-secondary" />
        </button>
      )}

      {/* Stateful Notification Modal */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-zinc-100 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Communication
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">{notification.title}</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{notification.message}</p>
            </div>
            <Button 
              onClick={() => setNotification(null)}
              className="w-full bg-primary hover:bg-primary/95 text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Close Notification
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

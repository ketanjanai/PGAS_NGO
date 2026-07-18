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
  AlertCircle,
  Award,
  BookOpen,
  Users,
  Check,
  Globe,
  Download,
  ExternalLink,
  FileText,
  Sprout,
  Activity
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

  // Hero Slider Configuration (7 Slides)
  const slides = [
    {
      id: 1,
      title: "Rural Education",
      tagline: "Empowering Every Child to Learn, Dream and Succeed.",
      image: "/images/hero_rural_education.jpg",
      keyword: "Learn, Dream and Succeed"
    },
    {
      id: 2,
      title: "Quality Education",
      tagline: "Every Student Deserves the Opportunity to Learn.",
      image: "/images/hero_quality_education.jpg",
      keyword: "Opportunity to Learn"
    },
    {
      id: 3,
      title: "Women Empowerment",
      tagline: "Empowered Women Build Stronger Families and Communities.",
      image: "/images/hero_women_empowerment.jpg",
      keyword: "Stronger Families"
    },
    {
      id: 4,
      title: "Accessible Healthcare",
      tagline: "Healthy Communities Are the Foundation of Progress.",
      image: "/images/hero_healthcare.jpg",
      keyword: "Foundation of Progress"
    },
    {
      id: 5,
      title: "Sustainable Livelihood",
      tagline: "Creating Opportunities for Self-Reliant Rural Communities.",
      image: "/images/hero_livelihood.jpg",
      keyword: "Self-Reliant"
    },
    {
      id: 6,
      title: "Rural Development",
      tagline: "Building Better Villages Through Collective Action.",
      image: "/images/hero_development.jpg",
      keyword: "Collective Action"
    },
    {
      id: 7,
      title: "Environmental Sustainability",
      tagline: "Protecting Nature for Future Generations.",
      image: "/images/hero_environment.jpg",
      keyword: "Future Generations"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle Enquiry Submission
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnquiryStatus('loading');
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
      setEnquiryStatus('success');
      setNotification({
        title: "Message Sent!",
        message: "Thank you for reaching out. Our team will contact you shortly."
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error saving enquiry:", error);
      setEnquiryStatus('error');
    }
  };

  // Handle Donation Intent
  const [donationStatus, setDonationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const handleDonationIntent = async () => {
    if (donorDetails.name && donorDetails.phone) {
      setDonationStatus('loading');
      try {
        await addDoc(collection(db, "donations"), {
          ...donorDetails,
          timestamp: new Date().toISOString(),
          type: donationTab,
        });
        setDonationStatus('success');
        setShowQR(true);
      } catch (error) {
        console.error("Error saving donation intent:", error);
        setDonationStatus('error');
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please enter both your name and phone number to continue.");
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

  // FAQ State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Grouped Images from direct converted Google Drive IDs
  const eduImages = PlaceHolderImages.filter(img => img.id.startsWith("edu-"));
  const hygieneImages = PlaceHolderImages.filter(img => img.id.startsWith("hygiene-"));
  const allLightboxImages = lightboxCategory === 'edu' ? eduImages : hygieneImages;

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

  const faqData = [
    {
      q: "Is PGAS a registered organization? What are its credentials?",
      a: "Yes, Shri Padmavati Grameen Abhivruddhi Sansthe is registered under the Karnataka Societies Registration Act (Reg No: KA/2018/0202992). We are also registered on NGO Darpan and hold active Sec 80G tax exemption certifications under the Income Tax Act."
    },
    {
      q: "Are donations eligible for tax exemptions under 80G?",
      a: "Absolutely! All contributions to PGAS are eligible for a 50% tax deduction under Section 80G of the Income Tax Act. Upon making a donation, please share your details so we can issue your official tax exemption receipt."
    },
    {
      q: "How does PGAS ensure transparency in its financial spending?",
      a: "We maintain 100% public accountability. Our annual financial statements are audited by independent chartered accountants, registered on the Ministry of Finance databases, and published directly on our website transparency portal for open public access."
    },
    {
      q: "Where does PGAS operate?",
      a: "Our core programs are focused in Athani Taluk, Belagavi District in North Karnataka. We operate in over 25 rural villages, working directly with local school headmasters, gram panchayats, and community self-help groups."
    },
    {
      q: "How can corporate entities partner with PGAS under CSR?",
      a: "We actively collaborate with corporate entities under Schedule VII of the Companies Act, 2013. We design and execute targeted interventions in rural education, sanitization, and tree plantations with comprehensive baseline audits and impact assessment metrics."
    }
  ];

  const successStories = [
    {
      id: "geeta",
      name: "Geeta's Dream",
      village: "Arbhal Village",
      title: "From Drop-Out to Computer Literacy Lead",
      story: "Due to family financial constraints, Geeta had to leave school early. When PGAS set up a computer literacy module in her area, she joined our free weekend batches. Today, she works as a digital assistant at the local gram panchayat and guides other young girls.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      metric: "Now Financially Self-Reliant"
    },
    {
      id: "dipti",
      name: "Dipti's Safety",
      village: "Shedbal Rural School",
      title: "Restoring Dignity, Attendance, and Hope",
      story: "High school student Dipti often missed several days of school every month due to the lack of private, functional sanitation units. PGAS constructed clean, dedicated female toilet units at her school. Regular school attendance has jumped back to 98% among high school girls.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
      metric: "+98% Regular Attendance"
    },
    {
      id: "sarita",
      name: "Sarita's Pride",
      village: "Kottalgi Village",
      title: "Self-Help Groups Unlocking Financial Freedom",
      story: "Sarita joined the PGAS Self-Help Group (SHG) training program, where she learned financial planning, savings models, and small-scale poultry farming. She secured a small micro-grant to start her own farm and now supports her children's private high school fees comfortably.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      metric: "Earns ₹8,000/month consistently"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 text-zinc-950 font-sans antialiased selection:bg-secondary/30 scroll-smooth">
      <Navbar />

      {/* Hero Section - Immersive 100vh Slider */}
      <section 
        id="hero-slider"
        className="relative h-[95vh] w-full overflow-hidden bg-zinc-950"
      >
        {/* Slides Content */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {/* Background image with Ken Burns slow zoom effect */}
            <div className={`absolute inset-0 w-full h-full transition-transform duration-[6500ms] ease-out ${index === currentSlide ? "scale-105" : "scale-100"}`}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover opacity-45"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Premium Linear Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-950/70 to-zinc-950/30 z-10" />

            {/* Slide Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-20 h-full flex items-center">
              <div className="max-w-4xl space-y-6 md:space-y-8 text-left">
                {/* Slogan pill with active indicator */}
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/15 text-secondary font-bold text-xs tracking-widest uppercase shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                  Active Rural Initiatives • Athani
                </div>
                
                {/* Dynamic Heading with accent word highlight */}
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tight font-sans">
                  {slide.title.split(" ").map((word, wIdx) => (
                    <span key={wIdx} className={wIdx === 0 ? "text-white" : "text-emerald-400 font-serif italic font-normal ml-3"}>
                      {word}{" "}
                    </span>
                  ))}
                </h1>

                {/* Subheading / Tagline */}
                <p className="text-lg md:text-2xl text-zinc-200 max-w-2xl leading-relaxed font-light">
                  {slide.tagline}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="#impact-overview">
                    <Button size="lg" className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-500 text-base px-8 py-6 rounded-full shadow-2xl h-auto font-bold transition-all border border-emerald-500">
                      Our Impact <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="#donate-section">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 text-base px-8 py-6 rounded-full h-auto font-bold transition-all">
                      Support Our Mission
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Slide Controls (Left/Right arrow) */}
        <div className="absolute bottom-10 right-6 md:right-12 flex gap-3 z-30">
          <button 
            onClick={handlePrevSlide}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNextSlide}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Play/Pause controls */}
        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-6 z-30">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-sm"
            aria-label={isPlaying ? "Pause slider" : "Play slider"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Carousel Indicator Dots */}
          <div className="hidden sm:flex gap-2.5">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentSlide(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${dotIdx === currentSlide ? "w-8 bg-emerald-400" : "w-2 bg-white/30"}`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom scroll-down indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-black">Scroll Down</p>
        </div>
      </section>

      {/* Section 2: Impact Overview (Counter Dashboard) */}
      <section id="impact-overview" className="py-24 bg-white relative border-b border-zinc-100">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Measurable Progress
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Transforming Rural Lives in <span className="text-emerald-600 font-serif italic">Belagavi</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              We focus on building long-term local capacity, sustainable systems, and empowering communities directly with transparent stewardship.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            
            {/* Stat 1 */}
            <div className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center flex flex-col justify-between">
              <div className="p-3 bg-emerald-100/60 text-emerald-700 rounded-2xl w-fit mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-950">25+</h3>
                <p className="text-xs uppercase font-black tracking-widest text-zinc-400 mt-2">Villages Served</p>
              </div>
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">Active hubs in Athani Taluk</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center flex flex-col justify-between">
              <div className="p-3 bg-emerald-100/60 text-emerald-700 rounded-2xl w-fit mx-auto mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-950">15,000+</h3>
                <p className="text-xs uppercase font-black tracking-widest text-zinc-400 mt-2">Students Assisted</p>
              </div>
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">Textbooks & stationery kits</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center flex flex-col justify-between">
              <div className="p-3 bg-emerald-100/60 text-emerald-700 rounded-2xl w-fit mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-950">40+</h3>
                <p className="text-xs uppercase font-black tracking-widest text-zinc-400 mt-2">Schools Equipped</p>
              </div>
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">Dedicated girl's sanitation</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center flex flex-col justify-between">
              <div className="p-3 bg-emerald-100/60 text-emerald-700 rounded-2xl w-fit mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-950">5,000+</h3>
                <p className="text-xs uppercase font-black tracking-widest text-zinc-400 mt-2">Women Trained</p>
              </div>
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">Financial freedom training</p>
            </div>

            {/* Stat 5 */}
            <div className="bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100 shadow-sm text-center flex flex-col justify-between col-span-2 md:col-span-1">
              <div className="p-3 bg-emerald-100/60 text-emerald-700 rounded-2xl w-fit mx-auto mb-4">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-950">2,000+</h3>
                <p className="text-xs uppercase font-black tracking-widest text-zinc-400 mt-2">Trees Planted</p>
              </div>
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">Afforestation drives executed</p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Vision & Mission (Side-by-Side Elegant Layout) */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual block with custom quote */}
            <div className="space-y-6 relative">
              <div className="absolute top-0 left-0 text-zinc-200 text-[10rem] font-serif leading-none select-none -translate-y-12 -translate-x-4">“</div>
              <h3 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight relative z-10 font-sans">
                Empowering Through <span className="text-emerald-600 italic font-serif font-normal">Dignity</span>, Not Charity.
              </h3>
              <p className="text-zinc-600 leading-relaxed font-medium relative z-10">
                At Shri Padmavati Grameen Abhivruddhi Sansthe, we believe true transformation comes from unlocking opportunities. Our projects are designed by local leaders who understand the unique socio-economic landscape of North Karnataka, fostering long-term resilience rather than short-term dependence.
              </p>
              <div className="flex gap-4 items-center pt-4 relative z-10">
                <Link href="/about">
                  <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-6 font-bold h-12 text-sm shadow-md">
                    Learn Our History <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Vision and Mission side-by-side cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Vision Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg font-serif">V</div>
                  <h4 className="text-xl font-bold text-zinc-950 font-sans">Our Vision</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    To build a self-reliant, literate, and healthy rural society where every child gets equal learning pathways and every household lives with high dignity.
                  </p>
                </div>
                <div className="pt-6 border-t border-zinc-100 mt-6 text-xs text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Grounded in local values
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg font-serif">M</div>
                  <h4 className="text-xl font-bold text-zinc-950 font-sans">Our Mission</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    To facilitate accessible quality education, sustainable sanitation, healthcare access, and gender self-reliance through structured, transparent, community-led programs.
                  </p>
                </div>
                <div className="pt-6 border-t border-zinc-100 mt-6 text-xs text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Active grassroots focus
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Section 4: Core Focus Areas (Our Programs Grid Aligned to SDGs) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Areas of Intervention
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Structured Interventions for <span className="text-emerald-600 font-serif italic">Global Goals</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              Our rural initiatives are designed in strict alignment with the United Nations Sustainable Development Goals (SDGs).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Education */}
            <div className="p-8 bg-zinc-50 hover:bg-white rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-emerald-100/60 text-emerald-700 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 bg-zinc-200/50 px-3 py-1 rounded-full">SDG 4</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Quality Education</h4>
                  <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-medium">
                    Distributing core text-books, comprehensive study materials, smart learning aids, and establishing primary classroom tables.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-100 text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Education Projects <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Card 2: Gender Equality */}
            <div className="p-8 bg-zinc-50 hover:bg-white rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-amber-100/60 text-amber-700 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 bg-zinc-200/50 px-3 py-1 rounded-full">SDG 5</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Women Empowerment</h4>
                  <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-medium">
                    Structuring village self-help savings groups, micro-financing links, local entrepreneurship programs, and leadership training.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-100 text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Self-Help Programs <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Card 3: Health & Wellbeing */}
            <div className="p-8 bg-zinc-50 hover:bg-white rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-rose-100/60 text-rose-700 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 bg-zinc-200/50 px-3 py-1 rounded-full">SDG 3</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Good Health</h4>
                  <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-medium">
                    Organizing medical check-up drives, maternal health awareness campaigns, distribution of pediatric support, and health camps.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-100 text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Healthcare Campaigns <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Card 4: Clean Water & Sanitation */}
            <div className="p-8 bg-zinc-50 hover:bg-white rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-blue-100/60 text-blue-700 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 bg-zinc-200/50 px-3 py-1 rounded-full">SDG 6</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Water & Sanitation</h4>
                  <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-medium">
                    Building clean, separate private washroom facilities for female students in rural schools and promoting village sanitation audits.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-100 text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Sanitization Audits <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Card 5: Decent Work & Livelihood */}
            <div className="p-8 bg-zinc-50 hover:bg-white rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-teal-100/60 text-teal-700 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Building className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 bg-zinc-200/50 px-3 py-1 rounded-full">SDG 8</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Decent Livelihoods</h4>
                  <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-medium">
                    Structuring agricultural workshops, composting training, supporting local weavers and small trades with technical guidance.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-100 text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Vocational Trainings <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Card 6: Climate Action */}
            <div className="p-8 bg-zinc-50 hover:bg-white rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-lime-100/60 text-lime-700 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400 bg-zinc-200/50 px-3 py-1 rounded-full">SDG 13</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Climate Action</h4>
                  <p className="text-zinc-500 text-sm mt-3 leading-relaxed font-medium">
                    Promoting afforestation tree plantations, village water-conservation ponds, eco-friendly farming, and solar energy options.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-100 text-xs font-bold text-emerald-600 flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Environment Drives <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section 5: Real-world Visual Proof / Photo Gallery with Lightbox */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                Visual Impact Logs
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Our Work Captured <span className="text-emerald-600 font-serif italic">in Action</span>
              </h2>
              <p className="text-zinc-500 font-medium">
                Browse our real implementation photographs in Athani, Belagavi district. Click on any image to open the high-resolution lightbox.
              </p>
            </div>
            <Link href="/gallery">
              <Button variant="outline" className="border-zinc-300 hover:bg-zinc-100 font-bold rounded-full px-6 py-5 h-auto text-sm">
                Open Full Gallery <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Education list */}
          <div className="space-y-8 mb-16">
            <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-bold text-zinc-900">Rural Education Initiatives</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {eduImages.slice(0, 4).map((img, idx) => (
                <div 
                  key={img.id}
                  onClick={() => openLightbox('edu', idx)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:shadow-lg transition-all"
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-xs text-white font-bold">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sanitation list */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-zinc-200 pb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-bold text-zinc-900">Health, Hygiene & Sanitization</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {hygieneImages.slice(0, 4).map((img, idx) => (
                <div 
                  key={img.id}
                  onClick={() => openLightbox('hygiene', idx)}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:shadow-lg transition-all"
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-xs text-white font-bold">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 6: Stories of Change (Real Success Profiles) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Grassroots Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Stories of <span className="text-emerald-600 font-serif italic">Change</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              Real human impact and transformative pathways unlocked by our donors and field coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((item) => (
              <Card key={item.id} className="bg-zinc-50 rounded-[2.5rem] border border-zinc-100 overflow-hidden shadow-sm flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-60 w-full overflow-hidden bg-zinc-100 border-b border-zinc-150">
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-emerald-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-md">
                    {item.metric}
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xl text-zinc-950 font-sans">{item.name}</h4>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{item.village}</span>
                    </div>
                    <h5 className="text-emerald-700 font-extrabold text-sm uppercase tracking-wider">{item.title}</h5>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">"{item.story}"</p>
                  </div>
                  <div className="pt-6 border-t border-zinc-200/60 mt-6 text-xs text-zinc-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> Ground verified by PGAS coordinator
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Section 7: Our Dedicated Team (Meet the Leaders - Driven by Local Leadership) */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-150">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Grounded Governance
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Driven by <span className="text-emerald-600 font-serif italic">Local Leadership</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              Meet the visionary social workers and community development experts guiding Shri Padmavati Grameen Abhivruddhi Sansthe.
            </p>
          </div>

          {/* Grid layout matching desktop 4, tablet 2, mobile 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PlaceHolderImages.filter(img => ["chairman", "member-pooja", "member-prashant", "member-jyotiba"].includes(img.id)).map((member) => {
              // Custom Descriptions
              let desc = "";
              let role = "";
              let name = "";
              if (member.id === "chairman") {
                name = "Shri Bharamappa Nandaganv";
                role = "Chairman";
                desc = "Visionary leader with 15+ years of rural structural development experience in North Karnataka.";
              } else if (member.id === "member-pooja") {
                name = "Mrs. Pooja Nandaganv";
                role = "Secretary";
                desc = "Strong advocate for rural women self-reliance and mother-child immunization campaigns.";
              } else if (member.id === "member-prashant") {
                name = "Shri Prashant Ladagi";
                role = "Board Member";
                desc = "Fostering school sanitation models, water supply audits, and clean hygiene awareness.";
              } else if (member.id === "member-jyotiba") {
                name = "Shri Jyotiba Akkol";
                role = "Board Member";
                desc = "Connecting remote village schools with basic textbook distribution programs.";
              }

              return (
                <div key={member.id} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group flex flex-col justify-between items-center">
                  <div className="flex-1 flex flex-col items-center">
                    {/* Picture */}
                    <div className="relative aspect-[3/4] w-40 rounded-3xl overflow-hidden border-8 border-zinc-50 shadow-md group-hover:scale-105 transition-transform duration-500 bg-zinc-100 mb-6">
                      <Image 
                        src={member.imageUrl} 
                        alt={name} 
                        fill 
                        className="object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-zinc-900 leading-tight">{name}</h4>
                      <p className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px] bg-emerald-50 px-3 py-1 rounded-full inline-block">
                        {role}
                      </p>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium mt-3 px-2">
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary Team Card with additional members */}
          <div className="mt-12 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-zinc-150 text-center max-w-4xl mx-auto">
            <h4 className="text-lg font-bold text-zinc-800 mb-4">Advisory Board & Supporting Members</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="bg-zinc-100 hover:bg-zinc-200/80 cursor-default px-4 py-2 rounded-full text-xs font-bold text-zinc-600 transition-colors">Shri Shridhar Gadale (Regulatory & Audits)</span>
              <span className="bg-zinc-100 hover:bg-zinc-200/80 cursor-default px-4 py-2 rounded-full text-xs font-bold text-zinc-600 transition-colors">Shri Vidyanand Nadagoud (Agricultural Liaison)</span>
              <span className="bg-zinc-100 hover:bg-zinc-200/80 cursor-default px-4 py-2 rounded-full text-xs font-bold text-zinc-600 transition-colors">Shri Chandrakanth Kagawad (Digital Coordinator)</span>
            </div>
          </div>

        </div>
      </section>

      {/* Section 8: Frequently Asked Questions (FAQ Accordion) */}
      <section className="py-24 bg-white relative border-t border-zinc-100">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Clear Clarifications
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Frequently Asked <span className="text-emerald-600 font-serif italic">Questions</span>
            </h2>
            <p className="text-zinc-500 font-medium leading-relaxed">
              Find instant answers regarding our regulatory registrations, tax exemption benefits, and operational models.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="border border-zinc-150 rounded-[1.5rem] bg-zinc-50 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm md:text-base text-zinc-950 focus:outline-none bg-zinc-50 hover:bg-zinc-100/60 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 p-1.5 bg-white border border-zinc-200 rounded-full shrink-0">
                    {activeFaq === index ? <X className="w-4 h-4 text-emerald-600" /> : <ArrowRight className="w-4 h-4 text-zinc-400 rotate-90" />}
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 overflow-hidden ${activeFaq === index ? "max-h-60 border-t border-zinc-150" : "max-h-0"}`}
                >
                  <p className="p-6 text-sm text-zinc-500 leading-relaxed font-medium bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 9: Transparency & Trust (Downloadable Annual Reports, Sec 80G, NGO Darpan Card) */}
      <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full filter blur-[120px] select-none pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full filter blur-[80px] select-none pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-400 font-bold uppercase tracking-[0.25em] text-xs bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              Ethical Governance
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Transparency & <span className="text-emerald-400 font-serif italic">Stewardship</span>
            </h2>
            <p className="text-zinc-400 font-light text-lg">
              We are committed to full compliance, audits, and open data. Access our certificates and reports at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: Legal Registrations */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
              <div className="p-3 bg-white/5 text-emerald-400 rounded-2xl w-fit">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Official Registrations</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  Fully accredited with central regulatory directories for non-profits in India.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-zinc-300">
                  <span>NGO Darpan ID</span>
                  <span className="text-secondary font-mono">KA/2018/0202992</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-300">
                  <span>PAN Registration</span>
                  <span className="text-secondary font-mono">AABAS***7E</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-300">
                  <span>Societies Act Reg</span>
                  <span className="text-secondary font-mono">KA/BLG/2018</span>
                </div>
              </div>
            </div>

            {/* Box 2: Sec 80G Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
              <div className="p-3 bg-white/5 text-amber-400 rounded-2xl w-fit">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">50% Tax Relief (Sec 80G)</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  We are certified under Section 80G of the Income Tax Act, 1961. Issue of digital 10BE certificate forms for standard deduction filings.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Active certification</span>
                <span className="bg-emerald-500/15 text-emerald-400 font-black text-[9px] px-2.5 py-1 rounded-full uppercase">Approved</span>
              </div>
            </div>

            {/* Box 3: Audit Reports */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
              <div className="p-3 bg-white/5 text-sky-400 rounded-2xl w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Independent Audit Reports</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                  Independent third-party audits uploaded annually. Download official financial ledger details directly.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-2">
                <a 
                  href="/transparency"
                  className="flex items-center justify-between text-xs font-bold text-zinc-300 hover:text-white group p-1 transition-colors"
                >
                  <span>Download Annual Report FY23-24</span>
                  <Download className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                </a>
                <a 
                  href="/transparency"
                  className="flex items-center justify-between text-xs font-bold text-zinc-300 hover:text-white group p-1 transition-colors"
                >
                  <span>Download Annual Report FY22-23</span>
                  <Download className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section 10: Partners & Supporters (Ticker/Grid) */}
      <section className="py-20 bg-zinc-50 border-b border-zinc-250">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-md mx-auto mb-10">
            <h4 className="text-xs uppercase font-black text-zinc-400 tracking-[0.2em]">Our Network of Trust</h4>
            <p className="text-sm font-bold text-zinc-600 mt-2">Collaborating with local authorities, CSR trusts, and community groups</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-75">
            <div className="font-extrabold text-zinc-400 tracking-tighter text-lg md:text-xl font-serif">GOVERNMENT OF KARNATAKA</div>
            <div className="font-extrabold text-zinc-400 tracking-tighter text-lg md:text-xl font-sans">BELAGAVI PANCHAYAT</div>
            <div className="font-extrabold text-zinc-400 tracking-tighter text-lg md:text-xl font-serif">ATHANI CSR TRUST</div>
            <div className="font-extrabold text-zinc-400 tracking-tighter text-lg md:text-xl font-sans">KOTTALGI CO-OPERATIVE</div>
          </div>
        </div>
      </section>

      {/* Section 11: Donation Hub (Interactive Tabs: QR, Bank, CSR) */}
      <section id="donate-section" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info Card on Left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                Support Rural Growth
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Make a Direct <span className="text-emerald-600 font-serif italic">Impact Today</span>
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Your contributions directly translate into study books, girl's sanitation cubicles, healthcare checkups, and village afforestation modules in Athani.
              </p>

              <div className="space-y-4 pt-4 text-sm font-medium">
                <div className="flex items-center gap-3 text-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Certified 50% Tax Relief (Sec 80G Form 10BE)</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% Direct spending on school resources</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Digital Receipts dispatched instantly</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/60 p-6 rounded-3xl mt-8">
                <h4 className="font-bold text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Sec 80G Tax Exemption Info
                </h4>
                <p className="text-amber-700/90 text-xs mt-2 leading-relaxed">
                  In compliance with Income Tax regulations, please provide your PAN number in the donation communication notes or email us your details at bharamun@gmail.com to receive your digital Form 10BE tax exemption receipt.
                </p>
              </div>
            </div>

            {/* Donation Form and Options on Right */}
            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-100 shadow-sm rounded-[3rem] p-8 md:p-12 space-y-8">
              
              {/* Tab Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2 border-b border-zinc-200">
                <button
                  onClick={() => { setDonationTab('qr'); setShowQR(false); }}
                  className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${donationTab === 'qr' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/60'}`}
                >
                  UPI QR Code
                </button>
                <button
                  onClick={() => { setDonationTab('bank'); setShowQR(false); }}
                  className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${donationTab === 'bank' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/60'}`}
                >
                  Bank Transfer
                </button>
                <button
                  onClick={() => { setDonationTab('monthly'); setShowQR(false); }}
                  className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${donationTab === 'monthly' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/60'}`}
                >
                  Monthly Support
                </button>
                <button
                  onClick={() => { setDonationTab('csr'); setShowQR(false); }}
                  className={`py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${donationTab === 'csr' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/60'}`}
                >
                  Corporate CSR
                </button>
              </div>

              {/* Tab 1 Content: QR Code */}
              {donationTab === 'qr' && (
                <div className="space-y-6">
                  {!showQR ? (
                    <div className="space-y-4">
                      <h4 className="text-zinc-900 font-bold text-xl">Donor Identification</h4>
                      <p className="text-zinc-500 text-xs">Kindly share your contact details to generate the unique contribution portal.</p>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Your Full Name"
                          value={donorDetails.name}
                          onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm font-medium"
                        />
                        <input
                          type="email"
                          placeholder="Your Email Address"
                          value={donorDetails.email}
                          onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm font-medium"
                        />
                        <input
                          type="tel"
                          placeholder="Your Phone Number"
                          value={donorDetails.phone}
                          onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all text-sm font-medium"
                        />
                      </div>

                      <Button 
                        onClick={handleDonationIntent}
                        disabled={donationStatus === 'loading'}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
                      >
                        {donationStatus === 'loading' ? 'Generating QR...' : 'Proceed to Scan QR Code'}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-6 p-4 bg-white border border-zinc-150 rounded-3xl">
                      <h4 className="font-bold text-zinc-900 text-lg">Scan & Donate Instantly</h4>
                      <p className="text-zinc-400 text-xs">Scan the official merchant QR below using any UPI app (GPay, PhonePe, Paytm, BHIM).</p>
                      <div className="relative w-48 h-48 mx-auto border-4 border-zinc-50 rounded-2xl overflow-hidden shadow-md">
                        <Image
                          src={qrCodeImage ? qrCodeImage.imageUrl : "https://drive.google.com/uc?export=view&id=1b5QIHvv1jaoY9i3_9jjMB3N8MKh40ElL"}
                          alt="Donation QR Code"
                          fill
                          className="object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-xs space-y-1 font-bold text-zinc-500">
                        <p className="text-zinc-800">Merchant Name: SHRI PADMAVATI GRAMEEN ABHIVRUDDHI</p>
                        <p className="font-mono">UPI VPA: upi@bhumidonations (Direct Bank Settlement)</p>
                      </div>
                      <Button
                        onClick={() => setShowQR(false)}
                        variant="outline"
                        className="text-xs font-bold text-zinc-500"
                      >
                        Go Back / Edit Details
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2 Content: Bank Details */}
              {donationTab === 'bank' && (
                <div className="space-y-6">
                  <h4 className="text-zinc-900 font-bold text-xl">Direct Bank Wire Details</h4>
                  <p className="text-zinc-500 text-xs">For larger contributions, corporate funds, and direct NEFT / RTGS transfers.</p>
                  
                  <div className="bg-white p-6 rounded-2xl border border-zinc-150 space-y-4 text-sm font-medium text-zinc-700">
                    <div className="flex justify-between py-2 border-b border-zinc-100">
                      <span className="text-zinc-400">Account Name</span>
                      <span className="text-zinc-900 font-bold text-right">Shri Padmavati Grameen Abhivruddhi Sansthe</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100">
                      <span className="text-zinc-400">Bank Name</span>
                      <span className="text-zinc-900 font-bold text-right">State Bank of India (SBI)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-100">
                      <span className="text-zinc-400">Account Number</span>
                      <span className="text-zinc-900 font-mono font-bold text-right">38312019201 (Current Account)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-zinc-400">IFSC Code</span>
                      <span className="text-zinc-900 font-mono font-bold text-right">SBIN0012392 (Athani Branch)</span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-[11px] leading-relaxed italic">
                    Note: After making a wire transfer, please email your transaction slip to bharamun@gmail.com along with your PAN details to receive your 80G tax exemption form.
                  </p>
                </div>
              )}

              {/* Tab 3 Content: Monthly Donor */}
              {donationTab === 'monthly' && (
                <div className="space-y-6">
                  <h4 className="text-zinc-900 font-bold text-xl">Become a Monthly Sponsor</h4>
                  <p className="text-zinc-500 text-xs">Sustained monthly contributions help us budget educational resources effectively for upcoming sessions.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-6 bg-white border border-zinc-150 rounded-2xl text-center hover:border-emerald-500 transition-all cursor-pointer">
                      <span className="text-xs uppercase font-black text-zinc-400">Sponsor a Child</span>
                      <h5 className="text-xl font-bold text-zinc-950 mt-2">₹500 / mo</h5>
                      <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">Covers textbook kit, digital tests & basic stationery</p>
                    </div>
                    <div className="p-6 bg-white border border-zinc-150 rounded-2xl text-center hover:border-emerald-500 transition-all cursor-pointer">
                      <span className="text-xs uppercase font-black text-zinc-400">Sponsor a Class</span>
                      <h5 className="text-xl font-bold text-zinc-950 mt-2">₹2,500 / mo</h5>
                      <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">Covers learning books, smart kits for 10 school kids</p>
                    </div>
                    <div className="p-6 bg-white border border-zinc-150 rounded-2xl text-center hover:border-emerald-500 transition-all cursor-pointer">
                      <span className="text-xs uppercase font-black text-zinc-400">Sanitation Support</span>
                      <h5 className="text-xl font-bold text-zinc-950 mt-2">₹5,000 / mo</h5>
                      <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">Covers maintenance audits of 5 rural girl's washrooms</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Our field coordinators send detailed bi-monthly progress reports directly to monthly sponsors.
                  </div>
                </div>
              )}

              {/* Tab 4 Content: Corporate CSR */}
              {donationTab === 'csr' && (
                <div className="space-y-6">
                  <h4 className="text-zinc-900 font-bold text-xl">Corporate CSR Partnerships</h4>
                  <p className="text-zinc-500 text-xs">We work closely with corporate CSR groups to implement customized, high-compliance rural infrastructure audits.</p>
                  
                  <div className="p-6 bg-white rounded-2xl border border-zinc-150 space-y-4 text-sm font-medium text-zinc-700">
                    <p className="leading-relaxed">
                      We offer targeted Schedule VII project blueprints, transparent baseline-line surveys, comprehensive milestone reports, and quarterly impact sheets for corporate board reporting.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <a href="mailto:bharamun@gmail.com" className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase px-5 py-3 rounded-full tracking-wider transition-all inline-block text-center shadow-md">
                        Contact CSR Officer
                      </a>
                      <a href="/csr" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs uppercase px-5 py-3 rounded-full tracking-wider transition-all inline-block text-center">
                        Explore CSR Portal
                      </a>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Section 12: Interactive Contact & Location Map */}
      <section id="contact-section" className="py-24 bg-zinc-50 border-t border-zinc-150">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Details on Left */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4 text-left">
                <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                  Direct Communications
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight font-sans">
                  Get in <span className="text-emerald-600 font-serif italic">Touch</span>
                </h2>
                <p className="text-zinc-500 font-medium">
                  Have questions, feedback, or would like to volunteer? Reach out directly via our official communication lines.
                </p>
              </div>

              <div className="space-y-4 text-sm font-medium">
                
                {/* Addr */}
                <div className="flex gap-4 items-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-zinc-900 mb-0.5">Registered Headquarters</h5>
                    <p className="text-zinc-500 leading-relaxed text-xs">Shri Padmavati Grameen Abhivruddhi Sansthe, Athani, Belagavi District, Karnataka - 591304</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-zinc-900 mb-0.5">Telephone Hotline</h5>
                    <p className="text-zinc-500 leading-relaxed text-xs">+91 9448831201 / +91 9901452291</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-center p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-zinc-900 mb-0.5">Official Inquiries</h5>
                    <p className="text-zinc-500 leading-relaxed text-xs">bharamun@gmail.com</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form on Right */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] border border-zinc-100 shadow-md">
              <form 
                onSubmit={handleEnquirySubmit} 
                className="space-y-6"
              >
                <h4 className="text-zinc-950 font-black text-2xl tracking-tight">Send a Direct Message</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-name">Full Name</label>
                    <input 
                      id="contact-name"
                      required 
                      type="text" 
                      placeholder="Your Full Name" 
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-medium text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-email">Email Address</label>
                    <input 
                      id="contact-email"
                      required 
                      type="email" 
                      placeholder="Your Email Address" 
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-medium text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-phone">Phone Number</label>
                  <input 
                    id="contact-phone"
                    required 
                    type="tel" 
                    placeholder="Your Phone Number" 
                    className="w-full h-12 px-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-medium text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider" htmlFor="contact-message">Your Message</label>
                  <textarea 
                    id="contact-message"
                    required 
                    rows={4} 
                    placeholder="Write your query or message here..." 
                    className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-medium text-sm" 
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={enquiryStatus === 'loading'}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
                >
                  {enquiryStatus === 'loading' ? 'Submitting Message...' : 'Submit Message'}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="bg-zinc-950 text-zinc-500 py-16 md:py-24 border-t border-white/5 relative">
        <div className="container mx-auto px-6 md:px-12">
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
                  />
                </div>
                <span className="text-xl font-sans font-black text-white tracking-tight">PGAS</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-medium text-zinc-400">
                Shri Padmavati Grameen Abhivruddhi Sansthe is a certified non-governmental organization working towards rural empowerment, education, and community sanitation in Athani, Karnataka.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">Quick Links</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
                <li><Link href="/transparency" className="hover:text-secondary transition-colors">Transparency</Link></li>
                <li><Link href="/csr" className="hover:text-secondary transition-colors">CSR Portal</Link></li>
                <li><Link href="/stories" className="hover:text-secondary transition-colors">Impact Stories</Link></li>
              </ul>
            </div>

            {/* Column 3 - Registration and contact */}
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase text-xs tracking-[0.2em]">Our Registration</h4>
              <p className="text-sm leading-relaxed text-zinc-400">
                NGO Darpan Registration: KA/2018/0202992<br />
                Income Tax Act Sec 80G Certified Non-profit.<br />
                HQ: Athani Taluk, Belagavi, Karnataka
              </p>
            </div>

          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              © {mounted ? new Date().getFullYear() : "2026"} Shri Padmavati Grameen Abhivruddhi Sansthe. All Rights Reserved.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Grounded NGO Development Project Athani
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-2xl border border-white/10 hover:bg-emerald-500 transition-all transform hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-secondary" />
        </button>
      )}

      {/* Stateful Notification Modal */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-zinc-100 shadow-2xl space-y-6 relative">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Communication
              </div>
              <h3 className="text-2xl font-black tracking-tight text-zinc-900">{notification.title}</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{notification.message}</p>
            </div>
            <Button 
              onClick={() => setNotification(null)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Close Notification
            </Button>
          </div>
        </div>
      )}

      {/* Lightbox Modal Component */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/98 backdrop-blur-md p-4 animate-in fade-in duration-300">
          {/* Top status rail */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-zinc-400 font-bold text-xs">
            <span>
              {lightboxCategory === 'edu' ? "Rural Education" : "Sanitation & Hygiene"} • {lightboxIndex + 1} / {allLightboxImages.length}
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Close"
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

    </div>
  );
}

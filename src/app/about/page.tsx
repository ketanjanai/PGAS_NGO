"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building,
  Calendar,
  Award,
  BookOpen,
  Users,
  Check,
  Globe,
  Download,
  Sprout,
  Activity,
  HeartHandshake
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  // Full 7-Member Team data mapped directly to PlaceHolderImages IDs
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
      desc: "Strong advocate for rural women self-reliance, microfinance models, and mother-child immunization campaigns." 
    },
    { 
      id: "member-prashant", 
      name: "Shri Prashant Ladagi", 
      role: "Board Member", 
      desc: "Spearheading school sanitation units, community hygiene audits, and clean drinking water access pipelines." 
    },
    { 
      id: "member-jyotiba", 
      name: "Shri Jyotiba Akkol", 
      role: "Board Member", 
      desc: "Directing primary student reach programs, rural learning kits distribution, and textbook resource allocation." 
    },
    { 
      id: "member-shridhar", 
      name: "Shri Shridhar Gadale", 
      role: "Board Member", 
      desc: "Overseeing non-profit legal compliances, annual auditing transparency, and public reporting frameworks." 
    },
    { 
      id: "member-vidyanand", 
      name: "Shri Vidyanand Nadagoud", 
      role: "Board Member", 
      desc: "Connecting PGAS initiatives with agricultural training workshops, composting methods, and soil health audits." 
    },
    { 
      id: "member-chandrakanth", 
      name: "Shri Chandrakanth Kagawad", 
      role: "Board Member", 
      desc: "Youth development officer facilitating digital inclusion audits and community computer training batches." 
    },
  ];

  const logo = PlaceHolderImages.find(img => img.id === "pgas-logo");

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 text-zinc-950 font-sans antialiased selection:bg-secondary/30 scroll-smooth">
      <Navbar />
      
      {/* Immersive Hero Header */}
      <section className="relative bg-zinc-950 text-white py-24 md:py-36 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full opacity-35">
          <Image 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop" 
            alt="Rural Education Impact Background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Deep emerald linear gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40 z-10" />

        <div className="container mx-auto px-6 md:px-12 relative z-20 text-center max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <HeartHandshake className="w-3.5 h-3.5" /> Empowering Rural Karnataka
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight font-sans">
            Our Legacy & <span className="text-emerald-400 font-serif italic font-normal">Commitment</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
            Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) is a grassroots non-governmental organization dedicated to bridging socio-economic gaps through quality education, community health, and sustainable development.
          </p>
        </div>
      </section>

      {/* Section 2: Vision & Mission (Comprehensive Side-by-Side) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6 text-left">
              <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                Ethical Stewardship
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Grounded in Dignity, <span className="text-emerald-600 font-serif italic">Driven by Purpose</span>
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed font-medium">
                <p>
                  Founded in Athani, Belagavi district, our sansthe has worked at the intersection of non-profit advocacy, community-led sanitation, and youth literacy. We firmly believe that sustainable development cannot be imposed from the outside; it must be built alongside local schools, gram panchayats, and self-help coordinators.
                </p>
                <p>
                  Every rupee received by PGAS is deployed with high fiscal responsibility to build durable assets: girls' washroom cubicles, high-quality textbooks, local farm audits, and vocational skills.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="/#donate-section">
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 font-bold h-12 shadow-md">
                    Become a Partner <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vision Card */}
              <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg font-serif">V</div>
                  <h4 className="text-xl font-bold text-zinc-950">Our Vision</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    To build a self-reliant, literate, and healthy rural society where every child gets equal learning pathways and every household lives with high dignity.
                  </p>
                </div>
                <div className="pt-6 border-t border-zinc-200/60 mt-6 text-xs text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Grounded in local values
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg font-serif">M</div>
                  <h4 className="text-xl font-bold text-zinc-950 font-sans">Our Mission</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    To facilitate accessible quality education, sustainable sanitation, healthcare access, and gender self-reliance through structured, transparent, community-led programs.
                  </p>
                </div>
                <div className="pt-6 border-t border-zinc-200/60 mt-6 text-xs text-amber-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" /> Active grassroots focus
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Areas We Work In (6 SDG Bento Cards) */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Grounded Action Hubs
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Our Core <span className="text-emerald-600 font-serif italic">Operational Focus Areas</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              We manage structured programs directly serving rural children, women, and farmers across Belagavi district.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Area 1: Education */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-150 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl w-fit">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Rural Education</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium mt-2">
                    Delivering modern textbook kits, notebooks, desks, and smart-learning projectors to remote schools, combating early dropouts.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100 mt-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Aligned with UN SDG 4
              </div>
            </div>

            {/* Area 2: Health */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-150 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-6">
                <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl w-fit">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Accessible Healthcare</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium mt-2">
                    Running mobile rural medical camps, distributing essential pediatric care kits, and maternal wellness workshops.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100 mt-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Aligned with UN SDG 3
              </div>
            </div>

            {/* Area 3: Sanitation */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-150 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 text-blue-700 rounded-2xl w-fit">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Sanitation & Hygiene</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium mt-2">
                    Constructing private, clean separate washrooms for girls in high schools and driving village-wide handwashing hygiene audits.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100 mt-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Aligned with UN SDG 6
              </div>
            </div>

            {/* Area 4: Women */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-150 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Women Empowerment</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium mt-2">
                    Fostering active self-help groups (SHGs), microfinance credit linkages, and skill workshops for tailoring and rural poultry.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100 mt-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Aligned with UN SDG 5
              </div>
            </div>

            {/* Area 5: Livelihood */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-150 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-6">
                <div className="p-4 bg-teal-50 text-teal-700 rounded-2xl w-fit">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Sustainable Livelihoods</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium mt-2">
                    Conducting organic composting audits and supporting village artisans and cottage industries to gain fair trade linkages.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100 mt-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Aligned with UN SDG 8
              </div>
            </div>

            {/* Area 6: Environment */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-150 hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-6">
                <div className="p-4 bg-lime-50 text-lime-700 rounded-2xl w-fit">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-950">Climate & Environment</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium mt-2">
                    Planting local forest saplings, executing rainwater recharging pits, and driving rural youth clean-energy advocacy campaigns.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100 mt-8 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Aligned with UN SDG 13
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section 4: Driven by Local Leadership (Complete 7-Member Team Section) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-700 font-black uppercase tracking-[0.25em] text-xs bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              Grounded Governance
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              Our Dedicated Team Driven by <span className="text-emerald-600 font-serif italic">Local Leadership</span>
            </h2>
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              Meet the visionary social workers, leaders, and regulatory coordinators behind Shri Padmavati Grameen Abhivruddhi Sansthe.
            </p>
          </div>

          {/* Grid Layout matching desktop 4, tablet 2, mobile 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => {
              const img = PlaceHolderImages.find(p => p.id === member.id);
              // Fallback image url if not found in list
              const imageUrl = img ? img.imageUrl : `https://placehold.co/400x400/png?text=${encodeURIComponent(member.name)}`;

              return (
                <div key={member.id} className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center group flex flex-col justify-between items-center">
                  <div className="flex-1 flex flex-col items-center">
                    {/* Picture */}
                    <div className="relative aspect-[3/4] w-40 rounded-3xl overflow-hidden border-8 border-white shadow-md group-hover:scale-105 transition-transform duration-500 bg-zinc-100 mb-6">
                      <Image 
                        src={imageUrl} 
                        alt={member.name} 
                        fill 
                        className="object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          console.error("Team member image failed:", imageUrl, e);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-zinc-900 leading-tight">{member.name}</h4>
                      <p className="text-emerald-700 font-extrabold uppercase tracking-wider text-[10px] bg-emerald-50 px-3 py-1 rounded-full inline-block">
                        {member.role}
                      </p>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium mt-3 px-2">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-zinc-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-950/20 select-none pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans">Join Our Journey of Change</h2>
          <p className="text-zinc-400 text-lg leading-relaxed font-light">
            Your trust and support can help us reach more village schools, set up computer laboratories, and construct separate washroom modules. Join us as a donor, volunteer, or CSR partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#donate-section">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-6 rounded-full font-bold transition-all shadow-lg h-auto">
                Support Our Work
              </Button>
            </Link>
            <Link href="/#contact-section">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white px-10 py-6 rounded-full font-bold transition-all h-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

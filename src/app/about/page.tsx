"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  const teamMembers = [
    { 
      id: "chairman", 
      name: "Shri Bharamappa Nandaganv", 
      role: "Chairman", 
      desc: "Visionary leader with 15+ years of grassroot development experience in North Karnataka." 
    },
    { 
      id: "secretary", 
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
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50">
      <Navbar />
      
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 font-serif">
            About Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
            Shri Padmavati Grameen Abhivruddhi Sansthe (PGAS) is a registered NGO committed to transforming rural lives through education, health, and sustainable development.
          </p>
        </div>
      </section>

      {/* Our Vision & History */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 font-serif">
                Vision for a Better Rural Karnataka
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  Founded with a deep-rooted commitment to the people of Athani, our sansthe works at the intersection of quality education and community health. We believe that every student, regardless of their background, deserves the same opportunities as their urban counterparts.
                </p>
                <p>
                  Our programs focus on providing textbooks, building sanitization units, and fostering digital literacy. We believe in transparency, impact, and local empowerment.
                </p>
              </div>
            </div>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
                alt="NGO Impact" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold text-zinc-900 font-serif mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Meet the dedicated professionals and social workers guiding our initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/10">
                  <Image 
                    src={`https://placehold.co/400x400/png?text=${encodeURIComponent(member.name)}`} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-1">{member.name}</h3>
                <p className="text-primary font-bold text-sm uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-zinc-500 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-zinc-900 py-20 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-8">Join Our Journey of Change</h2>
          <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
            Your support can help us reach more villages and empower more children. Whether as a donor, partner, or volunteer, you can make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#donate-section" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold transition-all">
              Support Our Work
            </a>
            <a href="/#contact-section" className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

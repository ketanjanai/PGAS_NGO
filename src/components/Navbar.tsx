"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Globe } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/LanguageContext";
import { translations, type Language } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  // Load the logo URL directly from our known placeholder images
  const logo = PlaceHolderImages.find(img => img.id === "pgas-logo");
  const logoUrl = logo ? logo.imageUrl : "https://drive.google.com/uc?export=view&id=1CrPqY4-6cK30VHR6VgdkrPKlyBlMnIXF";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: t.gallery },
    { href: "/transparency", label: t.transparency },
    { href: "/csr", label: t.csr },
    { href: "/stories", label: t.stories },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-zinc-200/80" : "bg-white border-b border-zinc-100"}`}>
      <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
        {/* Branding Area */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white border border-zinc-100 rounded-[1rem] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-md">
            <Image 
              src={logoUrl} 
              alt="PGAS Logo" 
              fill 
              className="object-cover p-1" 
              referrerPolicy="no-referrer"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-black text-xl md:text-2xl leading-none text-zinc-900 tracking-tighter">
              PGAS
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-tight text-muted-foreground mt-1 leading-tight max-w-[200px] md:max-w-xs uppercase">
              Shri Padmavati Grameen Abhivruddhi Sansthe
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-zinc-700 hover:text-primary transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="h-6 w-px bg-zinc-200" />
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 font-bold uppercase tracking-widest text-[10px] border-zinc-200 hover:bg-zinc-50">
                  <Globe className="w-3.5 h-3.5 text-primary" /> {translations[lang].label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-zinc-100 shadow-xl rounded-xl">
                {Object.entries(translations).map(([code, data]) => (
                  <DropdownMenuItem 
                    key={code} 
                    onClick={() => {
                      setLang(code as Language);
                    }} 
                    className={`font-bold cursor-pointer text-xs px-4 py-2 hover:bg-zinc-50 ${lang === code ? "text-primary" : "text-zinc-700"}`}
                  >
                    {data.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/#donate-section">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 font-black shadow-lg shadow-primary/20 h-10 md:h-12 text-sm">
                <Heart className="w-4 h-4 mr-2 fill-current text-secondary" />
                {t.donate}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Language Button quick-switch */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 h-9 w-9 bg-zinc-50 rounded-xl">
                <Globe className="w-4 h-4 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-zinc-100 shadow-xl rounded-xl">
              {Object.entries(translations).map(([code, data]) => (
                <DropdownMenuItem 
                  key={code} 
                  onClick={() => setLang(code as Language)} 
                  className={`font-bold cursor-pointer text-xs ${lang === code ? "text-primary" : "text-zinc-700"}`}
                >
                  {data.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button 
            className="p-2 text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 animate-in slide-in-from-top-4 duration-300 shadow-2xl overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col p-6 gap-6">
            <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-100">
              <span className="text-[10px] uppercase font-black tracking-wider text-muted-foreground w-full mb-1">{t.selectLanguage}:</span>
              {Object.entries(translations).map(([code, data]) => (
                <button 
                  key={code} 
                  onClick={() => {
                    setLang(code as Language);
                  }}
                  className={`text-xs font-black px-4 py-2 rounded-full border transition-all ${lang === code ? 'bg-primary text-white border-primary shadow-sm' : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'}`}
                >
                  {data.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-headline font-black tracking-tight text-zinc-800 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-zinc-100" />

            <Link href="/#donate-section" onClick={() => setIsMenuOpen(false)}>
              <Button size="lg" className="w-full bg-primary py-5 rounded-xl font-black text-base shadow-xl shadow-primary/20 h-auto text-white">
                <Heart className="w-5 h-5 mr-3 fill-current text-secondary" />
                {t.donate}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

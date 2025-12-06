import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Twitter, Mail, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check system preference or default to dark
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-heading font-bold tracking-tighter hover:opacity-80 transition-opacity">
              AS<span className="text-primary/40">.</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}>
                  {link.label}
                  {location === link.href && (
                    <motion.span 
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-px bg-primary"
                    />
                  )}
                </a>
              </Link>
            ))}
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-4 rounded-full">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <button 
              className="p-2" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 md:hidden"
        >
          <nav className="flex flex-col gap-6 text-2xl font-heading font-light">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a 
                  onClick={() => setIsOpen(false)}
                  className={location === link.href ? "text-primary" : "text-muted-foreground"}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-12 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-heading font-bold">{personalInfo.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{personalInfo.role}</p>
          </div>

          <div className="flex gap-6">
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href={personalInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href={`mailto:${personalInfo.socials.email}`} className="text-muted-foreground hover:text-primary transition-colors"><Mail size={20} /></a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-8 text-center text-xs text-muted-foreground/40">
          © {new Date().getFullYear()} Abhijeet Singh. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Download, Code2, Database, Brain, Globe, Sparkles } from "lucide-react";
import { personalInfo, skills, projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroBg from "@assets/generated_images/abstract_dark_tech_geometric_background.png";
import profileImg from "@assets/p1_1765020617332.jpg";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 2.2 // Wait for preloader
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 50 
      } 
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40 dark:opacity-40 opacity-10 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center pt-20">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-8"
          >
            <motion.div variants={item}>
               <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5 text-primary/80 backdrop-blur-sm rounded-full flex w-fit items-center gap-2">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
                 Available for work
               </Badge>
            </motion.div>
            
            <motion.h1 variants={item} className="text-6xl md:text-8xl font-heading font-bold leading-[0.9] tracking-tighter">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed">
              {personalInfo.role} based in {personalInfo.location}. 
              Building <span className="text-foreground font-semibold">intelligent systems</span> and <span className="text-foreground font-semibold">beautiful interfaces</span>.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-border bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:scale-105 transition-all duration-300">
                <Link href="/contact">
                  Contact Me
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image - Floats/Parallax */}
          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 2.4, type: "spring" }}
            className="relative hidden md:flex justify-center"
          >
            <div className="relative w-80 h-[500px] rounded-full overflow-hidden border-4 border-background shadow-2xl shadow-primary/20 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10 mix-blend-overlay" />
              <img 
                src={profileImg} 
                alt="Abhijeet Singh" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 top-10 right-10 w-60 h-60 border border-dashed border-primary/20 rounded-full" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 bottom-10 left-0 w-80 h-80 border border-primary/10 rounded-full" 
            />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ height: [20, 40, 20] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent" 
          />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-heading font-bold">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "{personalInfo.about}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col items-center gap-2">
                <Code2 className="text-primary/60" />
                <span className="font-medium text-sm">Full Stack</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col items-center gap-2">
                <Brain className="text-primary/60" />
                <span className="font-medium text-sm">AI / ML</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col items-center gap-2">
                <Database className="text-primary/60" />
                <span className="font-medium text-sm">Analytics</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border flex flex-col items-center gap-2">
                <Globe className="text-primary/60" />
                <span className="font-medium text-sm">Web Apps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-heading font-bold mb-12">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-4 rounded-lg bg-muted/10 border border-border flex items-center gap-3 cursor-default transition-colors group hover:bg-muted/20"
            >
              <skill.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Selected works and case studies</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="group hidden md:flex">
                View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/projects`}>
                  <Card className="h-full bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer overflow-hidden group">
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute bottom-4 left-4 z-20 p-2 bg-black/60 backdrop-blur-md rounded-lg">
                        <project.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/projects">
              <Button variant="outline" className="w-full">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 container mx-auto px-6 text-center">
        <h2 className="text-4xl font-heading font-bold mb-6">Let's build something amazing together</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Open to opportunities in Full Stack Development and AI Engineering.
        </p>
        <Link href="/contact">
          <Button size="lg" className="rounded-full px-8 h-12 text-base">
            Get In Touch
          </Button>
        </Link>
      </section>
    </div>
  );
}

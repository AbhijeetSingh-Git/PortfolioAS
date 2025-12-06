import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Projects() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg">
          A showcase of my work in Full Stack Development, AI/ML systems, and Data Analytics.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Dialog key={project.id}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <Badge className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md text-foreground hover:bg-background">
                      {project.tags[0]}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <project.icon className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded border border-white/10 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-2xl bg-card border-white/10 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">{project.title}</DialogTitle>
                <DialogDescription>
                  {project.tags.join(" • ")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="rounded-xl overflow-hidden aspect-video">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-lg">Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.details}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="gap-2">
                    <ExternalLink size={16} /> Live Demo
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Github size={16} /> Source Code
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

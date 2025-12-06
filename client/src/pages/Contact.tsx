import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardHover = {
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have a project in mind or want to discuss AI, Web Dev, or just say hi?
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={itemVariants} whileHover={cardHover}>
              <Card className="bg-card border-border cursor-pointer transition-shadow hover:shadow-lg" data-testid="card-email">
                <CardContent className="p-6 flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <Mail />
                  </motion.div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">{personalInfo.socials.email}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={cardHover}>
              <Card className="bg-card border-border cursor-pointer transition-shadow hover:shadow-lg" data-testid="card-location">
                <CardContent className="p-6 flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                  >
                    <MapPin />
                  </motion.div>
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-muted-foreground">{personalInfo.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
        >
          <Card className="bg-card/50 border-border backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold mb-2"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-muted-foreground"
                    >
                      I'll get back to you as soon as possible.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your name" 
                                    {...field} 
                                    className="bg-muted/50 border-border transition-all duration-300 focus:scale-[1.01] focus:shadow-md"
                                    disabled={isSubmitting}
                                    data-testid="input-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="your@email.com" 
                                    {...field} 
                                    className="bg-muted/50 border-border transition-all duration-300 focus:scale-[1.01] focus:shadow-md"
                                    disabled={isSubmitting}
                                    data-testid="input-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell me about your project..." 
                                    className="min-h-[150px] bg-muted/50 border-border resize-none transition-all duration-300 focus:scale-[1.01] focus:shadow-md" 
                                    {...field}
                                    disabled={isSubmitting}
                                    data-testid="input-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full group relative overflow-hidden" 
                            size="lg"
                            disabled={isSubmitting}
                            data-testid="button-submit"
                          >
                            <motion.span
                              className="flex items-center justify-center gap-2"
                              animate={isSubmitting ? { opacity: 0 } : { opacity: 1 }}
                            >
                              Send Message
                              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </motion.span>
                            {isSubmitting && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <Loader2 className="w-5 h-5 animate-spin" />
                              </motion.div>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

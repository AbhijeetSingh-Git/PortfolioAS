import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { personalInfo } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
    const mailtoLink = `mailto:abhijeetsinghgautam51@gmail.com?subject=${subject}&body=${body}`;
    
    // Create a temporary link element and click it programmatically
    // This is more reliable than window.location.href for mailto links
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Opening Email Client",
      description: "Please verify the email content and click send in your email app.",
    });
    
    form.reset();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have a project in mind or want to discuss AI, Web Dev, or just say hi?
            </p>
          </div>

          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-muted-foreground">{personalInfo.socials.email}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin />
                </div>
                <div>
                  <h3 className="font-bold">Location</h3>
                  <p className="text-muted-foreground">{personalInfo.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/50 border-border backdrop-blur-sm">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-muted/50 border-border" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} className="bg-muted/50 border-border" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="min-h-[150px] bg-muted/50 border-border resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

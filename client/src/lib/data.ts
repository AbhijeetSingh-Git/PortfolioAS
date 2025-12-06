import { Cloud, Code2, Database, Layout, Server, Terminal, Smartphone, Brain, BookOpen, MessageSquare } from "lucide-react";

export const personalInfo = {
  name: "Abhijeet Singh",
  role: "Full Stack Developer | AI-ML Engineer",
  location: "Prayagraj, Uttar Pradesh, India",
  about: "I am a passionate Full-Stack and AI–ML developer with experience in building intelligent systems, analytics dashboards, and full-stack web apps. I love solving real-world problems using technology and enjoy working across ML, backend, and frontend development.",
  socials: {
    github: "#",
    linkedin: "#",
    twitter: "#",
    email: "abhijeet@example.com"
  }
};

export const skills = [
  { name: "Python", icon: Terminal, category: "Languages" },
  { name: "Java", icon: Code2, category: "Languages" },
  { name: "JavaScript", icon: Code2, category: "Languages" },
  { name: "SQL", icon: Database, category: "Database" },
  { name: "MongoDB", icon: Database, category: "Database" },
  { name: "Next.js", icon: Layout, category: "Frontend" },
  { name: "React", icon: Layout, category: "Frontend" },
  { name: "Tailwind CSS", icon: Layout, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "Git", icon: Code2, category: "Tools" },
  { name: "Power BI", icon:  BookOpen, category: "Analytics" }, // Fallback icon
  { name: "Tableau", icon: BookOpen, category: "Analytics" }, // Fallback icon
  { name: "Figma", icon: Layout, category: "Design" },
  { name: "WordPress", icon: Layout, category: "CMS" },
];

export const projects = [
  {
    id: 1,
    title: "Library Management System",
    description: "A complete system for book issue/return, tracking, admin panel, and automated fine calculation.",
    tags: ["Full Stack", "Database", "Automation"],
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000",
    details: "Built a robust library management solution that streamlines operations. Features include real-time book tracking, automated fine calculation logic, and a comprehensive admin dashboard for managing users and inventory."
  },
  {
    id: 2,
    title: "MAITRI – AI Mental Health Assistant",
    description: "Offline AI system for astronauts detecting emotions via audio+video and providing supportive conversation.",
    tags: ["AI/ML", "Computer Vision", "NLP"],
    icon: Brain,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    details: "A multimodal AI assistant designed for high-stress environments like space missions. It analyzes facial expressions and voice tonality to detect emotional states and initiates supportive dialogue. Self-improves through feedback loops."
  },
  {
    id: 3,
    title: "AI Mental Health Chatbot",
    description: "Conversational AI with sentiment detection and a ChatGPT-like UI.",
    tags: ["NLP", "Chatbot", "React"],
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=1000",
    details: "An accessible mental health support tool featuring a modern chat interface. It uses natural language processing to understand user sentiment and provides empathetic responses, helping users manage daily stress."
  }
];

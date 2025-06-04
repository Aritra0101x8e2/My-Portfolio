
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Github, Globe, Code, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
     {
      id: "1", 
      title: "Multi-Purpose Unit Converter",
      description: "A versatile unit calculator supporting conversions across length, weight, temperature, currency, and more. Designed with a clean interface and optimized for accuracy, speed, and ease of use.",
      techStack: ["React", "JavaScript", "Tailwind CSS"],
      githubUrl: "https://github.com/Aritra0101x8e2",
      liveUrl: "https://metric-calculator-aritrakundu.vercel.app/",
      image: "/P2.png"
    },
    {
      id: "2",
      title: "CyberSecurity Website",
      description: "A cutting-edge cybersecurity platform offering advanced software tools, real-time threat analyzers, and interactive dashboards. Designed to protect digital assets, detect anomalies, and provide deep insights into system vulnerabilities—all in one unified interface.",
      techStack: ["React", "TypeScript", "Node.Js", "Tailwind CSS",  ,"Vite", "ShadCN"],
      githubUrl: "https://github.com/Aritra0101x8e2",
      liveUrl: "https://d-a-r-k-w-a-v-e-aritra.vercel.app/",
      image: "/P3.png"
    },
    {
      id: "3",
      title: "Behaviourial Biometric Detector",
      description: "A behavioral biometric analysis platform with real-time user monitoring, identity verification, and anomaly detection. Combines advanced algorithms with modern technologies to ensure secure and seamless authentication.",
      techStack: ["React", "Tailwind CSS", "JavaScript"],
      githubUrl: "https://github.com/Aritra0101x8e2",
      liveUrl: "https://ryvora-darkwave-aritra.vercel.app/",
      image: "/P1.png"
    
    },
    {
      id: "4",
      title: "Kolkata Metro",
      description: "A real-time Kolkata Metro tracking platform featuring live train locations, schedules, and route maps. Designed for commuters, with accurate updates, mobile-friendly design, and full coverage of all metro lines",
      techStack: ["MapBox API", "JavaScript", "React MapMox", "KolkataMetro API",  ,"Vite", "ShadCN"],
      githubUrl: "https://github.com/Aritra0101x8e2",
      liveUrl: "https://kolkata-metro-aritra-kundu.vercel.app/", 
      image: "/P4.png"
    },
    {
      id: "5",
      title: "Tourism Booking Website",
      description: "A visually immersive tourism destination booking platform offering curated travel experiences, seamless reservations, and personalized recommendations. Built for wanderers seeking beauty, ease, and unforgettable journeys",
      techStack: ["HTML", "JavaScript", "CSS" , "CSS-JS Scroll Amnimations"],
      githubUrl: "https://github.com/Aritra0101x8e2",
      liveUrl: "https://aritra0101x8e2.github.io/D-E-S-T-I-N-Y/", 
      image: "/P5.png"
    },
    {
      id: "6",
      title: "UPI Fraud Monitoring Dashboard",
      description: "A real-time UPI fraud monitoring dashboard designed to detect suspicious transactions, analyze behavioral patterns, and alert anomalies instantly. Empowering secure digital payments with AI-driven insights and actionable intelligence",
      techStack: ["React", "Tailwind CSS", "JavaScript" ,"Vite", "ShadCN"],
      githubUrl: "https://github.com/Aritra0101x8e2",
      liveUrl: "https://prysm-darkwave-aritra.vercel.app/", 
      image: "/P6.png"
    }
  ]);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: "",
    description: "",
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    image: "/P7.png"
  });
  const ADMIN_PASSWORD = "ARI123456";
  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);
  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem("portfolioProjects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    if (password !== ADMIN_PASSWORD) {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please enter the correct password to add projects.",
        variant: "destructive",
      });
      return;
    }

    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in at least the title and description.",
        variant: "destructive",
      });
      return;
    }

    const projectToAdd: Project = {
      ...newProject,
      id: Date.now().toString(),
      techStack: typeof newProject.techStack === 'string' 
        ? (newProject.techStack as string).split(",").map(tech => tech.trim()).filter(tech => tech)
        : newProject.techStack
    };

    const updatedProjects = [...projects, projectToAdd];
    saveProjects(updatedProjects);

    toast({
      title: "Success",
      description: "New project added successfully!",
    });
    setNewProject({
      title: "",
      description: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      image: "/placeholder.svg"
    });
    setPassword("");
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Projects
            </h1>
            <p className="text-xl text-gray-300 font-exo mb-8">
              Showcase of my recent work and developments
            </p>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="cyber-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-blue-500/30 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="gradient-text font-orbitron">Add New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="Enter admin password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="Describe your project"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                    <Input
                      id="techStack"
                      value={Array.isArray(newProject.techStack) ? newProject.techStack.join(", ") : newProject.techStack}
                      onChange={(e) => setNewProject(prev => ({ ...prev, techStack: e.target.value as any }))}
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="https://your-project.com"
                    />
                  </div>
                  <Button onClick={handleAddProject} className="cyber-button w-full">
                    Add Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="cyber-card h-full hover:border-blue-400/50 transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-orbitron gradient-text flex items-center justify-between">
                      {project.title}
                      <Code className="w-5 h-5 text-blue-400" />
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 font-exo leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded text-xs text-blue-300 font-exo"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/30 hover:border-blue-400/50 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        >
                          <Github className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-exo">Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/30 hover:border-blue-400/50 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        >
                          <Globe className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-exo">Live</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            <Card className="cyber-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                  {projects.length}+
                </div>
                <p className="text-gray-300 font-exo">Completed Projects</p>
              </CardContent>
            </Card>
            
            <Card className="cyber-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                  10+
                </div>
                <p className="text-gray-300 font-exo">Technologies Used</p>
              </CardContent>
            </Card>
            
            <Card className="cyber-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                  100%
                </div>
                <p className="text-gray-300 font-exo">User Satisfaction</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;

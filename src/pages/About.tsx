
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Mail, MapPin, GraduationCap, BookOpen, Rocket } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserData {
  name: string;
  email: string;
  phone: string;
  education: string;
  currentLearning: string;
  location: string;
  upcomingProject: string;
  description: string;
}

interface SkillCategory {
  name: string;
  skills: string[];
}

const About = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "Aritra Kundu",
    email: "aritrakundu70@gmail.com",
    phone: "+91 6297347085",
    education: "B.Tech in INFORMATION TECHNOLOGY",
    currentLearning: "NODE.Js & MongoDB",
    location: "Kolkata, India",
    upcomingProject: "E Commerce Website",
    description: "I'm a FrontEnd Web Developer with a strong grasp of modern technologies and a solid foundation in Data Structures and Algorithms. Passionate about building intuitive user experiences, I'm currently expanding my skills toward full-stack development to create end-to-end solutions that make a real impact."
  });
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([
    {
      name: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
      name: "Backend", 
      skills: ["JavaScript", "Python", "TypeScript", "C++ API",]
    },
    {
      name: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "C++", "C" , "Python"]
    },
    {
      name: "Learning",
      skills: ["Node.JS", "MongoDB", "ML"]
    }
  ]);

  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg");
  const [password, setPassword] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ADMIN_PASSWORD = "ARI123456"; 

  useEffect(() => {

    const savedUserData = localStorage.getItem("portfolioUserData");
    const savedSkillCategories = localStorage.getItem("portfolioSkillCategories");
    const savedProfileImage = localStorage.getItem("portfolioProfileImage");

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    if (savedSkillCategories) {
      setSkillCategories(JSON.parse(savedSkillCategories));
    }
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);
  const saveUserData = (data: UserData) => {
    localStorage.setItem("portfolioUserData", JSON.stringify(data));
    setUserData(data);
  };

  const saveSkillCategories = (categories: SkillCategory[]) => {
    localStorage.setItem("portfolioSkillCategories", JSON.stringify(categories));
    setSkillCategories(categories);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem("portfolioProfileImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkillCategory = () => {
    if (password !== ADMIN_PASSWORD) {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please enter the correct password to add skills.",
        variant: "destructive",
      });
      return;
    }

    if (!newSkillCategory.trim() || !newSkills.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both category name and skills.",
        variant: "destructive",
      });
      return;
    }

    const skillsArray = newSkills.split(",").map(skill => skill.trim()).filter(skill => skill);
    const newCategory: SkillCategory = {
      name: newSkillCategory.trim(),
      skills: skillsArray
    };

    const updatedCategories = [...skillCategories, newCategory];
    saveSkillCategories(updatedCategories);

    toast({
      title: "Success",
      description: "New skill category added successfully!",
    });

    setNewSkillCategory("");
    setNewSkills("");
    setPassword("");
    setIsDialogOpen(false);
  };

  const stats = [
    { icon: User, label: "Name", value: userData.name },
    { icon: Mail, label: "Email", value: userData.email },
    { icon: User, label: "Phone", value: userData.phone },
    { icon: GraduationCap, label: "Education", value: userData.education },
    { icon: BookOpen, label: "Currently Learning", value: userData.currentLearning },
    { icon: MapPin, label: "Location", value: userData.location },
    { icon: Rocket, label: "Upcoming Project", value: userData.upcomingProject }
  ];

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
              About Me
            </h1>
            <p className="text-xl text-gray-300 font-exo">
              Get to know more about me and my journey
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
           
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card className="cyber-card text-center">
                <CardContent className="pt-6">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/MYDP.webp";
                        }}
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-40 h-40 mx-auto opacity-0 cursor-pointer rounded-full"
                    />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold gradient-text mb-2">
                    {userData.name}
                  </h2>
                  <p className="text-blue-300 font-exo">Web Developer & Programmer</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="cyber-card h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron gradient-text">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-colors duration-300"
                      >
                        <stat.icon className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm text-gray-400 font-exo">{stat.label}</p>
                          <p className="text-white font-semibold">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Description Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron gradient-text">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed font-exo text-lg">
                  {userData.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8"
          >
            <Card className="cyber-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-orbitron gradient-text">Skills & Technologies</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-blue-500/30">
                    <DialogHeader>
                      <DialogTitle className="gradient-text font-orbitron">Add New Skill Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
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
                        <Label htmlFor="category">Category Name</Label>
                        <Input
                          id="category"
                          value={newSkillCategory}
                          onChange={(e) => setNewSkillCategory(e.target.value)}
                          className="bg-slate-800 border-blue-500/30"
                          placeholder="e.g., Mobile Development"
                        />
                      </div>
                      <div>
                        <Label htmlFor="skills">Skills (comma-separated)</Label>
                        <Textarea
                          id="skills"
                          value={newSkills}
                          onChange={(e) => setNewSkills(e.target.value)}
                          className="bg-slate-800 border-blue-500/30"
                          placeholder="e.g., React Native, Flutter, Swift"
                        />
                      </div>
                      <Button onClick={handleAddSkillCategory} className="cyber-button w-full">
                        Add Category
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.name}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 + categoryIndex * 0.2 }}
                      className="space-y-3"
                    >
                      <h3 className="text-xl font-orbitron font-semibold text-blue-300">
                        {category.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 1.4 + categoryIndex * 0.2 + skillIndex * 0.1 
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300 font-exo hover:border-blue-400/50 transition-colors duration-300"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

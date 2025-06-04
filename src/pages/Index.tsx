
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewSection from "@/components/ReviewSection";

const Index = () => {
  const skills = [
    "React", "TypeScript", "Javascript", "Tailwind CSS", 
    "Python", "Git", "C", "C++" ,"DSA", "Vite", "ShadCN", "API", "Node.Js", "MY SQL", "Express.JS"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16 relative overflow-hidden">
      {}
      <div className="absolute inset-0 tech-grid opacity-10"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          {}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h1 
              className="text-5xl md:text-7xl font-orbitron font-bold mb-6"
              variants={itemVariants}
            >
              <span className="gradient-text">Hi, I'm</span>{" "}
              <span className="text-white font-audiowide">Aritra Kundu</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 font-exo mb-8 max-w-3xl mx-auto"
            >
              A passionate{" "}
              <span className="gradient-text font-semibold"> Web Developer & Programmer</span>{" "}
              crafting digital experiences with cutting-edge technologies
            </motion.p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/projects">
              <Button className="cyber-button w-full sm:w-auto">
                View Projects
              </Button>
            </Link>
            
            <div className="flex gap-4 justify-center">
              <a 
                href="https://github.com/Aritra0101x8e2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <Github className="w-6 h-6 text-blue-400" />
              </a>
              <a 
                href="https://www.linkedin.com/in/aritra-kundu-0689a7320/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <Linkedin className="w-6 h-6 text-blue-400" />
              </a>
              <a 
                href="mailto:aritra@example.com"
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <Mail className="w-6 h-6 text-blue-400" />
              </a>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold mb-8 gradient-text">
              Technologies & Skills
            </h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full text-blue-300 font-exo font-medium hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="cyber-card max-w-2xl mx-auto text-center"
          >
            <h3 className="text-xl font-orbitron font-bold mb-4 gradient-text">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-300 mb-6 font-exo">
              Ready to bring your ideas to life? Let's connect and create something extraordinary.
            </p>
            <Link to="https://wa.me/qr/7DGKFLHEAXGOB1">
              <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <ReviewSection />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-40 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-20"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-60 right-20 w-3 h-3 bg-cyan-400 rounded-full opacity-30"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        className="absolute bottom-40 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-25"
      />
    </div>
  );
};

export default Index;

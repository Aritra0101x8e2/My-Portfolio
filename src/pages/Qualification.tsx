
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

interface QualificationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  grade: string;
  description: string;
  type: "secondary" | "higher_secondary" | "graduation" | "certification";
}

const Qualification = () => {
  const qualifications: QualificationItem[] = [
    {
      id: "1",
      title: "Secondary Education (Class X)",
      institution: "Vivekananda Siksha Niketan High School",
      period: "2021",
      grade: "89.4%",
      description: "Completed secondary education with excellence in Mathematics and Science. Participated in various technical competitions and science fairs.",
      type: "secondary"
    },
    {
      id: "2", 
      title: "Higher Secondary (Class XII)",
      institution: "Vivekananda Siksha Niketan High School",
      period: "2023",
      grade: "71.8%",
      description: "Specialized in Science stream with Computer Science as additional subject. Led the school's programming club and organized tech events.",
      type: "higher_secondary"
    },
    {
      id: "3",
      title: "B.Tech in Information Technology",
      institution: "Netaji Subhash Engineering College",
      period: "2024 - 2028",
      grade: "7 CGPA**",
      description: "Pursuing Bachelor's degree with specialization in Software Engineering and Data Structures. Active member of coding club and participant in national hackathons.",
      type: "graduation"
    },
    {
      id: "4",
      title: "FrontEnd Web Development",
      institution: "Coursera (Meta Certification)",
      period: "2025",
      grade: "Certificate",
      description: "Comprehensive certification covering React, JavaScript , TailWind.CSS and modern web development practices. Completed 8 hands-on projects.",
      type: "certification"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "secondary":
      case "higher_secondary":
        return BookOpen;
      case "graduation":
        return GraduationCap;
      case "certification":
        return Award;
      default:
        return BookOpen;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "secondary":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30";
      case "higher_secondary":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "graduation":
        return "from-purple-500/20 to-violet-500/20 border-purple-500/30";
      case "certification":
        return "from-orange-500/20 to-red-500/20 border-orange-500/30";
      default:
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
    }
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
        <div className="max-w-4xl mx-auto">
         
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
              Qualification
            </h1>
            <p className="text-xl text-gray-300 font-exo">
              My educational journey and achievements
            </p>
          </motion.div>

      
          <div className="relative">
           
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 hidden md:block"></div>
            
            <div className="space-y-8">
              {qualifications.map((qualification, index) => {
                const Icon = getIcon(qualification.type);
                
                return (
                  <motion.div
                    key={qualification.id}
                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                    className={`relative ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-16'}`}
                  >
        
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full border-4 border-slate-900 hidden md:block z-10"></div>
                    
                    <Card className={`cyber-card bg-gradient-to-br ${getColor(qualification.type)} hover:scale-[1.02] transition-transform duration-300`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-slate-800/50 rounded-lg">
                              <Icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                              <CardTitle className="text-xl font-orbitron text-white">
                                {qualification.title}
                              </CardTitle>
                              <p className="text-blue-300 font-exo">
                                {qualification.institution}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-gray-400 mb-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm font-exo">{qualification.period}</span>
                            </div>
                            <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-semibold">
                              {qualification.grade}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 font-exo leading-relaxed">
                          {qualification.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

         
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            <Card className="cyber-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                  2+
                </div>
                <p className="text-gray-300 font-exo">Years of Programming</p>
              </CardContent>
            </Card>
            
            <Card className="cyber-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                  7.00
                </div>
                <p className="text-gray-300 font-exo">Current CGPA</p>
              </CardContent>
            </Card>
            
            <Card className="cyber-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
                  80%+
                </div>
                <p className="text-gray-300 font-exo">Average Score</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Qualification;

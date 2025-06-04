
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, User, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Qualification", path: "/qualification" },
    { name: "Projects", path: "/projects" }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Aritra0101x8e2", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aritra-kundu-0689a7320/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:aritrakundu70@gmail.com", label: "Email" }
  ];

  return (
    <footer className="relative mt-20 border-t border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
      <div className="absolute inset-0 tech-grid opacity-5"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-orbitron font-bold gradient-text">
                    Aritra Kundu
                  </h3>
                  <p className="text-blue-300 font-exo">Web Developer & Programmer</p>
                </div>
              </div>
              <p className="text-gray-300 font-exo leading-relaxed mb-6 max-w-md">
                Passionate about creating innovative digital solutions with modern technologies. 
                Let's build something amazing together.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-blue-500/20 hover:border-blue-400/40 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-blue-400" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-orbitron font-semibold gradient-text mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-blue-400 font-exo transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-orbitron font-semibold gradient-text mb-4">
                Contact
              </h4>
              <div className="space-y-3 text-gray-300 font-exo">
                <p>aritrakundu70@gmail.com</p>
                <p>+91 6297347085</p>
                <p>Kolkata, India</p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-blue-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-gray-400 font-exo text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Aritra Kundu. All rights reserved. Built with ❤️ using React & JavaScript.
            </div>
            
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              <ArrowUp className="w-4 h-4 mr-1" />
              Back to Top
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
    </footer>
  );
};

export default Footer;

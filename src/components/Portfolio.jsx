import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Code,
  Database,
  Smartphone,
  Globe,
  User,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  Send,
  Star,
  Zap,
  Heart,
  Coffee
} from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah dikirim.');
    setFormData({ name: '', email: '', message: '' });
  };

  const skills = [
    { category: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'], icon: Code, color: 'from-red-500 to-pink-600' },
    { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'Laravel', 'Express.js'], icon: Database, color: 'from-blue-500 to-cyan-600' },
    { category: 'Mobile', items: ['React Native', 'Flutter', 'Android', 'iOS'], icon: Smartphone, color: 'from-green-500 to-emerald-600' },
    { category: 'Tools & Others', items: ['Git', 'Docker', 'AWS', 'MongoDB', 'MySQL', 'PostgreSQL'], icon: Globe, color: 'from-purple-500 to-violet-600' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Platform e-commerce lengkap dengan sistem pembayaran, manajemen inventory, dan dashboard admin.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas dengan fitur kolaborasi tim, tracking progress, dan notifikasi real-time.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Dashboard analytics dengan visualisasi data interaktif untuk monitoring performa bisnis.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovate Ltd',
      period: '2022 - Sekarang',
      description: 'Memimpin pengembangan aplikasi web dan mobile, mengelola tim developer, dan mengimplementasikan best practices dalam development.'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Solutions Inc',
      period: '2020 - 2022',
      description: 'Mengembangkan interface pengguna yang responsif dan interaktif menggunakan React dan Vue.js untuk berbagai klien enterprise.'
    },
    {
      title: 'Junior Web Developer',
      company: 'StartUp Creative',
      period: '2019 - 2020',
      description: 'Membangun website dan aplikasi web sederhana, mempelajari teknologi terbaru, dan berkontribusi dalam project tim.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 text-gray-900 overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-red-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              PORTF<span className="inline-block transform rotate-12">★</span>LIO
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`font-bold text-lg transition-all duration-300 transform hover:scale-110 ${
                    activeSection === item 
                      ? 'text-red-600 scale-110' 
                      : 'text-gray-700 hover:text-red-500'
                  }`}
                >
                  {item === 'home' ? 'BERANDA' : 
                   item === 'about' ? 'TENTANG' :
                   item === 'skills' ? 'KEAHLIAN' :
                   item === 'projects' ? 'PROYEK' :
                   item === 'experience' ? 'PENGALAMAN' :
                   'KONTAK'}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-3 font-bold text-lg text-gray-700 hover:text-red-500 transition-colors duration-300"
                  >
                    {item === 'home' ? 'BERANDA' : 
                     item === 'about' ? 'TENTANG' :
                     item === 'skills' ? 'KEAHLIAN' :
                     item === 'projects' ? 'PROYEK' :
                     item === 'experience' ? 'PENGALAMAN' :
                     'KONTAK'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative">
        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 left-10 w-20 h-20 bg-red-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-48 right-20 w-16 h-16 bg-blue-600 transform rotate-45 opacity-20 animate-pulse"></div>
          <div className="absolute bottom-64 left-1/4 w-12 h-12 bg-yellow-500 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-48 right-1/3 w-8 h-8 bg-green-500 transform rotate-45 opacity-25 animate-bounce delay-300"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            {/* Version Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-8 transform hover:scale-105 transition-transform duration-300">
              <Star size={16} className="mr-2" />
              VOL.2
            </div>

            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-black mb-4 leading-none">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block transform hover:scale-105 transition-transform duration-500">
                  PORT
                </span>
                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent block transform hover:scale-105 transition-transform duration-500 delay-100">
                  FOLIO
                </span>
              </h1>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl transform rotate-12 shadow-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center transform -rotate-12">
                    <User size={80} className="text-gray-600" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  SOFTWARE DEVELOPER
                </div>
              </div>
              
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <Zap className="text-red-500 mr-2" size={24} />
                  <h2 className="text-3xl md:text-4xl font-black text-blue-600">
                    Izzan Athmar
                  </h2>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-red-500 mb-4">
                  Muhammad
                </h3>
                <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                  Passionate full-stack developer yang mencintai inovasi dan 
                  <span className="font-bold text-red-500"> teknologi terdepan</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-12 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                LIHAT KARYA SAYA ✨
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-12 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-110"
              >
                MARI BERKOLABORASI 🚀
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ChevronDown size={40} className="mx-auto text-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TENTANG SAYA
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl transform rotate-6 shadow-2xl"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl transform -rotate-6 flex items-center justify-center">
                    <User size={140} className="text-gray-600" />
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-black text-sm shadow-lg rotate-12">
                  5+ YEARS EXP
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-4xl font-black mb-8 text-gray-900">
                Hello! Saya 
                <span className="text-red-500"> Izzan Athmar </span>
                Muhammad 👋
              </h3>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="font-medium">
                  Saya adalah seorang <span className="font-black text-blue-600">Full Stack Developer</span> 
                  dengan pengalaman lebih dari 5 tahun dalam pengembangan aplikasi web dan mobile. 
                  Saya memiliki passion yang besar dalam teknologi dan selalu antusias untuk 
                  mempelajari hal-hal baru.
                </p>
                
                <p>
                  Keahlian saya meliputi pengembangan frontend dengan 
                  <span className="font-bold text-cyan-600"> React</span>, 
                  <span className="font-bold text-green-600"> Vue.js</span>, dan 
                  <span className="font-bold text-red-600"> Angular</span>, 
                  serta backend dengan 
                  <span className="font-bold text-yellow-600"> Node.js</span>, 
                  <span className="font-bold text-blue-600"> Python</span>, dan 
                  <span className="font-bold text-purple-600"> PHP</span>.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 my-8">
                <div className="flex items-center bg-white/80 p-4 rounded-xl shadow-lg">
                  <MapPin size={24} className="text-red-500 mr-3" />
                  <div>
                    <p className="font-bold text-gray-900">Jakarta</p>
                    <p className="text-sm text-gray-600">Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center bg-white/80 p-4 rounded-xl shadow-lg">
                  <Coffee size={24} className="text-blue-500 mr-3" />
                  <div>
                    <p className="font-bold text-gray-900">Available</p>
                    <p className="text-sm text-gray-600">For Hire</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                DOWNLOAD CV 📄
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 relative">
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              KEAHLIAN SAYA
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-500 to-orange-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border-4 border-transparent hover:border-gray-200 transition-all duration-500 transform hover:scale-105 hover:rotate-2"
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${skillGroup.color} shadow-lg`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6">{skillGroup.category}</h3>
                  <div className="space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PROYEK UNGGULAN
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  project.featured ? 'lg:col-span-2 lg:row-span-1' : ''
                }`}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-black text-sm shadow-lg">
                    FEATURED ⭐
                  </div>
                )}
                
                <div className="relative h-64 bg-gradient-to-br from-blue-400/20 to-purple-600/20 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      LIVE DEMO
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      <Github size={16} className="mr-2" />
                      GITHUB
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative">
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              PENGALAMAN KERJA
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className="flex items-start mb-12 last:mb-0 group"
              >
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  {index !== experiences.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-grow ml-8 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{experience.title}</h3>
                  <div className="flex items-center mb-6">
                    <span className="font-bold text-blue-600 text-lg">{experience.company}</span>
                    <span className="mx-4 w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="font-bold text-red-500">{experience.period}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {experience.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 relative">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              MARI BERKOLABORASI!
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-orange-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-4xl font-black text-gray-900 mb-8">
                Ada Proyek Menarik? 
                <span className="text-red-500">Let's Talk! 💬</span>
              </h3>
              
             <p className="text-xl text-gray-700 mb-12 leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a project idea, need development services, or just want to connect, 
                I'd love to hear from you!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center bg-white/90 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl mr-6">
                    <Mail size={28} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-gray-900">Email</h4>
                    <p className="text-gray-600 text-lg">izzan.athmar@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/90 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-6">
                    <Phone size={28} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-gray-900">Phone</h4>
                    <p className="text-gray-600 text-lg">+62 812-3456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/90 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mr-6">
                    <MapPin size={28} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-gray-900">Location</h4>
                    <p className="text-gray-600 text-lg">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-6 mt-12">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
                >
                  <Github size={32} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
                >
                  <Linkedin size={32} />
                </a>
                <a
                  href="mailto:izzan.athmar@example.com"
                  className="p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
                >
                  <Mail size={32} />
                </a>
              </div>
            </div>
            
           {/* Contact Form */}
<div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
  <h3 className="text-3xl font-black text-gray-900 mb-8">Send Me a Message 📧</h3>
  
  {submitStatus && (
    <div className={`mb-6 p-4 rounded-xl flex items-center ${
      submitStatus === 'success' 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {submitStatus === 'success' ? (
        <>
          <CheckCircle size={20} className="mr-2" />
          Thank you! Your message has been sent successfully.
        </>
      ) : (
        <>
          <X size={20} className="mr-2" />
          Sorry, there was an error sending your message. Please try again.
        </>
      )}
    </div>
  )}
  
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-3">
        Full Name *
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="w-full px-6 py-4 border-3 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300 text-lg font-medium bg-white/80"
        placeholder="Enter your full name"
      />
    </div>
    
    <div>
      <label htmlFor="email" className="block text-lg font-bold text-gray-900 mb-3">
        Email Address *
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        className="w-full px-6 py-4 border-3 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300 text-lg font-medium bg-white/80"
        placeholder="Enter your email address"
      />
    </div>
    
    <div>
      <label htmlFor="message" className="block text-lg font-bold text-gray-900 mb-3">
        Message *
      </label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        required
        rows={6}
        className="w-full px-6 py-4 border-3 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300 text-lg font-medium bg-white/80 resize-none"
        placeholder="Tell me about your project or just say hello!"
      />
    </div>
    
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-4 px-8 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center ${
        isSubmitting
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
      }`}
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
          SENDING...
        </>
      ) : (
        <>
          <Send size={24} className="mr-3" />
          SEND MESSAGE 🚀
        </>
      )}
    </button>
  </form>
</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              IZZAN ATHMAR MUHAMMAD
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Passionate Full Stack Developer crafting digital experiences with love and precision. 
              Let's build something amazing together! ✨
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl inline-block mb-6 shadow-xl">
                <Code size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">Clean Code</h3>
              <p className="text-gray-300 leading-relaxed">
                Writing maintainable, scalable, and efficient code that follows best practices and industry standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl inline-block mb-6 shadow-xl">
                <Heart size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">Passion Driven</h3>
              <p className="text-gray-300 leading-relaxed">
                Every project is approached with enthusiasm, creativity, and a commitment to delivering exceptional results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl inline-block mb-6 shadow-xl">
                <Zap size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">Fast Delivery</h3>
              <p className="text-gray-300 leading-relaxed">
                Quick turnaround times without compromising quality. Your project timeline is my priority.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-700">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:izzan.athmar@example.com"
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-300 text-lg">
                &copy; 2025 Izzan Athmar Muhammad. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Made with <Heart size={16} className="inline text-red-500" /> and lots of ☕
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Handle scroll for active section
useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Smooth scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  setIsMenuOpen(false);
};

// Handle form input changes
const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('');
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

const skills = [
  { category: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'], icon: Code, color: 'from-red-500 to-pink-600' },
  { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'Laravel', 'Express.js'], icon: Database, color: 'from-blue-500 to-cyan-600' },
  { category: 'Mobile', items: ['React Native', 'Flutter', 'Android', 'iOS'], icon: Smartphone, color: 'from-green-500 to-emerald-600' },
  { category: 'Tools & Others', items: ['Git', 'Docker', 'AWS', 'MongoDB', 'MySQL', 'PostgreSQL'], icon: Globe, color: 'from-purple-500 to-violet-600' }
];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Complete e-commerce platform with payment system, inventory management, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    title: 'Task Management App',
    description: 'Task management application with team collaboration features, progress tracking, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Data Analytics Dashboard',
    description: 'Analytics dashboard with interactive data visualization for business performance monitoring.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
    liveUrl: '#',
    githubUrl: '#'
  }
];

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovate Ltd',
    period: '2022 - Present',
    description: 'Leading web and mobile application development, managing developer teams, and implementing best practices in development.'
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Solutions Inc',
    period: '2020 - 2022',
    description: 'Developing responsive and interactive user interfaces using React and Vue.js for various enterprise clients.'
  },
  {
    title: 'Junior Web Developer',
    company: 'StartUp Creative',
    period: '2019 - 2020',
    description: 'Building simple websites and web applications, learning new technologies, and contributing to team projects.'
  }
];

export default Portfolio;
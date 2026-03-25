import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube,
  Code2,
  Network,
  Cpu,
  Monitor,
  BookOpen,
  Mail,
  ChevronRight,
  Quote,
  Terminal,
  Globe,
  Layers,
  Zap,
  Clock,
  X,
  Camera,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  email: string;
  socialHandle: string;
  imageUrl: string;
}

const DEFAULT_PROFILE: ProfileData = {
  name: "Sebastian Botelho",
  role: "Educação & Tecnologia",
  bio: "Minha jornada na tecnologia começou com uma simples pergunta: \"Como isso funciona?\". Desde então, dediquei minha vida a não apenas entender, mas a simplificar o complexo para outros.",
  email: "contato@sebastianbotelho.com",
  socialHandle: "@sebastianbotelho",
  imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
};

// --- Components ---

const EditProfileModal = ({ 
  isOpen, 
  onClose, 
  data, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  data: ProfileData; 
  onSave: (newData: ProfileData) => void;
}) => {
  const [formData, setFormData] = useState<ProfileData>(data);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#1E293B] border border-sky-500/20 rounded-[32px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <User className="text-[#0F172A] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-[#F8FAFC]">Editar Perfil</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome Completo</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Especialidade / Cargo</label>
              <input 
                type="text" 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Foto de Perfil</label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <input 
                  type="text" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white text-sm" 
                  placeholder="URL da imagem (https://...)"
                />
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" 
                    id="profile-upload"
                  />
                  <label 
                    htmlFor="profile-upload"
                    className="flex items-center justify-center gap-2 w-full bg-[#0F172A] border border-dashed border-sky-500/30 rounded-xl px-4 py-3 cursor-pointer hover:border-sky-400 hover:bg-sky-500/5 transition-all text-slate-400 hover:text-sky-400 text-sm font-bold"
                  >
                    <Camera size={18} />
                    Subir da Galeria
                  </label>
                </div>
              </div>
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-sky-500/20 shrink-0 shadow-lg shadow-sky-500/10 bg-[#0F172A] flex items-center justify-center">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-slate-700 w-12 h-12" />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">E-mail de Contato</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Handle Social (ex: @nome)</label>
              <input 
                type="text" 
                value={formData.socialHandle}
                onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bio / Sobre Mim</label>
            <textarea 
              rows={4} 
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 rounded-xl font-bold text-slate-400 hover:text-white transition-all border border-slate-700 hover:border-slate-500"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onSave(formData)}
              className="flex-1 bg-sky-500 text-[#0F172A] py-4 rounded-xl font-bold hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Header = ({ profile }: { profile: ProfileData }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: `https://instagram.com/${profile.socialHandle.replace('@', '')}`, label: "Instagram", color: "#E4405F" },
    { icon: Linkedin, href: `https://linkedin.com/in/${profile.socialHandle.replace('@', '')}`, label: "LinkedIn", color: "#0077B5" },
    { icon: Twitter, href: `https://twitter.com/${profile.socialHandle.replace('@', '')}`, label: "Twitter", color: "#1DA1F2" },
    { icon: Youtube, href: `https://youtube.com/@${profile.socialHandle.replace('@', '')}`, label: "YouTube", color: "#FF0000" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-[#0F172A]/40 backdrop-blur-xl border-b border-sky-500/10 py-3 shadow-2xl" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Terminal className="text-[#0F172A] w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl text-[#F8FAFC] tracking-tight hidden sm:block">{profile.name}</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden lg:flex items-center gap-6">
            {['Sobre', 'Cursos', 'Habilidades', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 border-l border-sky-500/10 pl-3 sm:pl-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-slate-400 transition-all p-1 hover:scale-110"
                title={social.label}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = social.color;
                  e.currentTarget.style.filter = `drop-shadow(0 0 8px ${social.color}44)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.filter = '';
                }}
              >
                <social.icon size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <a href="#cursos" className="hidden sm:block bg-sky-500 text-[#0F172A] px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20 shrink-0">
          Matricule-se
        </a>
      </div>
    </header>
  );
};

const Hero = ({ profile }: { profile: ProfileData }) => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const themes = [
    { 
      phrase: "Inteligência Artificial & Dados", 
      color: "text-sky-400", 
      bg: "bg-sky-500/20",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
    },
    { 
      phrase: "Segurança Cibernética & Redes", 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/20",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
    },
    { 
      phrase: "Desenvolvimento Web Fullstack", 
      color: "text-amber-400", 
      bg: "bg-amber-500/20",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
    },
    { 
      phrase: "Infraestrutura em Nuvem", 
      color: "text-purple-400", 
      bg: "bg-purple-500/20",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0F172A]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 -skew-x-12 translate-x-1/4" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-block w-fit px-4 py-1.5 bg-sky-500/10 text-sky-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-sky-500/20">
            {profile.role}
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-[#F8FAFC] leading-[0.9] tracking-tighter mb-8">
            Transformando <br />
            <span className="text-sky-400">curiosidade</span> <br />
            em realidade.
          </h1>

          {/* Dynamic Tech Banner */}
          <div className="w-full h-24 md:h-32 rounded-[24px] overflow-hidden mb-10 border border-sky-500/10 relative group shadow-2xl shadow-sky-500/5 bg-[#1E293B]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTheme}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src={themes[currentTheme].img} 
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent opacity-80")} />
                <div className="absolute inset-0 flex items-center px-8">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Explorando</span>
                    <h3 className={cn("text-lg md:text-xl font-display font-bold tracking-tight transition-colors duration-1000", themes[currentTheme].color)}>
                      {themes[currentTheme].phrase}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Theme Indicators */}
            <div className="absolute bottom-4 right-8 flex gap-2">
              {themes.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                    currentTheme === i ? "bg-sky-400 w-4 shadow-[0_0_10px_rgba(56,189,248,0.8)]" : "bg-slate-700"
                  )}
                />
              ))}
            </div>
          </div>
          <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
            Aprenda as tecnologias mais requisitadas do mercado com uma metodologia focada na prática e no desenvolvimento real de habilidades.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#cursos" className="bg-sky-500 text-[#0F172A] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20 flex items-center gap-2 group">
              Começar Agora
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#cursos" className="bg-[#1E293B] text-[#F8FAFC] border border-sky-500/10 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#2D3748] transition-all shadow-sm">
              Ver Cursos
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border border-sky-500/20 max-w-[450px] w-full">
            <img 
              src={profile.imageUrl} 
              alt={profile.name} 
              className="w-full h-auto object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-bold text-xl">{profile.name}</p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-500 rounded-2xl -z-10 rotate-12 opacity-30 blur-sm" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sky-900 rounded-3xl -z-10 -rotate-6 opacity-30 blur-sm" />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-sky-500 to-transparent" />
      </motion.div>
    </section>
  );
};

const About = ({ profile }: { profile: ProfileData }) => {
  return (
    <section id="sobre" className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-sky-500/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?q=80&w=400&auto=format&fit=crop" className="rounded-3xl shadow-lg mt-12 grayscale hover:grayscale-0 transition-all border border-sky-500/10" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=400&auto=format&fit=crop" className="rounded-3xl shadow-lg grayscale hover:grayscale-0 transition-all border border-sky-500/10" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-sky-500 rounded-full flex items-center justify-center text-[#0F172A] shadow-2xl border-8 border-[#0F172A]">
              <BookOpen size={40} />
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-display font-bold text-[#F8FAFC] mb-8 tracking-tight">Sobre Mim</h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                {profile.bio}
              </p>
              <p>
                Com formação em Engenharia de Computação e anos de experiência no mercado corporativo, desenvolvi uma filosofia de ensino baseada na <strong>prática deliberada</strong>. Acredito que a tecnologia é a ferramenta mais poderosa para a emancipação individual.
              </p>
              <p>
                Hoje, meu objetivo é formar a próxima geração de profissionais que não apenas usam tecnologia, mas a criam e a dominam com maestria.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-sky-500/10 pt-12">
              <div>
                <p className="text-3xl font-bold text-sky-400">10+</p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Anos Exp.</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400">5k+</p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Alunos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400">50+</p>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Projetos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Courses = () => {
  const courses = [
    { title: 'Python do Zero ao Pro', level: 'Iniciante', duration: '40h', price: 'R$ 297', image: 'https://picsum.photos/seed/py/600/400' },
    { title: 'Redes de Computadores', level: 'Intermediário', duration: '30h', price: 'R$ 197', image: 'https://picsum.photos/seed/net/600/400' },
    { title: 'IA para Produtividade', level: 'Avançado', duration: '20h', price: 'R$ 347', image: 'https://picsum.photos/seed/ai/600/400' },
  ];

  return (
    <section id="cursos" className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-sky-500/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-display font-bold text-[#F8FAFC] mb-6 tracking-tight">Nossos Cursos</h2>
            <p className="text-lg text-slate-400">
              Programas de treinamento intensivos desenhados para levar você do absoluto zero ao domínio técnico.
            </p>
          </div>
          <a href="#contato" className="text-sky-400 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-sm">
            Ver todos os cursos <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course, idx) => (
            <motion.div
              key={course.title}
              whileHover={{ y: -10 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-sky-500 text-[#0F172A] rounded-lg text-[10px] font-bold uppercase tracking-widest">
                  {course.level}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-sky-500" /> {course.duration}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="text-sky-400">{course.price}</span>
                </div>
                <h3 className="text-xl font-bold text-[#F8FAFC] mb-6 group-hover:text-sky-400 transition-colors">{course.title}</h3>
                <a href="#contato" className="block w-full py-3 bg-[#1E293B] text-[#F8FAFC] border border-sky-500/10 rounded-xl font-bold text-sm hover:bg-sky-500 hover:text-[#0F172A] transition-all text-center">
                  Saiba Mais
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'Python', icon: Code2, color: 'bg-sky-500/10 text-sky-400', desc: 'Desenvolvimento de scripts, automação e ciência de dados.' },
    { name: 'Redes', icon: Network, color: 'bg-sky-500/10 text-sky-400', desc: 'Infraestrutura, protocolos e segurança de redes.' },
    { name: 'Office', icon: Monitor, color: 'bg-sky-500/10 text-sky-400', desc: 'Domínio avançado de Excel, Word e PowerPoint.' },
    { name: 'IA', icon: Cpu, color: 'bg-sky-500/10 text-sky-400', desc: 'Prompt engineering e integração de modelos de IA.' },
    { name: 'Web Dev', icon: Globe, color: 'bg-sky-500/10 text-sky-400', desc: 'Criação de interfaces modernas e responsivas.' },
    { name: 'Cloud', icon: Layers, color: 'bg-sky-500/10 text-sky-400', desc: 'Fundamentos de nuvem e serviços AWS/Azure.' },
  ];

  return (
    <section id="habilidades" className="py-24 bg-[#1E293B] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-full bg-sky-500/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-display font-bold text-[#F8FAFC] mb-6 tracking-tight">Tech Stack</h2>
          <p className="text-lg text-slate-400">
            As tecnologias que domino e ensino, focadas no que o mercado realmente exige.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -10 }}
              className="glass-card p-8 group"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 border border-sky-500/20", skill.color)}>
                <skill.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">{skill.name}</h3>
              <p className="text-slate-400 leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ profileName }: { profileName: string }) => {
  const testimonials = [
    { name: 'Ana Silva', role: 'Dev Backend', text: `As aulas de Python do ${profileName} mudaram minha carreira. A didática é impecável!` },
    { name: 'Marcos Oliveira', role: 'Analista de Redes', text: 'Finalmente entendi protocolos de rede de verdade. Conteúdo direto ao ponto.' },
    { name: 'Juliana Costa', role: 'Data Analyst', text: 'O curso de Excel avançado me poupa horas de trabalho todos os dias. Recomendo muito!' },
  ];

  return (
    <section className="py-24 bg-[#0F172A] overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-500/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-display font-bold text-[#F8FAFC] mb-20 text-center tracking-tight">O que dizem os alunos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="relative p-10 bg-[#1E293B] rounded-[40px] border border-sky-500/10">
              <Quote className="absolute top-8 right-8 text-sky-500/10 w-12 h-12" />
              <p className="text-lg text-slate-300 italic mb-8 relative z-10 leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <p className="font-bold text-[#F8FAFC]">{t.name}</p>
                <p className="text-sm text-sky-400 font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Social = ({ profile }: { profile: ProfileData }) => {
  const socialLinks = [
    { icon: Instagram, href: `https://instagram.com/${profile.socialHandle.replace('@', '')}`, color: "#E4405F", label: "Instagram" },
    { icon: Linkedin, href: `https://linkedin.com/in/${profile.socialHandle.replace('@', '')}`, color: "#0077B5", label: "LinkedIn" },
    { icon: Twitter, href: `https://twitter.com/${profile.socialHandle.replace('@', '')}`, color: "#1DA1F2", label: "Twitter" },
    { icon: Youtube, href: `https://youtube.com/@${profile.socialHandle.replace('@', '')}`, color: "#FF0000", label: "YouTube" },
  ];

  return (
    <section className="py-24 bg-sky-500 text-[#0F172A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#0F172A]/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-display font-bold mb-8 tracking-tight">Vamos nos conectar?</h2>
        <p className="text-xl text-sky-900 mb-12 max-w-2xl mx-auto font-medium">
          Siga-me nas redes sociais para conteúdos diários sobre tecnologia, educação e carreira.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="group flex flex-col items-center gap-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div 
                className="w-20 h-20 bg-[#0F172A]/10 backdrop-blur-md rounded-[28px] flex items-center justify-center transition-all group-hover:scale-110 group-hover:-rotate-6 shadow-xl"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color;
                  e.currentTarget.style.boxShadow = `0 20px 40px ${social.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <social.icon size={32} className="group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 group-hover:opacity-100 transition-opacity text-[#0F172A]">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = ({ profile }: { profile: ProfileData }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contato" className="py-24 bg-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-sky-500/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-display font-bold text-[#F8FAFC] mb-8 tracking-tight">Vamos conversar?</h2>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed">
              Tem alguma dúvida sobre os cursos ou quer discutir um projeto? Preencha o formulário e responderei o mais rápido possível.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[#F8FAFC]">
                <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">E-mail</p>
                  <p className="text-lg font-medium">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#F8FAFC]">
                <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 border border-sky-500/20">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Redes Sociais</p>
                  <p className="text-lg font-medium">{profile.socialHandle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-400">
                  <Zap size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[#F8FAFC]">Mensagem Enviada!</h3>
                <p className="text-slate-400">Obrigado pelo contato. Responderei em breve.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-sky-400 font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome</label>
                    <input required type="text" className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">E-mail</label>
                    <input required type="email" className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Assunto</label>
                  <select className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white appearance-none">
                    <option>Dúvida sobre curso</option>
                    <option>Parceria</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Mensagem</label>
                  <textarea required rows={4} className="w-full bg-[#0F172A] border border-sky-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400 transition-colors text-white" placeholder="Como posso ajudar?"></textarea>
                </div>
                <button type="submit" className="w-full bg-sky-500 text-[#0F172A] py-4 rounded-xl font-bold text-lg hover:bg-sky-400 transition-all shadow-xl shadow-sky-500/20">
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ profile }: { profile: ProfileData }) => {
  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] py-20 px-6 border-t border-sky-500/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-full bg-sky-500/5 blur-[120px] -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                <Terminal className="text-[#0F172A] w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">{profile.name}</span>
            </div>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Dedicado a transformar a educação tecnológica no Brasil através de metodologias inovadoras e práticas.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-sky-400">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-300">
                <Mail size={18} className="text-sky-500" />
                {profile.email}
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Zap size={18} className="text-sky-500" />
                {profile.socialHandle}
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-sky-400">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-[#1E293B] border border-sky-500/10 rounded-xl px-4 py-2 w-full focus:outline-none focus:border-sky-500 transition-colors text-white"
              />
              <button className="bg-sky-500 p-2 rounded-xl hover:bg-sky-400 transition-colors text-[#0F172A]">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-sky-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('profile_data');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('profile_data', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = (newData: ProfileData) => {
    setProfile(newData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-sky-500/20 selection:text-sky-400 relative overflow-x-auto overflow-y-auto">
      {/* Top Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-sky-500/10 blur-[120px] pointer-events-none z-0" />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-sky-500 z-[100] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <Header profile={profile} />
      <main className="pb-20">
        <Hero profile={profile} />
        <About profile={profile} />
        <Courses />
        <Skills />
        <Testimonials profileName={profile.name} />
        <Social profile={profile} />
        <ContactForm profile={profile} />
      </main>
      <Footer profile={profile} />

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        data={profile} 
        onSave={handleSaveProfile} 
      />

      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-sky-500 text-[#0F172A] rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-sky-400 transition-all"
          >
            <Zap size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

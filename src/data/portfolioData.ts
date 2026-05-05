// src/data/portfolioData.ts
import type { NavLink, PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  personal: {
    // TODO: completar apellido
    name: 'Agustín Avilés',
    role: 'Frontend Developer',
    bio: 'Desarrollador frontend apasionado por construir interfaces modernas y experiencias de usuario fluidas. Me especializo en el ecosistema React con TypeScript.',
    // TODO: completar email
    email: 'agusaviles26@gmail.com',
    // TODO: completar URL de LinkedIn
    linkedin: 'https://linkedin.com/in/agustin-avilés-a1b05b188',
    // TODO: completar URL de GitHub
    github: 'https://github.com/Agustin29av',
    cvUrl: '/001-AgustinAvilesCv.pdf',
    location: 'Entre Ríos, Argentina',
  },
  roles: ['Frontend Developer'],
  stats: [
    { label: 'Años de experiencia', value: '1+' },
    { label: 'Proyectos', value: '10+' },
    { label: 'Tecnologías', value: '15+' },
    { label: 'Mates por día', value: '∞' },
  ],
  skills: [
    { name: 'React', icon: '⚛️', level: 5, category: 'Frontend' },
    { name: 'TypeScript', icon: '🔷', level: 5, category: 'Frontend' },
    { name: 'JavaScript', icon: '🟨', level: 5, category: 'Frontend' },
    { name: 'HTML5', icon: '🧱', level: 5, category: 'Frontend' },
    { name: 'CSS3', icon: '🎨', level: 5, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: '💨', level: 5, category: 'Frontend' },
    { name: 'Zustand', icon: '🐻', level: 4, category: 'Frontend' },
    { name: 'Redux', icon: '🔁', level: 4, category: 'Frontend' },
    { name: 'Next.js', icon: '▲', level: 4, category: 'Frontend' },
    { name: 'Vite', icon: '⚡', level: 5, category: 'Tools' },
    { name: 'Git', icon: '🌿', level: 5, category: 'Tools' },
    { name: 'GitHub', icon: '🐙', level: 5, category: 'Tools' },
    { name: 'VS Code', icon: '🧠', level: 5, category: 'Tools' },
    { name: 'Figma', icon: '🎯', level: 4, category: 'Tools' },
    { name: 'Node.js', icon: '🟢', level: 3, category: 'Otros' },
    { name: 'REST APIs', icon: '🔌', level: 4, category: 'Otros' },
    { name: 'Accesibilidad', icon: '♿', level: 4, category: 'Otros' },
    { name: 'Inglés A1', icon: '🌎', level: 4, category: 'Otros' },
  ],
  projects: [],
  experiences: [
    {
      id: 'my-intelli',
      company: 'My Intelli',
      role: 'Frontend Developer',
      startDate: '2025',
      endDate: '2026',
      bullets: [
        'Desarrollé interfaces responsivas con React y TypeScript siguiendo buenas prácticas de accesibilidad y performance.',
        'Implementé componentes reutilizables y un sistema de diseño consistente para acelerar nuevas features.',
        'Colaboré con el equipo de producto y backend para entregar funcionalidades end-to-end.',
        // TODO: agregar más logros específicos
      ],
    },
  ],
};

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'contact', label: 'Contacto' },
];

// src/data/portfolioData.ts
import type { NavLink, PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  personal: {
    // TODO: completar apellido
    name: "Agustín Avilés",
    role: "Frontend Developer",
    bio: "Desarrollador frontend apasionado por construir interfaces modernas y experiencias de usuario fluidas. Me especializo en el ecosistema React con TypeScript.",
    // TODO: completar email
    email: "agusaviles26@gmail.com",
    // TODO: completar URL de LinkedIn
    linkedin: "https://linkedin.com/in/agustin-avilés-a1b05b188",
    // TODO: completar URL de GitHub
    github: "https://github.com/tu-usuario",
    cvUrl: "/Agustin_Aviles_CV.pdf",
    location: "Entre Ríos, Argentina",
  },
  roles: ["Frontend Developer"],
  stats: [
    { label: "Años de experiencia", value: "1+" },
    { label: "Proyectos", value: "10+" },
    { label: "Tecnologías", value: "15+" },
    { label: "Mates por día", value: "∞" },
  ],
  skills: [
    // Frontend
    { name: "React", icon: "⚛️", level: 5, category: "Frontend" },
    { name: "TypeScript", icon: "🔷", level: 5, category: "Frontend" },
    { name: "JavaScript", icon: "🟨", level: 5, category: "Frontend" },
    { name: "HTML5", icon: "🧱", level: 5, category: "Frontend" },
    { name: "CSS3", icon: "🎨", level: 5, category: "Frontend" },
    { name: "Tailwind CSS", icon: "💨", level: 5, category: "Frontend" },
    { name: "Zustand", icon: "🐻", level: 5, category: "Frontend" },

    // Backend
    { name: "Node.js", icon: "🟢", level: 5, category: "Backend" },
    { name: "Express.js", icon: "⚡", level: 5, category: "Backend" },
    { name: "APIs REST", icon: "🔌", level: 5, category: "Backend" },
    { name: "Prisma ORM", icon: "💎", level: 5, category: "Backend" },

    // Librerías Frontend
    { name: "TanStack Query", icon: "🔄", level: 5, category: "Librerías Frontend" },
    { name: "React Hook Form", icon: "📋", level: 5, category: "Librerías Frontend" },
    { name: "Recharts", icon: "📊", level: 5, category: "Librerías Frontend" },
    { name: "Zod", icon: "🛡️", level: 5, category: "Librerías Frontend" },

    // Bases de Datos
    { name: "MySQL", icon: "🐬", level: 5, category: "Bases de Datos" },
    { name: "PostgreSQL", icon: "🐘", level: 5, category: "Bases de Datos" },

    // Herramientas
    { name: "Git", icon: "🌿", level: 5, category: "Herramientas" },
    { name: "GitHub", icon: "🐙", level: 5, category: "Herramientas" },
    { name: "Scrum", icon: "🏃", level: 5, category: "Herramientas" },
    { name: "Figma", icon: "🎯", level: 5, category: "Herramientas" },
    { name: "Vercel", icon: "▲", level: 5, category: "Herramientas" },
  ],
  projects: [
    {
      id: "concesionario-app",
      title: "Plataforma de Concesionaria Automotriz",
      description:
        "Aplicación fullstack para la gestión y exhibición de vehículos. Incluye un catálogo interactivo para los clientes y un panel de administración integral para gestionar el inventario, registro de ventas, control de finanzas (pagos y cuotas) y administración de leads.",
      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "Prisma",
      ],
      githubUrl: "https://github.com/Agustin29av/concesionario-app",
      liveUrl: "https://concesionario-app.vercel.app/", // TODO: Reemplazar con el link real de Vercel
      imageUrl: "/projects/concesionario-1.jpg",
      images: [
        {
          url: "/projects/concesionario-1.jpg",
          caption: "Página de inicio con buscador de vehículos",
        },
        {
          url: "/projects/concesionario-3.jpg",
          caption: "Catálogo interactivo de autos disponibles",
        },
        {
          url: "/projects/concesionario-5.png",
          caption: "Ficha técnica y detalles del vehículo seleccionado",
        },
        {
          url: "/projects/concesionario-2.png",
          caption: "Administración: Control e inventario de stock (CRUD)",
        },
        {
          url: "/projects/concesionario-4.png",
          caption: "Administración: Seguimiento y cobro de cuotas de clientes",
        },
        {
          url: "/projects/concesionario-6.png",
          caption: "Administración: Dashboard de finanzas y caja",
        },
      ],
      featured: true,
    },
  ],
  experiences: [
    {
      id: "my-intelli",
      company: "My Intelli",
      role: "Frontend Developer",
      startDate: "2025",
      endDate: "2026",
      bullets: [
        "Desarrollé interfaces responsivas con React y TypeScript siguiendo buenas prácticas de accesibilidad y performance.",
        "Implementé componentes reutilizables y un sistema de diseño consistente para acelerar nuevas features.",
        "Colaboré con el equipo de producto y backend para entregar funcionalidades end-to-end.",
        // TODO: agregar más logros específicos
      ],
    },
  ],
};

export const navLinks: NavLink[] = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Proyectos" },
  { id: "experience", label: "Experiencia" },
  { id: "contact", label: "Contacto" },
];

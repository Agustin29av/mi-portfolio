import type { SVGProps } from 'react';

// Brand icons map
export function BrandIcon({ name, fallback, className = "w-6 h-6 text-slate-700 dark:text-slate-300", ...props }: { name: string; fallback?: string; className?: string } & SVGProps<SVGSVGElement>) {
  const normName = name.toLowerCase().trim();

  const baseProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    ...props
  };

  switch (normName) {
    // Frontend
    case 'react':
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="1"/>
          <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/>
          <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>
        </svg>
      );
    case 'typescript':
      return (
        <svg {...baseProps}>
          <path d="m18 16 4-4-4-4"/>
          <path d="m6 8-4 4 4 4"/>
          <path d="m14.5 4-5 16"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg {...baseProps}>
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      );
    case 'html5':
      return (
        <svg {...baseProps}>
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <line x1="3" x2="21" y1="9" y2="9"/>
          <line x1="9" x2="9" y1="21" y2="9"/>
        </svg>
      );
    case 'css3':
      return (
        <svg {...baseProps}>
          <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
          <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
        </svg>
      );
    case 'tailwind css':
      return (
        <svg {...baseProps}>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
      );
    case 'zustand':
      return (
        <svg {...baseProps}>
          <rect width="20" height="5" x="2" y="4" rx="2"/>
          <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/>
          <path d="M10 13h4"/>
        </svg>
      );

    // Backend
    case 'node.js':
      return (
        <svg {...baseProps}>
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
          <line x1="6" x2="6.01" y1="6" y2="6"/>
          <line x1="6" x2="6.01" y1="18" y2="18"/>
        </svg>
      );
    case 'express.js':
    case 'express':
      return (
        <svg {...baseProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    case 'apis rest':
    case 'desarrollo e integración de apis rest':
      return (
        <svg {...baseProps}>
          <rect x="16" y="16" width="6" height="6" rx="1"/>
          <rect x="2" y="16" width="6" height="6" rx="1"/>
          <rect x="9" y="2" width="6" height="6" rx="1"/>
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
          <path d="M12 12V8"/>
        </svg>
      );
    case 'prisma orm':
    case 'prisma':
      return (
        <svg {...baseProps}>
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 12 12 17 22 12"/>
          <polyline points="2 17 12 22 22 17"/>
        </svg>
      );

    // Librerías Frontend
    case 'tanstack query':
      return (
        <svg {...baseProps}>
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
          <path d="M16 21v-5h5"/>
        </svg>
      );
    case 'react hook form':
      return (
        <svg {...baseProps}>
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="m9 14 2 2 4-4"/>
        </svg>
      );
    case 'recharts':
      return (
        <svg {...baseProps}>
          <path d="M3 3v18h18"/>
          <rect width="4" height="7" x="7" y="10" rx="1"/>
          <rect width="4" height="12" x="15" y="5" rx="1"/>
        </svg>
      );
    case 'zod':
      return (
        <svg {...baseProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      );

    // Bases de Datos
    case 'mysql':
      return (
        <svg {...baseProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
          <path d="M3 12A9 3 0 0 0 21 12"/>
        </svg>
      );
    case 'postgresql':
      return (
        <svg {...baseProps}>
          <line x1="22" x2="2" y1="12" y2="12"/>
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
          <line x1="6" x2="6.01" y1="16" y2="16"/>
          <line x1="10" x2="10.01" y1="16" y2="16"/>
        </svg>
      );

    // Herramientas
    case 'git':
      return (
        <svg {...baseProps}>
          <line x1="6" x2="6" y1="3" y2="15"/>
          <circle cx="18" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <path d="M18 9a9 9 0 0 1-9 9"/>
        </svg>
      );
    case 'github':
      return (
        <svg {...baseProps}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      );
    case 'scrum':
      return (
        <svg {...baseProps}>
          <path d="m17 2 4 4-4 4"/>
          <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
          <path d="m7 22-4-4 4-4"/>
          <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
        </svg>
      );
    case 'figma':
      return (
        <svg {...baseProps}>
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      );
    case 'vercel':
      return (
        <svg {...baseProps}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        </svg>
      );

    default:
      return fallback ? <span className="text-2xl font-medium" aria-hidden>{fallback}</span> : null;
  }
}


// src/components/sections/Contact.tsx
import type { FormEvent } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useContactForm } from '../../hooks/useContactForm';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { CheckIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../ui/Icons';

export function Contact() {
  const { personal } = portfolioData;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const {
    form,
    errors,
    status,
    botcheck,
    setBotcheck,
    updateField,
    submit,
  } = useContactForm();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submit();
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-surface-card-dark border-border-light dark:border-border-dark text-sm text-ink-light dark:text-ink-dark placeholder:text-ink-light-muted dark:placeholder:text-ink-dark-muted focus:border-accent-500 focus:outline-none transition-colors';

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent-500/5 to-accent2-500/10 dark:via-accent-500/10 dark:to-accent2-500/10" />

      <div
        ref={ref}
        className={`relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}
      >
        <SectionTitle
          eyebrow="Contacto"
          title={
            <>
              Trabajemos <span className="gradient-text">juntos</span>
            </>
          }
          description="¿Tenés un proyecto en mente o una posición para mí? Me encantaría escucharte."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          {/* Direct contact */}
          <div className="lg:col-span-2 space-y-3">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark hover:border-accent-500 hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 grid place-items-center rounded-lg gradient-bg text-white">
                <MailIcon />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-ink-light-muted dark:text-ink-dark-muted">
                  Email
                </span>
                <span className="block text-sm font-medium break-all">
                  {personal.email}
                </span>
              </span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark hover:border-accent-500 hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 grid place-items-center rounded-lg gradient-bg text-white">
                <LinkedInIcon />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-ink-light-muted dark:text-ink-dark-muted">
                  LinkedIn
                </span>
                <span className="block text-sm font-medium">Conectemos</span>
              </span>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark hover:border-accent-500 hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 grid place-items-center rounded-lg gradient-bg text-white">
                <GitHubIcon />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-ink-light-muted dark:text-ink-dark-muted">
                  GitHub
                </span>
                <span className="block text-sm font-medium">Ver código</span>
              </span>
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-border-light dark:border-border-dark bg-white dark:bg-surface-card-dark"
          >
            {/* Honeypot: invisible para humanos, los bots lo rellenan y Web3Forms descarta */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              checked={!!botcheck}
              onChange={(e) => setBotcheck(e.target.checked ? 'true' : '')}
              style={{ display: 'none' }}
              aria-hidden="true"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputCls}
                  placeholder="Tu nombre"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputCls}
                  placeholder="tu@email.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="Contame en qué estás pensando..."
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button type="submit" disabled={status === 'sending'} size="lg">
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
              {status === 'success' && (
                <span
                  role="status"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <CheckIcon width={16} height={16} />
                  ¡Mensaje enviado! Te respondo pronto.
                </span>
              )}
              {status === 'error' && (
                <span role="alert" className="text-sm font-medium text-red-500">
                  Algo falló. Probá de nuevo o escribime por email.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

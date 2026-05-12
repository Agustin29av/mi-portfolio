// src/hooks/useContactForm.ts
import { useState } from 'react';
import { sendContactMessage } from '../services/contactService';
import type {
  ContactFormData,
  ContactFormErrors,
  ContactStatus,
} from '../types/contact';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL_FORM: ContactFormData = { name: '', email: '', message: '' };

function validateForm(form: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!form.name.trim()) errors.name = 'Tu nombre es requerido';
  if (!form.email.trim()) errors.email = 'Tu email es requerido';
  else if (!emailRe.test(form.email)) errors.email = 'Email inválido';
  if (!form.message.trim()) errors.message = 'Escribí un mensaje';
  else if (form.message.trim().length < 10)
    errors.message = 'Contame un poco más (mín. 10 caracteres)';
  return errors;
}

/**
 * Hook que encapsula el estado, validación y envío del formulario de contacto.
 * La UI solo se preocupa de renderizar; toda la lógica vive acá.
 */
export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [botcheck, setBotcheck] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactStatus>('idle');

  const updateField = <K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (): Promise<void> => {
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('sending');
    try {
      await sendContactMessage({ ...form, botcheck });
      setStatus('success');
      setForm(INITIAL_FORM);
      setBotcheck('');
      window.setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return {
    form,
    errors,
    status,
    botcheck,
    setBotcheck,
    updateField,
    submit,
  };
}

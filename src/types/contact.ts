// src/types/contact.ts

/** Datos que el usuario ingresa en el formulario de contacto. */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/** Errores de validación por campo (mismas keys que ContactFormData). */
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

/** Estado del envío del formulario. */
export type ContactStatus = 'idle' | 'sending' | 'success' | 'error';

/** Payload tal como lo recibe el servicio para enviar a la API. */
export interface ContactPayload extends ContactFormData {
  /** Honeypot anti-spam: si viene con valor, la API descarta el envío. */
  botcheck?: string;
}

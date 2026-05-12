// src/services/contactService.ts
import type { ContactPayload } from '../types/contact';

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

/** Error de dominio para fallas al enviar el mensaje de contacto. */
export class ContactServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactServiceError';
  }
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

/**
 * Envía un mensaje de contacto a través de Web3Forms.
 * @throws {ContactServiceError} si falta la access key, la red falla o la API responde con error.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  if (!ACCESS_KEY) {
    throw new ContactServiceError(
      'Falta VITE_WEB3FORMS_KEY en las variables de entorno.',
    );
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `Nuevo mensaje de ${payload.name} desde tu portfolio`,
        from_name: payload.name,
        ...payload,
      }),
    });
  } catch {
    throw new ContactServiceError('No se pudo conectar con el servidor.');
  }

  const data = (await res.json().catch(() => null)) as Web3FormsResponse | null;
  if (!res.ok || !data?.success) {
    throw new ContactServiceError(data?.message ?? 'No se pudo enviar el mensaje.');
  }
}

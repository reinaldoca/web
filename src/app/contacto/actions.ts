'use server';

import * as z from 'zod';
import { Resend } from 'resend';

// Asegúrate de tener tu clave de API en las variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  try {
    const { name, company, email, message } = data;

    // Para que el envío funcione, el email en 'to' debe estar verificado en tu cuenta de Resend.
    // Usamos 'delivered@resend.dev' que siempre funciona para pruebas.
    // ¡RECUERDA CAMBIARLO POR TU PROPIO EMAIL VERIFICADO!
    const { data: sentData, error } = await resend.emails.send({
      from: 'Tech Solutions AR <onboarding@resend.dev>',
      to: ['delivered@resend.dev'], // <-- ¡IMPORTANTE! CAMBIA ESTO A TU EMAIL VERIFICADO
      subject: `Nuevo Mensaje de Contacto de ${name}`,
      reply_to: email,
      html: `
        <h1>Nueva consulta desde la web</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Email de Contacto:</strong> ${email}</p>
        <hr>
        <h2>Mensaje:</h2>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      // Devolvemos el mensaje de error de Resend para un mejor diagnóstico.
      return { success: false, message: error.message || 'Error al enviar el correo.' };
    }

    console.log('Email sent successfully:', sentData);
    return { success: true, message: 'Ticket generado exitosamente.' };

  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return { success: false, message: 'Ocurrió un error inesperado.' };
  }
}
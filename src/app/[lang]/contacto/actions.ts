
'use server';

import * as z from 'zod';
import nodemailer from 'nodemailer';

const formSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().optional(),
});

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  try {
    // 1. Honeypot validation
    if (data.honeypot) {
      console.log('Honeypot field filled, likely a bot. Submission rejected.');
      // Silently fail to not alert the bot
      return { success: true, message: 'Ticket generado exitosamente.' };
    }

    const { name, company, email, message } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name} - Formulario Web" <contacto@cloudbit.com.ar>`,
      to: process.env.GMAIL_EMAIL,
      replyTo: email,
      subject: `Nuevo Mensaje de Contacto de ${name}`,
      html: `
        <h1>Nueva consulta desde la web</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Email de Contacto:</strong> ${email}</p>
        <hr>
        <h2>Mensaje:</h2>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    return { success: true, message: 'Ticket generado exitosamente.' };

  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return { success: false, message: 'Ocurrió un error inesperado al enviar el correo.' };
  }
}

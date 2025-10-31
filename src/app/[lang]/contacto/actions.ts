'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  // In a real app, you'd integrate with a help desk API here.
  console.log('New contact form submission:', data);
  // This simulates an async operation like an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Ticket created successfully for:', data.email);
  return { success: true, message: 'Ticket generated successfully.' };
}

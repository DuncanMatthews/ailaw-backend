'use server'

import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export async function CreateSubscription(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const firstName = formData.get('firstName') as string;

  try {
    await loops.createContact(email, { firstName });
    return { success: true, message: 'Subscription successful!' };
  } catch (error) {
    return { success: false, message: 'Subscription failed. Please try again.' };
  }
}
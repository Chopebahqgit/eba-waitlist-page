'use server';

import { Resend } from 'resend';
import { supabase } from '@/src/lib/supabase';
import { WaitlistData } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(data: WaitlistData) {
  const { email, fullName, whatsappNumber, deviceInfo } = data;

  if (!email) {
    return { error: 'Email is required.' };
  }

  if (!fullName) {
    return { error: 'Full name is required.' };
  }

  if (!whatsappNumber) {
    return { error: 'WhatsApp number is required.' };
  }

  const insertData: Record<string, unknown> = {
    email: email,
    full_name: fullName,
    whatsapp_number: whatsappNumber,
  };

  if (deviceInfo) {
    insertData.browser = deviceInfo.browser;
    insertData.os = deviceInfo.os;
    insertData.device_type = deviceInfo.device;
    insertData.language = deviceInfo.language;
    insertData.timezone = deviceInfo.timezone;
  }

  const { error: supabaseError } = await supabase
    .from('waitlist')
    .insert([insertData]);

  if (supabaseError) {
    if (supabaseError.code === '23505') {
      return { error: 'You are already on the waitlist!' };
    }
    console.error('Supabase error:', supabaseError);
    return { error: 'Something went wrong. Please try again later.' };
  }

  console.log("got here")
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return { success: true };
    }

    const result = await resend.emails.send({
      from: 'Eba <contact@chopeba.com>',
      to: email,
      subject: "You're on the list! Welcome to Eba",
      html: `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://chopeba-waitlist.vercel.app/eba-logo.png" alt="Eba" width="60" height="60" style="border-radius: 16px;" />
          </div>
          <h1 style="color: #4CAF50; text-align: center; font-size: 28px;">Welcome to Eba! 🎉</h1>
          <p style="font-size: 16px;">Hi ${fullName},</p>
          <p style="font-size: 16px; line-height: 1.6;">Thanks for joining the waitlist for <strong>Eba</strong>. You're now part of a movement to reduce food waste while saving money on quality meals.</p>
          <p style="font-size: 16px; line-height: 1.6;">We're launching soon in Lagos and Abuja. You'll be among the first to know when we go live!</p>
          <div style="background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%); padding: 24px; border-radius: 16px; margin: 30px 0; text-align: center;">
            <h3 style="margin: 0 0 12px 0; color: white; font-size: 18px;">Join Our Community</h3>
            <p style="color: rgba(255,255,255,0.9); margin: 0 0 16px 0; font-size: 14px;">Get exclusive updates and connect with other food savers:</p>
            <a href="https://chat.whatsapp.com/Fe3o96djC8695RDpwswlnI" style="display: inline-block; background-color: white; color: #4CAF50; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px;">Join WhatsApp Group</a>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;"><strong>What's next?</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #666; font-size: 14px; line-height: 1.8;">
              <li>We'll notify you when we launch in your area</li>
              <li>Early supporters get exclusive discounts</li>
              <li>Help us spread the word and earn rewards</li>
            </ul>
          </div>
          <p style="margin-top: 30px; font-size: 14px; color: #999; text-align: center;">
            Save food. Save money. Save the planet.<br/>
            <strong style="color: #333;">The Eba Team</strong>
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully:', result);
  } catch (emailError) {
    console.error('Error sending email:', emailError);
  }

  return { success: true };
}
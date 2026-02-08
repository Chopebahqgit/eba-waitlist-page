'use server';

import { Resend } from 'resend';
import { supabase } from '@/src/lib/supabase';

import { WaitlistData } from '../types';

// Rate limiting or other server-side logic can go here

export async function joinWaitlist(data: WaitlistData) {
  const { email, fullName, whatsappNumber, deviceInfo } = data;

  console.log('Join waitlist attempt for:', email);

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

  console.log('Inserting into Supabase...');
  const { error: supabaseError } = await supabase
    .from('waitlist')
    .insert([insertData]);

  if (supabaseError) {
    if (supabaseError.code === '23505') {
      console.log('User already on waitlist:', email);
      return { error: 'You are already on the waitlist!' };
    }
    console.error('Supabase error:', supabaseError);
    return { error: 'Something went wrong. Please try again later.' };
  }

  console.log('Supabase insert successful.');

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured in environment variables');
      return { success: true, warning: 'Waitlist joined, but welcome email could not be sent.' };
    }

    const resend = new Resend(apiKey);
    console.log('Sending emails via Resend...');

    const [userEmailResponse, adminEmailResponse] = await Promise.all([
      // Welcome email to user
      resend.emails.send({
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
            <p style="font-size: 16px; line-height: 1.6;">We're launching soon in Abuja. You'll be among the first to know when we go live!</p>
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
              Great savings. Best offers.<br/>
              <strong style="color: #333;">The Eba Team</strong>
            </p>
          </div>
        `,
      }),
      // Notification email to company
      resend.emails.send({
        from: 'Eba System <contact@chopeba.com>',
        to: 'contact@chopeba.com',
        subject: `New Waitlist Registration: ${fullName}`,
        html: `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #4CAF50;">New Waitlist Registration! 🚀</h2>
            <p>A new user has just joined the Eba waitlist. Here are the details:</p>
            
            <div style="background-color: #f8f9fa; padding: 24px; border-radius: 16px; margin: 20px 0; border: 1px solid #e9ecef;">
              <p style="margin: 0 0 12px 0;"><strong>Full Name:</strong> ${fullName}</p>
              <p style="margin: 0 0 12px 0;"><strong>Email Address:</strong> ${email}</p>
              <p style="margin: 0 0 12px 0;"><strong>WhatsApp Number:</strong> ${whatsappNumber}</p>
              ${deviceInfo ? `
                <hr style="border: 0; border-top: 1px solid #e9ecef; margin: 20px 0;" />
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;"><strong>Device Information:</strong></p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #666;">
                  <li>Browser: ${deviceInfo?.browser || 'Unknown'}</li>
                  <li>OS: ${deviceInfo?.os || 'Unknown'}</li>
                  <li>Device: ${deviceInfo?.device || 'Unknown'}</li>
                  <li>Language: ${deviceInfo?.language || 'Unknown'}</li>
                  <li>Timezone: ${deviceInfo?.timezone || 'Unknown'}</li>
                </ul>
              ` : ''}
            </div>
            
            <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px;">
              Eba Waitlist Automated Notification
            </p>
          </div>
        `,
      })
    ]);

    if (userEmailResponse.error) {
      console.error('Resend Welcome Email error:', userEmailResponse.error);
    }

    if (adminEmailResponse.error) {
      console.error('Resend Admin Notification error:', adminEmailResponse.error);
    }

    if (userEmailResponse.error && adminEmailResponse.error) {
      return { success: true, warning: 'Waitlist joined, but emails failed to send.' };
    }

    console.log('Emails processed.');
  } catch (emailError) {
    console.error('Unexpected error sending email:', emailError);
  }

  return { success: true };
}

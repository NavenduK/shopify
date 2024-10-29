// src/pages/api/shopify/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query; // Authorization code from Shopify

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  const shopName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;

  if (!clientId || !clientSecret || !shopName) {
    console.error('Missing environment variables:', {
      clientId,
      clientSecret: clientSecret ? 'Provided' : 'Not provided',
      shopName,
    });
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    const response = await axios.post(`https://${shopName}.myshopify.com/admin/oauth/access_token`, {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    });

    const accessToken = response.data.access_token;
    res.status(200).json({ accessToken });
  } catch (error: unknown) {
    // Type guard to check if error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Error obtaining access token:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      // General error logging for non-Axios errors
      console.error('An unexpected error occurred:', error);
    }

    res.status(500).json({ error: 'Failed to obtain access token' });
  }
}

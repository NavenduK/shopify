// src/pages/api/shopify/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query; // Authorization code from Shopify

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID; // Correct usage of environment variable
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET; // Server-side variable
  const shopName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;

  if (!clientId || !clientSecret || !shopName) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  // Exchange authorization code for access token
  try {
    const response = await axios.post(`https://${shopName}.myshopify.com/admin/oauth/access_token`, {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    });

    const accessToken = response.data.access_token;
    // You can now use this access token to make API requests to Shopify
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error obtaining access token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to obtain access token' });
  }
}

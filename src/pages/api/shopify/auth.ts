import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { SHOPIFY_CLIENT_ID, SHOPIFY_REDIRECT_URI } = process.env;

  const shop = req.query.shop as string;
  const redirectUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=read_products&redirect_uri=${SHOPIFY_REDIRECT_URI}`;
  
  res.redirect(redirectUrl);
}

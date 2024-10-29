// src/app/page.tsx
"use client"; // This is a client component

import React from 'react';

const Page = () => {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID; // Use NEXT_PUBLIC prefix
    const shopName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME;

    if (!clientId || !shopName) {
      console.error('Missing Client ID or Shopify Store Name environment variables.');
      alert('Please check your environment variables.');
      return;
    }

    const authUrl = `https://${shopName}.myshopify.com/admin/oauth/authorize?client_id=${clientId}&scope=read_products&redirect_uri=http://localhost:3000/api/shopify/callback`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to My Shopify App</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Log in with Shopify
      </button>
    </div>
  );
};

export default Page;

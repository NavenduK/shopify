// src/app/layout.tsx
import React from 'react';
import '../styles/globals.css'; // Import your global CSS here

export const metadata = {
  title: 'Shopify Login App',
  description: 'Login to Shopify and view store information',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <main className="flex flex-col items-center min-h-screen">
          <header className="w-full p-4 bg-blue-600 text-white text-center">
            <h1 className="text-2xl">Shopify Login App</h1>
          </header>
          {children}
          <footer className="w-full p-4 bg-blue-600 text-white text-center mt-auto">
            <p>&copy; {new Date().getFullYear()} Shopify Login App</p>
          </footer>
        </main>
      </body>
    </html>
  );
}

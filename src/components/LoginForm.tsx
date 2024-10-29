import { useState } from 'react';

const LoginForm = () => {
  const [shopName, setShopName] = useState('');

  const handleLogin = () => {
    if (shopName) {
      window.location.href = `/api/shopify/auth?shop=${shopName}.myshopify.com`;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login with Shopify</h1>
        <input
          type="text"
          placeholder="Enter your shop name"
          className="border p-2 rounded w-full mb-4"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

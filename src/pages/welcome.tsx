import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface ShopInfo {
  name: string;
}

const Welcome = () => {
  const router = useRouter();
  const { shop, access_token } = router.query;
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const response = await axios.get(`https://${shop}/admin/api/2023-07/shop.json`, {
          headers: {
            'X-Shopify-Access-Token': access_token as string,
          },
        });
        setShopInfo(response.data.shop);
      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    };

    if (shop && access_token) {
      fetchShopInfo();
    }
  }, [shop, access_token]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {shopInfo ? (
          <h1 className="text-3xl font-bold">Welcome, {shopInfo.name}!</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Welcome;

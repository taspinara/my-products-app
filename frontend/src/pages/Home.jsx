import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Featured Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
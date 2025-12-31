import { Link } from 'react-router-dom';
import type { Product } from '../App';

interface HomePageProps {
  products: Product[];
}

export function HomePage({ products }: HomePageProps) {
  const categories = [...new Set(products.map(p => p.category))].map(category => {
    const count = products.filter(p => p.category === category).length;
    return { name: category, count };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Каталог</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <Link
            key={category.name}
            to={`/category/${encodeURIComponent(category.name)}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <h2 className="font-semibold text-lg text-gray-800">
              {category.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {category.count} {getProductWord(category.count)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getProductWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;
  
  if (lastTwo >= 11 && lastTwo <= 14) return 'товаров';
  if (lastOne === 1) return 'товар';
  if (lastOne >= 2 && lastOne <= 4) return 'товара';
  return 'товаров';
}
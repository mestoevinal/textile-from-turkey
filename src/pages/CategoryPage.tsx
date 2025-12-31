import { Link, useParams } from 'react-router-dom';
import type { Product } from '../App';
import { ProductCard } from '../components/ProductCard';

interface CategoryPageProps {
  products: Product[];
}

export function CategoryPage({ products }: CategoryPageProps) {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategory = decodeURIComponent(categoryName || '');
  
  const categoryProducts = products.filter(p => p.category === decodedCategory);

  if (categoryProducts.length === 0) {
    return (
      <div>
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Назад к каталогу
        </Link>
        <p className="text-gray-500">Категория не найдена или в ней нет товаров</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Назад к каталогу
      </Link>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{decodedCategory}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
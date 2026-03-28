import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { AdminPage } from './pages/AdminPage';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

function preloadImages(products: Product[]): void {
  products.forEach(product => {
    product.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });
}

async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category')
    .order('name');

  if (error) throw error;

  return (data ?? []).map(row => ({
    ...row,
    images: row.images ?? [],
  }));
}

function CatalogShell({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 lg:p-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-gray-500">Загрузка...</div>
          </div>
        ) : error ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-red-500">{error}</div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        preloadImages(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Не удалось загрузить данные');
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/"
          element={
            <CatalogShell loading={loading} error={error}>
              <HomePage products={products} />
            </CatalogShell>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <CatalogShell loading={loading} error={error}>
              <CategoryPage products={products} />
            </CatalogShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

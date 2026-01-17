import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  images: string;
}

interface CachedData {
  products: Product[];
  version: string;
}

const SHEET_ID = '1FjeC0gX-2rDkh0SX-0EVPBhCKf2Sgt3Rzw8EzE3sMc8';
const PRODUCTS_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
const VERSION_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=705638294`;

const CACHE_KEY = 'products_cache';

function parseProducts(rawData: RawProduct[]): Product[] {
  return rawData
    .filter(item => item.id)
    .map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price) || 0,
      category: item.category,
      images: item.images
        ? item.images.split(/[|;]+/).map(url => url.trim()).filter(Boolean)
        : []
    }));
}

function getCachedData(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

function setCachedData(products: Product[], version: string): void {
  try {
    const data: CachedData = { products, version };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage может быть недоступен
  }
}

async function fetchVersion(): Promise<string> {
  const response = await fetch(VERSION_URL);
  const text = await response.text();
  // Парсим CSV — версия будет во второй строке (первая — заголовок)
  const lines = text.trim().split('\n');
  return lines[1]?.trim() || '';
}

async function fetchProducts(): Promise<Product[]> {
  // 1. Получаем текущую версию с сервера
  const serverVersion = await fetchVersion();
  
  // 2. Проверяем кэш
  const cached = getCachedData();
  if (cached && cached.version === serverVersion) {
    console.log('Используем кэш, версия:', serverVersion);
    return cached.products;
  }
  
  console.log('Загружаем новые данные, версия:', serverVersion);
  
  // 3. Загружаем товары
  const response = await fetch(PRODUCTS_URL);
  const text = await response.text();
  const { data } = Papa.parse<RawProduct>(text, { header: true });
  const products = parseProducts(data);
  
  // 4. Сохраняем в кэш с версией
  setCachedData(products, serverVersion);
  
  return products;
}

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Не удалось загрузить данные');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:categoryName" element={<CategoryPage products={products} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
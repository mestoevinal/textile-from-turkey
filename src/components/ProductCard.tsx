import { useState } from 'react';
import type { Product } from '../App';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = product.images.length > 0;
  const hasMultipleImages = product.images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage(prev => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Image slider */}
      <div className="aspect-[4/3] bg-gray-100 relative group">
        {hasImages ? (
          <>
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ›
                </button>
              </>
            )}
            
            {/* Dots indicator */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Нет изображения
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800">{product.name}</h3>
        
        {product.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <p className="text-lg font-semibold text-gray-900 mt-2">
          {formatPrice(product.price)} ₽
        </p>
      </div>
    </div>
  );
}
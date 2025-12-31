import { useState, useRef } from 'react';
import type { Product } from '../App';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = product.images.length > 0;
  const hasMultipleImages = product.images.length > 1;
  
  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left - next image
        setCurrentImage(prev => (prev + 1) % product.images.length);
      } else {
        // Swipe right - previous image
        setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

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
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image slider */}
      <div 
        className="aspect-[5/4] sm:aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative group"
        onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
        onTouchMove={hasMultipleImages ? handleTouchMove : undefined}
        onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
      >
        {hasImages ? (
          <>
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
            
            {/* Navigation arrows - hidden on mobile */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white rounded-full hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm text-gray-600 hover:text-gray-900"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white rounded-full hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm text-gray-600 hover:text-gray-900"
                >
                  ›
                </button>
              </>
            )}
            
            {/* Dots indicator */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImage 
                        ? 'bg-white w-3' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-gray-800 text-sm sm:text-base leading-tight">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        
        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">
          {formatPrice(product.price)} <span className="text-gray-400 font-normal">₽</span>
        </p>
      </div>
    </div>
  );
}
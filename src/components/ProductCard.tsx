import { useState, useRef } from 'react';
import type { Product } from '../App';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
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
        setCurrentImage(prev => (prev + 1) % product.images.length);
      } else {
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

  // Проверяем, длинное ли описание (больше 60 символов)
  const isLongDescription = product.description && product.description.length > 60;

  return (
    <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image slider */}
      <div 
        className="aspect-[3/2] sm:aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative group"
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
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/50 hover:bg-white/80 active:bg-white rounded-full flex items-center justify-center transition-all shadow-sm text-gray-700"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/50 hover:bg-white/80 active:bg-white rounded-full flex items-center justify-center transition-all shadow-sm text-gray-700"
                >
                  ›
                </button>
              </>
            )}
            
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
          <div className="mt-1">
            <p className={`text-xs sm:text-sm text-gray-500 leading-relaxed whitespace-pre-line ${
              !isDescriptionExpanded && isLongDescription ? 'line-clamp-2' : ''
            }`}>
              {product.description}
            </p>
            <div className="h-5">
              {isLongDescription && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-xs text-blue-500 hover:text-blue-600 mt-1 cursor-pointer"
                >
                  {isDescriptionExpanded ? 'Скрыть' : 'Показать полностью'}
                </button>
              )}
            </div>
          </div>
        )}
        
        <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">
          {formatPrice(product.price)} <span className="text-gray-400 font-normal">₽</span>
        </p>
        <a 
          href={`https://wa.me/79888035221?text=${encodeURIComponent(
            `Информация о товаре: [#${product.id}] [${product.name}] — ${formatPrice(product.price)} ₽\n\nВаш комментарий:`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-3 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2 border border-gray-200"
        >
          <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Купить
        </a>
      </div>
    </div>
  );
}
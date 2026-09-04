import React, { useEffect } from 'react';
import { PharmacyProduct } from '../types';
import { X, Package, ShieldCheck, MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

interface PharmacyDetailModalProps {
  product: PharmacyProduct | null;
  onClose: () => void;
  onReserve: (product: PharmacyProduct) => void;
}

export const PharmacyDetailModal: React.FC<PharmacyDetailModalProps> = ({
  product,
  onClose,
  onReserve,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  return (
    <div
      id="pharmacy-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171B18]/60 backdrop-blur-xs transition-opacity overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="pharmacy-detail-modal-dialog"
        className="bg-[#FAF8F4] w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative shadow-xl border border-[#171B18]/10 text-[#171B18] my-8 max-h-[90vh] overflow-y-auto"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#171B18]/50 hover:text-[#171B18] transition-colors focus:outline-none cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          {/* Image */}
          <div className="w-full sm:w-56 shrink-0 aspect-square rounded-xl overflow-hidden bg-white border border-[#171B18]/10 flex items-center justify-center p-2 relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fb = document.getElementById('modal-img-fallback');
                  if (fb) fb.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              id="modal-img-fallback"
              className={`flex flex-col items-center justify-center text-[#171B18]/40 p-4 text-center ${
                product.image ? 'hidden' : 'flex'
              }`}
            >
              <Package className="w-12 h-12 mb-2 stroke-1" />
              <span className="text-xs">Фото в аптеке</span>
            </div>
            {product.inStock ? (
              <span className="absolute top-2 left-2 bg-[#285B49] text-white text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-xs">
                {product.stock}
              </span>
            ) : (
              <span className="absolute top-2 left-2 bg-[#171B18]/70 text-white text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-xs">
                {product.stock}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#285B49] font-semibold block mb-1">
                {product.categoryName}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171B18] leading-snug">
                {product.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-3">
                {product.price > 0 ? (
                  <span className="text-2xl font-bold text-[#285B49]">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                ) : (
                  <span className="text-base font-semibold text-[#171B18]/70">
                    Цена по запросу в аптеке
                  </span>
                )}
                <span className="text-xs text-[#171B18]/60">
                  {product.stock} на складе
                </span>
              </div>
            </div>

            {/* Micro badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#171B18]/10 text-xs text-[#171B18]/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#285B49] shrink-0" />
                <span>Ленинский пр., 168</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#285B49] shrink-0" />
                <span>Ежедневно 09:00–22:00</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#285B49] shrink-0" />
                <span>Официальный ветпрепарат</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#285B49] shrink-0" />
                <span>Контроль t° хранения</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2 border-t border-[#171B18]/10">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171B18]/70 mb-1.5">
                Описание и применение
              </h4>
              <p className="text-sm text-[#171B18]/85 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onReserve(product);
                  onClose();
                }}
                className="flex-1 bg-[#285B49] text-white hover:bg-[#20493b] px-5 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Забронировать в аптеке</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+78127010416"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#171B18]/20 hover:bg-[#171B18]/5 text-sm font-medium text-[#171B18] transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#285B49]" />
                <span>+7 (812) 701-04-16</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

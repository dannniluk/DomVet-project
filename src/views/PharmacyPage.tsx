import React, { useState, useMemo } from 'react';
import { PHARMACY_PRODUCTS, PHARMACY_CATEGORIES } from '../data/pharmacyData';
import { PharmacyProduct } from '../types';
import { resolveAssetPath } from '../utils/assetPath';
import {
  Search,
  X,
  Package,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

interface PharmacyPageProps {
  onOpenAppointment: (defaultComment?: string) => void;
  onSelectProduct: (product: PharmacyProduct) => void;
}

const ProductCardImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex flex-col items-center justify-center text-[#171B18]/30">
        <Package className="w-10 h-10 stroke-1 mb-1" />
        <span className="text-[11px]">Фото в аптеке</span>
      </div>
    );
  }

  return (
    <img
      src={resolveAssetPath(src)}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      referrerPolicy="no-referrer"
    />
  );
};

export const PharmacyPage: React.FC<PharmacyPageProps> = ({
  onOpenAppointment,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = [...PHARMACY_PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categoryId === selectedCategory);
    }

    // Stock filter
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => {
        if (a.price === 0) return 1;
        if (b.price === 0) return -1;
        return a.price - b.price;
      });
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    return list;
  }, [selectedCategory, onlyInStock, searchQuery, sortBy]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PHARMACY_PRODUCTS.length };
    PHARMACY_PRODUCTS.forEach((p) => {
      counts[p.categoryId] = (counts[p.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleCount(24);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(24);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setVisibleCount(24);
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen text-[#171B18] pt-12 pb-24">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HEADER SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-b border-[#171B18]/10 pb-12 mb-10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
              ВЕТЕРИНАРНАЯ АПТЕКА · ЛЕНИНСКИЙ ПР., 168
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-[#171B18] leading-[1.1]">
              Каталог ветеринарной аптеки
            </h1>
            <p className="text-lg text-[#171B18]/80 leading-relaxed">
              Более 500 сертифицированных лекарственных препаратов, вакцин, лечебных и профилактических средств с соблюдением температурного режима хранения. Работаем ежедневно с 09:00 до 22:00.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#171B18]/70">
              <div className="flex items-center gap-1.5 bg-[#171B18]/5 px-3 py-1.5 rounded-sm">
                <MapPin className="w-3.5 h-3.5 text-[#285B49]" />
                <span>СПб, Ленинский пр., 168</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#171B18]/5 px-3 py-1.5 rounded-sm">
                <Clock className="w-3.5 h-3.5 text-[#285B49]" />
                <span>09:00–22:00 ежедневно</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#171B18]/5 px-3 py-1.5 rounded-sm">
                <Phone className="w-3.5 h-3.5 text-[#285B49]" />
                <a href="tel:+78127010416" className="hover:text-[#285B49] font-medium">
                  +7 (812) 701-04-16
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FILTER & CONTROLS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 mb-8">
        <div className="space-y-6">
          {/* Search bar + stock toggle + sort */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#171B18]/40" />
              <input
                type="text"
                placeholder="Поиск по названию или действию (Бравекто, Онсиор, лосьон...)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-11 pr-10 py-3 bg-white rounded-xl border border-[#171B18]/15 text-sm focus:outline-none focus:border-[#285B49] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#171B18]/40 hover:text-[#171B18] transition-colors cursor-pointer"
                  aria-label="Очистить"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Only in stock */}
              <button
                onClick={() => setOnlyInStock(!onlyInStock)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-2 cursor-pointer ${
                  onlyInStock
                    ? 'bg-[#285B49] text-white border-[#285B49]'
                    : 'bg-white text-[#171B18]/80 border-[#171B18]/15 hover:border-[#171B18]/30'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${
                    onlyInStock ? 'border-white bg-white' : 'border-[#171B18]/30'
                  }`}
                >
                  {onlyInStock && <Check className="w-3 h-3 text-[#285B49] stroke-[3]" />}
                </div>
                <span>Только в наличии</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-1 bg-white border border-[#171B18]/15 rounded-xl px-3 py-2 text-xs">
                <span className="text-[#171B18]/50">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-[#171B18] focus:outline-none cursor-pointer"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="name">По названию (А–Я)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {PHARMACY_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#285B49] text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-[#171B18]/80 border border-[#171B18]/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#171B18]/5 text-[#171B18]/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count indicator */}
          <div className="flex items-center justify-between text-xs text-[#171B18]/60 pt-1">
            <span>
              Найдено товаров:{' '}
              <strong className="text-[#171B18] font-semibold">{filteredProducts.length}</strong>
            </span>
            {filteredProducts.length > visibleCount && (
              <span>
                Показано 1–{visibleCount} из {filteredProducts.length}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRODUCTS GRID
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#171B18]/10 my-8">
            <Package className="w-12 h-12 text-[#171B18]/30 mx-auto mb-3 stroke-1" />
            <h3 className="text-lg font-semibold text-[#171B18] mb-1">Ничего не найдено</h3>
            <p className="text-sm text-[#171B18]/60 max-w-md mx-auto mb-4">
              Попробуйте изменить поисковый запрос или сбросить фильтры. Вы также можете позвонить фармацевту и уточнить наличие.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyInStock(false);
              }}
              className="px-5 py-2.5 bg-[#285B49] text-white rounded-full text-xs font-medium cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-[#171B18]/10 flex flex-col justify-between overflow-hidden hover:border-[#285B49]/40 hover:shadow-sm transition-all group cursor-pointer"
                onClick={() => onSelectProduct(prod)}
              >
                <div>
                  {/* Image container */}
                  <div className="aspect-square bg-[#F7F6F2] p-4 flex items-center justify-center relative overflow-hidden">
                    <ProductCardImage src={prod.image} alt={prod.name} />

                    {/* Stock badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                          prod.inStock
                            ? 'bg-[#285B49] text-white'
                            : 'bg-[#171B18]/60 text-white'
                        }`}
                      >
                        {prod.stock}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <span className="text-[11px] font-medium text-[#285B49] uppercase tracking-wider block">
                      {prod.categoryName}
                    </span>
                    <h3 className="text-sm font-semibold text-[#171B18] line-clamp-2 leading-snug group-hover:text-[#285B49] transition-colors">
                      {prod.name}
                    </h3>
                  </div>
                </div>

                {/* Footer price & CTA */}
                <div className="p-4 pt-0 border-t border-[#171B18]/5 mt-2 flex items-center justify-between">
                  <div>
                    {prod.price > 0 ? (
                      <span className="text-base font-bold text-[#171B18]">
                        {prod.price.toLocaleString('ru-RU')} ₽
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-[#171B18]/60">
                        По запросу
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#285B49] group-hover:translate-x-0.5 transition-transform">
                    Подробнее →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more button */}
        {filteredProducts.length > visibleCount && (
          <div className="text-center pt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="bg-white hover:bg-[#FAF8F4] text-[#171B18] border border-[#171B18]/20 px-8 py-3.5 rounded-full text-sm font-medium transition-colors cursor-pointer shadow-xs"
            >
              Загрузить ещё 24 товара ({filteredProducts.length - visibleCount} осталось)
            </button>
          </div>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PHARMACY CONSULTATION BANNER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 mt-16">
        <div className="bg-[#285B49] text-[#FAF8F4] rounded-2xl p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E97832]">
                ПОМОЩЬ В ПОДБОРЕ ПРЕПАРАТА
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF8F4]">
                Нужна консультация по дозировке или наличию?
              </h2>
              <p className="text-sm sm:text-base text-[#FAF8F4]/85 leading-relaxed max-w-2xl">
                Ветеринарный фармацевт ДОМВЕТ поможет подобрать аналог, сверит дозировку по весу животного и забронирует нужный препарат к вашему визиту.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="tel:+78127010416"
                className="bg-white text-[#285B49] hover:bg-[#FAF8F4] px-6 py-3.5 rounded-full text-sm font-semibold transition-colors text-center inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>+7 (812) 701-04-16</span>
              </a>
              <button
                onClick={() => onOpenAppointment('Бронирование препаратов в ветаптеке')}
                className="bg-[#E97832] text-white hover:bg-[#d96a26] px-6 py-3.5 rounded-full text-sm font-semibold transition-colors text-center cursor-pointer"
              >
                Оставить заявку на препарат
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

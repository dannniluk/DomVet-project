import React, { useState, useMemo } from 'react';
import { ALL_PRICES, POPULAR_PRICES, PRICE_CATEGORIES, CLINIC_INFO } from '../data/clinicData';
import { PriceItem } from '../types';
import { Search, ArrowRight, ShieldCheck, HeartHandshake, Phone } from 'lucide-react';

interface PricePageProps {
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
}

export const PricePage: React.FC<PricePageProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все категории');

  // Filtered prices based on search or category
  const filteredPrices = useMemo(() => {
    let list = ALL_PRICES;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'Все категории') {
      return list.filter((p) => p.category === selectedCategory);
    }

    return list;
  }, [searchQuery, selectedCategory]);

  // Group by category when viewing all categories without search
  const categoriesToDisplay = useMemo(() => {
    if (searchQuery.trim()) {
      return [];
    }
    if (selectedCategory !== 'Все категории') {
      return [selectedCategory];
    }
    // Return all actual categories in order
    return PRICE_CATEGORIES.filter((c) => c !== 'Все категории');
  }, [searchQuery, selectedCategory]);

  return (
    <div id="price-page" className="w-full bg-[#FAF8F4] text-[#171B18] min-h-screen">
      {/* Page Hero */}
      <section className="bg-[#F3E7DC] py-14 lg:py-20 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
              ПРАЙС-ЛИСТ КЛИНИКИ
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171B18]">
              Услуги и цены
            </h1>
            <p className="text-lg text-[#171B18]/80 leading-relaxed">
              Стоимость основных услуг DOMVET. Цены указаны в рублях в соответствии с действующим прейскурантом клиники на Ленинском проспекте, 168.
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="mt-8 max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#171B18]/50 absolute left-4 pointer-events-none" />
              <input
                id="price-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найти услугу (например: стерилизация, УЗИ, приём, вакцинация)..."
                className="w-full bg-white border border-[#171B18]/20 rounded-full pl-12 pr-12 py-3.5 text-base text-[#171B18] placeholder:text-[#171B18]/40 focus:outline-none focus:border-[#285B49] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-[#171B18]/50 hover:text-[#171B18] cursor-pointer"
                >
                  Очистить
                </button>
              )}
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#171B18]/70">
              <span className="font-medium text-[#171B18]/50">Например:</span>
              {['стерилизация', 'УЗИ сердца', 'приём терапевта', 'вакцинация', 'чипирование', 'грызуны'].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      setSelectedCategory('Все категории');
                    }}
                    className="bg-white/70 hover:bg-white border border-[#171B18]/10 px-2.5 py-1 rounded-full text-[#171B18]/80 cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular prices strip (when not searching) */}
      {!searchQuery && selectedCategory === 'Все категории' && (
        <section className="bg-white border-b border-[#171B18]/10 py-10">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] mb-6">
              ЧАСТО ЗАПРАШИВАЕМЫЕ УСЛУГИ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {POPULAR_PRICES.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenBooking(undefined, item.name)}
                  className="p-5 rounded-lg border border-[#171B18]/10 hover:border-[#285B49]/40 bg-[#FAF8F4] flex flex-col justify-between cursor-pointer group transition-all"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#285B49] uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base font-semibold text-[#171B18] group-hover:text-[#285B49] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#171B18]/65 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#171B18]/10 flex items-center justify-between">
                    <span className="text-base font-semibold text-[#285B49] font-mono">
                      {item.price}
                    </span>
                    <span className="text-xs font-medium text-[#E97832] group-hover:translate-x-1 transition-transform">
                      Записаться →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Prices Layout with Category Navigation */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          {searchQuery ? (
            /* Search Results View */
            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#171B18]/10 pb-4">
                <h2 className="text-2xl font-semibold text-[#171B18]">
                  Результаты поиска: «{searchQuery}»
                </h2>
                <span className="text-sm text-[#171B18]/60">
                  Найдено позиций: {filteredPrices.length}
                </span>
              </div>

              {filteredPrices.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-white rounded-xl border border-[#171B18]/10 p-8">
                  <p className="text-lg text-[#171B18]/80">
                    По запросу «{searchQuery}» ничего не найдено.
                  </p>
                  <p className="text-sm text-[#171B18]/60 max-w-md mx-auto">
                    Вы можете уточнить стоимость или наличие процедуры по телефону клиники:{' '}
                    <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="font-semibold text-[#285B49]">
                      {CLINIC_INFO.phone}
                    </a>
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-sm text-[#E97832] font-semibold cursor-pointer"
                  >
                    Показать все услуги
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-[#171B18]/10 divide-y divide-[#171B18]/10 overflow-hidden">
                  {filteredPrices.map((item) => (
                    <PriceRowItem key={item.id} item={item} onOpenBooking={onOpenBooking} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Structured Category View with Sticky Horizontal / Sidebar Navigation */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Category selector */}
              <div className="lg:col-span-3 lg:sticky lg:top-[96px] space-y-1 bg-white p-3 rounded-xl border border-[#171B18]/10">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/50 px-3 py-2">
                  Категории
                </div>
                {PRICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat !== 'Все категории') {
                        const el = document.getElementById(`category-${cat}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#285B49] text-white font-medium'
                        : 'text-[#171B18]/80 hover:bg-[#FAF8F4] hover:text-[#171B18]'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === 'Ритуальные услуги' && (
                      <span className="text-[10px] opacity-70">деликатно</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Price lists by category */}
              <div className="lg:col-span-9 space-y-12">
                {categoriesToDisplay.map((catName) => {
                  const catItems = ALL_PRICES.filter((p) => p.category === catName);
                  if (catItems.length === 0) return null;
                  const isSensitive = catName === 'Ритуальные услуги';

                  return (
                    <div
                      key={catName}
                      id={`category-${catName}`}
                      className="scroll-mt-28 space-y-4"
                    >
                      <div className="flex items-baseline justify-between border-b border-[#171B18]/15 pb-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-semibold text-[#171B18]">
                            {catName}
                          </h2>
                          {isSensitive && (
                            <span className="text-xs bg-[#D8D8D4]/60 text-[#171B18]/70 px-2 py-0.5 rounded">
                              Деликатные услуги
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#171B18]/50">
                          {catItems.length} поз.
                        </span>
                      </div>

                      {isSensitive && (
                        <div className="bg-[#FAF8F4] border border-[#171B18]/10 p-4 rounded-lg text-xs sm:text-sm text-[#171B18]/75 leading-relaxed">
                          Эвтаназия проводится исключительно по строгим медицинским показаниям при неизлечимых заболеваниях и терминальных страданиях животного. Процедура осуществляется бережно, под глубоким общим наркозом.
                        </div>
                      )}

                      <div className="bg-white rounded-xl border border-[#171B18]/10 divide-y divide-[#171B18]/10 overflow-hidden">
                        {catItems.map((item) => (
                          <PriceRowItem
                            key={item.id}
                            item={item}
                            onOpenBooking={onOpenBooking}
                            isSensitive={isSensitive}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Price Consultation & Disclaimer Notice */}
      <section className="bg-[#F3E7DC] py-12 border-t border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-[#171B18]">
              Нужна помощь в расчёте стоимости лечения?
            </h3>
            <p className="text-sm text-[#171B18]/70 max-w-xl leading-relaxed">
              Администратор клиники сориентирует вас по необходимому объёму обследования и ориентировочной стоимости препаратов.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-white text-[#171B18] hover:text-[#285B49] border border-[#171B18]/20 px-6 py-3 rounded-full text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-[#285B49]" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#E97832] hover:bg-[#d86b27] text-white px-7 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer shadow-xs"
            >
              Записаться на приём
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface PriceRowItemProps {
  item: PriceItem;
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
  isSensitive?: boolean;
}

const PriceRowItem: React.FC<PriceRowItemProps> = ({ item, onOpenBooking, isSensitive }) => {
  return (
    <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[#FAF8F4] transition-colors">
      <div className="max-w-2xl space-y-1">
        <div className="text-base sm:text-lg font-medium text-[#171B18] leading-snug">
          {item.name}
        </div>
        {item.description && (
          <div className="text-xs sm:text-sm text-[#171B18]/70 leading-relaxed">
            {item.description}
          </div>
        )}
      </div>

      <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0">
        <div className="text-lg sm:text-xl font-semibold text-[#285B49] font-mono">
          {item.price}
        </div>

        {!isSensitive && (
          <button
            onClick={() => onOpenBooking(undefined, item.name)}
            className="text-xs font-medium text-[#E97832] hover:text-[#d86b27] transition-colors cursor-pointer"
          >
            Записаться →
          </button>
        )}
      </div>
    </div>
  );
};

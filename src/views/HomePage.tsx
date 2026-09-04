import React from 'react';
import { CLINIC_INFO, DOCTORS, POPULAR_PRICES, REVIEWS_DATA, CLINIC_GALLERY } from '../data/clinicData';
import { ViewMode, Doctor } from '../types';
import { resolveAssetPath } from '../utils/assetPath';
import { ArrowRight, Phone, Clock, MapPin, Check, Star } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: ViewMode, serviceSlug?: string) => void;
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectDoctor,
}) => {
  return (
    <div className="w-full">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 01 — HERO
          Entire hero is ONE composition on warm cream #F3E7DC
          Desktop height ~620-680px
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="hero-section"
        className="relative bg-[#F3E7DC] overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto w-full px-5 sm:px-8 lg:px-10 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Main text content */}
          <div className="lg:col-span-7 z-10 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#285B49] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#285B49]" />
              <span>Санкт-Петербург · Московский район</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-semibold tracking-[-0.03em] text-[#171B18] leading-[1.02]">
              Ветеринарная клиника
              <br />
              на Ленинском.
              <br />
              <span className="text-[#285B49]">С 2003 года.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#171B18]/85 max-w-xl font-normal leading-relaxed">
              Приём, диагностика, хирургия и лечение кошек, собак и экзотических животных.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-book-btn"
                onClick={() => onOpenBooking()}
                className="bg-[#E97832] hover:bg-[#d86b27] text-white px-7 py-3.5 rounded-full text-base font-medium tracking-wide shadow-xs transition-colors cursor-pointer text-center"
              >
                Записаться на приём
              </button>

              <a
                id="hero-call-btn"
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-medium text-[#171B18] hover:text-[#285B49] border border-[#171B18]/20 hover:border-[#285B49]/40 transition-colors text-center"
              >
                <Phone className="w-4 h-4 text-[#285B49]" />
                <span>{CLINIC_INFO.phone}</span>
              </a>
            </div>

            <div className="pt-2 text-xs sm:text-sm text-[#171B18]/65 flex flex-wrap items-center gap-y-1 gap-x-4">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#285B49]" />
                Ленинский пр., 168
              </span>
              <span className="hidden sm:inline text-[#171B18]/30">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#285B49]" />
                Ежедневно 09:00–22:00
              </span>
              <span className="hidden sm:inline text-[#171B18]/30">·</span>
              <span>Без обеда и выходных</span>
            </div>
          </div>

          {/* Right: Large authentic documentary veterinary photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-4/5 sm:aspect-4/3 lg:aspect-4/5 rounded-2xl overflow-hidden shadow-sm bg-[#D8D8D4]">
              <img
                src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=80"
                alt="Приём и осмотр животного врачом в клинике ДОМВЕТ"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.015]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171B18]/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-[#171B18]/50 backdrop-blur-xs px-3.5 py-2 rounded-lg font-medium">
                Клинический осмотр и терапия в DOMVET на Ленинском
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 02 — TRUST / FACTS
          White / warm-white background
          Three large editorial columns with large whitespace and thin dividers
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="facts-section"
        className="bg-[#FAF8F4] py-16 lg:py-24 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-[#171B18]/15">
            {/* Fact 1 */}
            <div className="pt-6 md:pt-0 md:pr-8 lg:pr-10 space-y-3">
              <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#285B49] block">
                С 2003 года
              </span>
              <h3 className="text-xl font-medium text-[#171B18]">
                Постоянная практика на Ленинском
              </h3>
              <p className="text-[#171B18]/75 text-[15px] leading-relaxed">
                Независимая ветеринарная клиника в Московском районе Санкт-Петербурга. Ведём единый архив амбулаторных историй пациентов на протяжении более 20 лет.
              </p>
            </div>

            {/* Fact 2 */}
            <div className="pt-8 md:pt-0 md:px-8 lg:px-10 space-y-3">
              <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#285B49] block">
                Кошки, собаки и экзоты
              </span>
              <h3 className="text-xl font-medium text-[#171B18]">
                Широкий спектр пациентов
              </h3>
              <p className="text-[#171B18]/75 text-[15px] leading-relaxed">
                Наряду с терапией кошек и собак ведём специализированный приём птиц, грызунов, хорьков и рептилий с учётом их видовой физиологии и обмена веществ.
              </p>
            </div>

            {/* Fact 3 */}
            <div className="pt-8 md:pt-0 md:pl-8 lg:pl-10 space-y-3">
              <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#285B49] block">
                Диагностика и хирургия
              </span>
              <h3 className="text-xl font-medium text-[#171B18]">
                Оснащённая база на месте
              </h3>
              <p className="text-[#171B18]/75 text-[15px] leading-relaxed">
                Ультразвуковая диагностика экспертного класса, ЭхоКГ сердца, операционный блок с мониторингом жизненных показателей и ветеринарная аптека.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 03 — SERVICES
          Background: soft grey #D8D8D4
          Restrained cards: background rgba(255,255,255,0.40), padding 28-32px
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="services-section"
        className="bg-[#D8D8D4] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
                УСЛУГИ
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#171B18]">
                Чем мы можем помочь
              </h2>
            </div>
            <button
              onClick={() => { onNavigate('prices'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#285B49] hover:text-[#171B18] transition-colors group cursor-pointer"
            >
              <span>Посмотреть все цены клиники</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Row 1: Four primary blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div
              onClick={() => onNavigate('service-detail', 'priem')}
              className="bg-white/45 hover:bg-white/70 transition-all p-7 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group min-h-[220px]"
            >
              <div>
                <span className="text-xs font-mono text-[#285B49] block mb-3 font-semibold">01</span>
                <h3 className="text-xl font-semibold text-[#171B18] mb-2 group-hover:text-[#285B49] transition-colors">
                  Приём врача
                </h3>
                <p className="text-sm text-[#171B18]/75 leading-relaxed">
                  Первичный и повторный терапевтический осмотр, сбор анамнеза, постановка диагноза и схема лечения.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#285B49] group-hover:translate-x-1 transition-transform">
                Подробнее →
              </div>
            </div>

            <div
              onClick={() => onNavigate('service-detail', 'diagnostika')}
              className="bg-white/45 hover:bg-white/70 transition-all p-7 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group min-h-[220px]"
            >
              <div>
                <span className="text-xs font-mono text-[#285B49] block mb-3 font-semibold">02</span>
                <h3 className="text-xl font-semibold text-[#171B18] mb-2 group-hover:text-[#285B49] transition-colors">
                  Диагностика
                </h3>
                <p className="text-sm text-[#171B18]/75 leading-relaxed">
                  УЗИ брюшной полости, скрининг сердца (ЭхоКГ), клинические и биохимические анализы крови.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#285B49] group-hover:translate-x-1 transition-transform">
                Подробнее →
              </div>
            </div>

            <div
              onClick={() => onNavigate('service-detail', 'hirurgiya')}
              className="bg-white/45 hover:bg-white/70 transition-all p-7 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group min-h-[220px]"
            >
              <div>
                <span className="text-xs font-mono text-[#285B49] block mb-3 font-semibold">03</span>
                <h3 className="text-xl font-semibold text-[#171B18] mb-2 group-hover:text-[#285B49] transition-colors">
                  Хирургия
                </h3>
                <p className="text-sm text-[#171B18]/75 leading-relaxed">
                  Стерилизация, кастрация, абдоминальные операции и остеосинтез в оборудованном операционном блоке.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#285B49] group-hover:translate-x-1 transition-transform">
                Подробнее →
              </div>
            </div>

            <div
              onClick={() => onNavigate('service-detail', 'ekzoty')}
              className="bg-white/45 hover:bg-white/70 transition-all p-7 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group min-h-[220px]"
            >
              <div>
                <span className="text-xs font-mono text-[#285B49] block mb-3 font-semibold">04</span>
                <h3 className="text-xl font-semibold text-[#171B18] mb-2 group-hover:text-[#285B49] transition-colors">
                  Экзотические животные
                </h3>
                <p className="text-sm text-[#171B18]/75 leading-relaxed">
                  Приём ратолога, герпетолога и орнитолога: кролики, морские свинки, крысы, птицы и рептилии.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-semibold text-[#285B49] group-hover:translate-x-1 transition-transform">
                Подробнее →
              </div>
            </div>
          </div>

          {/* Row 2: Secondary services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigate('service-detail', 'vakcinaciya')}
              className="bg-white/30 hover:bg-white/60 transition-all p-6 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group"
            >
              <div>
                <h4 className="text-base font-semibold text-[#171B18] mb-1 group-hover:text-[#285B49]">
                  Вакцинация
                </h4>
                <p className="text-xs text-[#171B18]/70">
                  Осмотр перед прививкой, сертифицированные биопрепараты, чипирование и паспорт.
                </p>
              </div>
              <span className="pt-3 text-xs font-medium text-[#285B49]">Подробнее →</span>
            </div>

            <div
              onClick={() => onNavigate('service-detail', 'stomatologiya')}
              className="bg-white/30 hover:bg-white/60 transition-all p-6 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group"
            >
              <div>
                <h4 className="text-base font-semibold text-[#171B18] mb-1 group-hover:text-[#285B49]">
                  Стоматология
                </h4>
                <p className="text-xs text-[#171B18]/70">
                  УЗ-санация ротовой полости, полировка эмали, экстракция зубов и дентология грызунов.
                </p>
              </div>
              <span className="pt-3 text-xs font-medium text-[#285B49]">Подробнее →</span>
            </div>

            <div
              onClick={() => onNavigate('service-detail', 'onkologiya')}
              className="bg-white/30 hover:bg-white/60 transition-all p-6 rounded-sm flex flex-col justify-between border border-[#171B18]/6 cursor-pointer group"
            >
              <div>
                <h4 className="text-base font-semibold text-[#171B18] mb-1 group-hover:text-[#285B49]">
                  Онкология
                </h4>
                <p className="text-xs text-[#171B18]/70">
                  Биопсия новообразований, цитология, гистология и подбор протоколов химиотерапии.
                </p>
              </div>
              <span className="pt-3 text-xs font-medium text-[#285B49]">Подробнее →</span>
            </div>

            <div
              onClick={() => { onNavigate('prices'); window.scrollTo(0, 0); }}
              className="bg-[#285B49] text-white p-6 rounded-sm flex flex-col justify-between cursor-pointer group hover:bg-[#20493b] transition-colors"
            >
              <div>
                <h4 className="text-base font-semibold mb-1">
                  Все услуги и прайс
                </h4>
                <p className="text-xs text-white/80">
                  Полный перечень медицинских манипуляций, анализов и операций клиники.
                </p>
              </div>
              <span className="pt-3 text-xs font-medium text-[#FAF8F4] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Перейти в прайс-лист →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 04 — HISTORY / LOCAL TRUST
          Warm cream #F3E7DC
          Two-column editorial composition (50% image, 50% text)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="history-section"
        className="bg-[#F3E7DC] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Image (approx 50%) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#D8D8D4]">
                <img
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80"
                  alt="Доктор и пациент в клинике ДОМВЕТ на Ленинском"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Text (approx 50%) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
                ИСТОРИЯ КЛИНИКИ
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171B18]">
                Рядом с 2003 года
              </h2>

              <p className="font-editorial italic text-xl lg:text-2xl text-[#171B18]/90 leading-snug">
                «С 2003 года рядом с вами и вашими питомцами.»
              </p>

              <div className="space-y-4 text-base text-[#171B18]/80 leading-relaxed">
                <p>
                  Клиника DOMVET была открыта на Ленинском проспекте более двух десятилетий назад как независимый районный ветеринарный центр. За эти годы через приём наших врачей прошли тысячи животных Московского и соседних районов Петербурга.
                </p>
                <p>
                  Мы бережно сохраняем преемственность: все амбулаторные карты, динамика хронических заболеваний, результаты анализов и операции фиксируются в единой базе. Многие семьи обращаются к нам уже с третьим или четвёртым поколением домашних питомцев.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-6">
                <div>
                  <div className="text-2xl font-bold text-[#285B49]">20+ лет</div>
                  <div className="text-xs text-[#171B18]/60 mt-0.5">Непрерывной работы</div>
                </div>
                <div className="w-[1px] h-10 bg-[#171B18]/15" />
                <div>
                  <div className="text-2xl font-bold text-[#285B49]">Ленинский 168</div>
                  <div className="text-xs text-[#171B18]/60 mt-0.5">Неизменный адрес</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 05 — DOCTORS
          Warm white #FAF8F4
          4 key doctors with 4:5 ratio portraits, no shadow, simple cards
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="doctors-section"
        className="bg-[#FAF8F4] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
                СПЕЦИАЛИСТЫ
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#171B18]">
                Врачи Домвет
              </h2>
              <p className="text-base text-[#171B18]/70 mt-2 max-w-xl">
                Опытные практикующие специалисты с непрерывным стажем в хирургии, терапии, диагностике и лечении экзотических животных.
              </p>
            </div>
            <button
              onClick={() => { onNavigate('doctors'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#285B49] hover:text-[#171B18] transition-colors group cursor-pointer"
            >
              <span>Посмотреть всех врачей</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {DOCTORS.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDoctor(doc)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-4/5 rounded-xl overflow-hidden bg-[#D8D8D4] mb-4">
                    <img
                      src={resolveAssetPath(doc.image)}
                      alt={doc.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#171B18] group-hover:text-[#285B49] transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-[#285B49] font-medium mt-1">
                    {doc.position}
                  </p>
                  <p className="text-xs text-[#171B18]/70 mt-2">
                    {doc.shortSpecialization}
                  </p>
                </div>
                <div className="pt-3 text-xs font-semibold text-[#285B49] group-hover:translate-x-1 transition-transform">
                  Подробнее →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 06 — EXOTIC ANIMALS
          Deep green #285B49, text warm white
          Visual differentiator
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="exotics-section"
        className="bg-[#285B49] text-[#FAF8F4] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E97832] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E97832]" />
                <span>СПЕЦИАЛИЗИРОВАННОЕ НАПРАВЛЕНИЕ</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight leading-[1.08] text-[#FAF8F4]">
                Не только кошки
                <br />
                и собаки
              </h2>

              <p className="text-lg text-[#FAF8F4]/85 leading-relaxed">
                В клинике DOMVET ведёт приём специалист по экзотическим животным (ратолог, орнитолог, герпетолог).
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-sm text-[#FAF8F4]/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E97832] shrink-0" />
                  <span>Птицы и попугаи</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E97832] shrink-0" />
                  <span>Кролики и грызуны</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E97832] shrink-0" />
                  <span>Рептилии и ящерицы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E97832] shrink-0" />
                  <span>Хорьки и куньи</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => { onNavigate('exotics'); window.scrollTo(0, 0); }}
                  className="bg-[#FAF8F4] text-[#285B49] hover:bg-white px-7 py-3.5 rounded-full text-base font-medium transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Лечение экзотических животных</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#20493b]">
                <img
                  src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=80"
                  alt="Экзотические животные: кролики, птицы, рептилии в клинике ДОМВЕТ"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 07 — DIAGNOSTICS
          Alternating image / text layout
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="diagnostics-section"
        className="bg-[#FAF8F4] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#D8D8D4]">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
                  alt="Ультразвуковая диагностика и обследование в ДОМВЕТ"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
                ВИЗУАЛЬНАЯ И ЛАБОРАТОРНАЯ ДИАГНОСТИКА
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171B18]">
                Диагностика на месте
              </h2>

              <div className="space-y-4 text-base text-[#171B18]/80 leading-relaxed">
                <p>
                  Быстрая и точная диагностика позволяет определить причину недомогания питомца до назначения лечения. Мы проводим комплексное УЗИ органов брюшной полости, скрининговое эхокардиографическое исследование сердца (ЭхоКГ), забор анализов и микроскопические исследования соскобов.
                </p>
                <p>
                  Сложные биохимические и цитологические образцы направляются в профильные ветеринарные лаборатории города с получением результатов в кратчайшие сроки.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('service-detail', 'diagnostika')}
                  className="bg-[#285B49] text-white hover:bg-[#20493b] px-6 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  Узнать об УЗИ и анализах
                </button>
                <span className="text-xs text-[#171B18]/60">
                  Заключение выдаётся сразу на руки
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 08 — PRICES
          Editorial list with horizontal separators and right-aligned prices
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="prices-section"
        className="bg-[#FAF8F4] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
                СТОИМОСТЬ
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#171B18]">
                Популярные услуги и цены
              </h2>
            </div>
            <button
              onClick={() => { onNavigate('prices'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#285B49] hover:text-[#171B18] transition-colors group cursor-pointer"
            >
              <span>Открыть полный прайс-лист</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="divide-y divide-[#171B18]/12 border-t border-b border-[#171B18]/12">
            {POPULAR_PRICES.map((item) => (
              <div
                key={item.id}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:bg-[#F3E7DC]/40 px-2 transition-colors"
              >
                <div className="max-w-xl">
                  <div className="text-base sm:text-lg font-medium text-[#171B18]">
                    {item.name}
                  </div>
                  {item.description && (
                    <div className="text-xs sm:text-sm text-[#171B18]/65 mt-1 leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>

                <div className="text-lg sm:text-xl font-semibold text-[#285B49] shrink-0 sm:text-right mt-1 sm:mt-0 font-mono">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#171B18]/60">
              Цены соответствуют официальному прайсу DOMVET на Ленинском. Точная стоимость хирургических процедур зависит от веса животного и препаратов.
            </p>
            <button
              onClick={() => { onNavigate('prices'); window.scrollTo(0, 0); }}
              className="text-sm font-semibold text-[#E97832] hover:text-[#d86b27] transition-colors shrink-0 cursor-pointer"
            >
              Все услуги и цены →
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 09 — CLINIC / SPACE
          Editorial image grid (interior, ultrasound, surgery, pharmacy)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="clinic-space-section"
        className="bg-[#FAF8F4] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
              ПРОСТРАНСТВО КЛИНИКИ
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#171B18]">
              Клиника на Ленинском
            </h2>
            <p className="text-base text-[#171B18]/70 mt-2 max-w-xl">
              Чистые процедурные кабинеты, изолированный операционный блок, УЗИ-кабинет и ветеринарная аптека на Ленинском проспекте, 168.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINIC_GALLERY.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#D8D8D4]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-semibold text-[#171B18] leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#171B18]/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 10 — REVIEWS
          Warm cream #F3E7DC
          Minimal layout, genuine review text, Yandex source
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="reviews-section"
        className="bg-[#F3E7DC] py-20 lg:py-28 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
              ОТЗЫВЫ ВЛАДЕЛЬЦЕВ
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#171B18]">
              Нам доверяют питомцев
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-white/50 p-7 sm:p-8 rounded-xl flex flex-col justify-between border border-[#171B18]/6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#E97832]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-[15px] text-[#171B18]/85 leading-relaxed italic">
                    «{rev.text}»
                  </p>
                </div>

                <div className="pt-6 border-t border-[#171B18]/10 mt-6">
                  <div className="font-semibold text-sm text-[#171B18]">{rev.author}</div>
                  <div className="text-xs text-[#171B18]/60 mt-0.5 flex items-center justify-between">
                    <span>{rev.petInfo}</span>
                    <span className="text-[#285B49] font-medium">{rev.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 11 — VETERINARY PHARMACY
          Soft grey #D8D8D4
          Factual text, veterinary diets, prescription medications
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="pharmacy-section"
        className="bg-[#D8D8D4] py-16 lg:py-24 border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
                ПРИ КЛИНИКЕ · ЛЕНИНСКИЙ ПР., 168
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171B18]">
                Ветаптека с полным каталогом
              </h2>
              <p className="text-base text-[#171B18]/80 max-w-2xl leading-relaxed">
                В клинике постоянно работает лицензированная ветеринарная аптека с контролем температурного режима хранения. В каталоге более 580 наименований: противопаразитарные препараты, антибиотики, кардиологические и урологические средства, уход за глазами и ушами, послеоперационные попоны и лечебные диеты.
              </p>
              <div className="pt-2 text-xs text-[#171B18]/65">
                Наличие и дозировки можно проверить в онлайн-каталоге или уточнить по телефону:{' '}
                <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="font-semibold text-[#285B49] hover:underline">
                  {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-start lg:justify-end">
              <button
                onClick={() => { onNavigate('pharmacy'); window.scrollTo(0, 0); }}
                className="bg-[#285B49] hover:bg-[#20493b] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Открыть каталог ветаптеки</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="bg-white hover:bg-[#FAF8F4] text-[#171B18] px-6 py-3 rounded-full text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 border border-[#171B18]/15"
              >
                <Phone className="w-3.5 h-3.5 text-[#285B49]" />
                <span>Связаться с фармацевтом</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 12 — CONTACTS
          Large split layout (50% info, 50% map)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="contacts-section"
        className="bg-[#FAF8F4] overflow-hidden border-b border-[#171B18]/10"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch min-h-[500px]">
            {/* Left 50%: information */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
                    КАК НАС НАЙТИ
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#171B18]">
                    {CLINIC_INFO.brandName}
                  </h2>
                </div>

                <div className="space-y-4 text-base text-[#171B18]/85">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#285B49] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg text-[#171B18]">
                        {CLINIC_INFO.city}
                      </div>
                      <div>{CLINIC_INFO.address}</div>
                      <div className="text-xs text-[#171B18]/60 mt-0.5">
                        {CLINIC_INFO.metro}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#285B49] shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-lg text-[#171B18]">
                        {CLINIC_INFO.hours}
                      </div>
                      <div className="text-xs text-[#171B18]/60 mt-0.5">
                        Ежедневно, без перерыва на обед
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#285B49] shrink-0 mt-1" />
                    <div>
                      <a
                        href={`tel:${CLINIC_INFO.phoneRaw}`}
                        className="font-semibold text-2xl text-[#171B18] hover:text-[#285B49] transition-colors"
                      >
                        {CLINIC_INFO.phone}
                      </a>
                      <div className="text-xs text-[#171B18]/60 mt-0.5">
                        Запись на приём и консультации администратора
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenBooking()}
                  className="bg-[#E97832] hover:bg-[#d86b27] text-white px-7 py-3.5 rounded-full text-base font-medium shadow-xs transition-colors cursor-pointer text-center"
                >
                  Записаться на приём
                </button>
                <a
                  href={`https://yandex.ru/maps/?rtext=~59.85172,30.30456`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#171B18]/25 hover:border-[#285B49] px-6 py-3.5 rounded-full text-base font-medium text-[#171B18] transition-colors text-center"
                >
                  <span>Построить маршрут в Яндекс Картах</span>
                  <ArrowRight className="w-4 h-4 text-[#285B49]" />
                </a>
              </div>
            </div>

            {/* Right 50%: Interactive Map */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#171B18]/15 bg-[#EAE8E3] relative min-h-[380px] lg:min-h-full">
              <iframe
                title="Схема расположения клиники ДОМВЕТ на Ленинском"
                src="https://yandex.ru/map-widget/v1/?ll=30.304560%2C59.851720&z=16&pt=30.304560%2C59.851720,pm2gnm"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md text-xs font-medium text-[#171B18] shadow-xs pointer-events-none">
                📍 Ленинский проспект, 168 · DOMVET
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

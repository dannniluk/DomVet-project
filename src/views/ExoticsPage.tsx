import React from 'react';
import { DOCTORS, ALL_PRICES, CLINIC_INFO } from '../data/clinicData';
import { Doctor } from '../types';
import { resolveAssetPath } from '../utils/assetPath';
import { Check, AlertCircle, Phone, ArrowRight, Shield } from 'lucide-react';

interface ExoticsPageProps {
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

const EXOTIC_SPECIES = [
  {
    title: 'Грызуны и зайцеобразные',
    desc: 'Декоративные кролики, морские свинки, шиншиллы, дегу, хомяки, крысы, песчанки.',
    carePoints: [
      'Стачивание крючков и коррекция дентального синдрома',
      'Лечение стаза ЖКТ и тимпании',
      'Диагностика респираторных микоплазмозов крыс',
      'Удаление абсцессов и новообразований'
    ],
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Птицы и попугаи',
    desc: 'Волнистые попугаи, кореллы, неразлучники, жако, амазоны, какаду, певчие птицы.',
    carePoints: [
      'Диагностика орнитоза, цирковируса и аспергиллеза',
      'Микроскопия мазков зоба и копрограммы',
      'Коррекция клюва и когтей',
      'Терапия самоощипывания и дефицитных состояний'
    ],
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Рептилии и амфибии',
    desc: 'Бородатые агамы, эублефары, игуаны, хамелеоны, сухопутные и водные черепахи, змеи.',
    carePoints: [
      'Лечение вторичного пищевого гиперпаратиреоза (рахита)',
      'Помощь при патологической линьке и травмах панциря',
      'Коррекция температурного и ультрафиолетового режима',
      'Лечение пневмоний и стоматитов рептилий'
    ],
    image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Хорьки и куньи',
    desc: 'Домашние фретки (хорьки).',
    carePoints: [
      'Плановая вакцинация и чипирование хорьков',
      'Кастрация (хирургическая и химическая супрелорином)',
      'Диагностика гиперадренокортицизма (болезни надпочечников)',
      'Удаление инородных тел из желудка и кишечника'
    ],
    image: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?auto=format&fit=crop&w=800&q=80'
  }
];

export const ExoticsPage: React.FC<ExoticsPageProps> = ({
  onOpenBooking,
  onSelectDoctor,
}) => {
  const exoticDoctor = DOCTORS.find((d) => d.id === 'osipenko') || DOCTORS[0];
  const exoticPrices = ALL_PRICES.filter(
    (p) =>
      p.id === 'p-priem-exotic' ||
      p.id === 'p-dent-rodent' ||
      p.id === 'p-castr-ferret' ||
      p.id === 'p-diag-fecal'
  );

  return (
    <div id="exotics-page" className="w-full bg-[#FAF8F4] text-[#171B18] min-h-screen">
      {/* Hero: Deep green distinctive surface */}
      <section className="bg-[#285B49] text-[#FAF8F4] py-16 lg:py-24 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E97832] block">
                СПЕЦИАЛИЗИРОВАННОЕ ОТДЕЛЕНИЕ DOMVET
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F4] leading-[1.05]">
                Лечение экзотических
                <br />
                животных
              </h1>
              <p className="text-lg sm:text-xl text-[#FAF8F4]/85 leading-relaxed font-normal">
                Ратолог, орнитолог и герпетолог в Московском районе Санкт-Петербурга. Приём птиц, грызунов, рептилий и хорьков с 2003 года.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenBooking(exoticDoctor.name, 'Приём специалиста по экзотическим животным')}
                  className="bg-[#E97832] hover:bg-[#d86b27] text-white px-7 py-3.5 rounded-full text-base font-medium shadow-xs transition-colors cursor-pointer text-center"
                >
                  Записаться к ратологу
                </button>
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 border border-[#FAF8F4]/30 hover:border-[#FAF8F4] px-6 py-3.5 rounded-full text-base font-medium text-[#FAF8F4] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E97832]" />
                  <span>{CLINIC_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#20493b] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1000&q=80"
                  alt="Экзотические животные в DOMVET"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor in charge */}
      <section className="bg-white py-12 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="bg-[#FAF8F4] p-6 sm:p-8 rounded-2xl border border-[#171B18]/10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="w-32 sm:w-40 aspect-4/5 rounded-xl overflow-hidden bg-[#D8D8D4] shrink-0">
              <img
                src={resolveAssetPath(exoticDoctor.image)}
                alt={exoticDoctor.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 flex-1 text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#285B49] block">
                Врач направления
              </span>
              <h3 className="text-2xl font-bold text-[#171B18]">{exoticDoctor.name}</h3>
              <p className="text-sm font-medium text-[#285B49]">{exoticDoctor.position}</p>
              <p className="text-xs text-[#171B18]/75 leading-relaxed max-w-xl">
                {exoticDoctor.bio}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectDoctor(exoticDoctor)}
                  className="text-xs font-semibold text-[#285B49] hover:underline cursor-pointer"
                >
                  Подробнее о враче и квалификации →
                </button>
              </div>
            </div>
            <button
              onClick={() => onOpenBooking(exoticDoctor.name, 'Приём ратолога / орнитолога')}
              className="bg-[#285B49] text-white hover:bg-[#20493b] px-6 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer shrink-0"
            >
              Записаться к врачу
            </button>
          </div>
        </div>
      </section>

      {/* Species Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
              ВИДЫ ПАЦИЕНТОВ
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171B18]">
              Кого мы лечим
            </h2>
            <p className="text-base text-[#171B18]/70 mt-2 max-w-2xl">
              Лечение экзотических животных требует специального инструментария (стоматологические расширители, микроборы, микродозирование анестетиков).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXOTIC_SPECIES.map((sp, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#171B18]/10 overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-16/9 overflow-hidden bg-[#D8D8D4]">
                  <img
                    src={sp.image}
                    alt={sp.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#171B18]">{sp.title}</h3>
                    <p className="text-xs text-[#171B18]/70 mt-1">{sp.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#171B18]/8">
                    <div className="text-xs font-semibold text-[#285B49] uppercase tracking-wider">
                      Ключевые манипуляции:
                    </div>
                    {sp.carePoints.map((pt, i) => (
                      <div key={i} className="text-xs text-[#171B18]/80 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#285B49] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenBooking(exoticDoctor.name, `Приём: ${sp.title}`)}
                    className="w-full bg-[#FAF8F4] hover:bg-[#DCE6DE]/50 border border-[#171B18]/10 text-xs font-semibold text-[#171B18] py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Записаться с {sp.title.toLowerCase()}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing list for Exotics */}
      <section className="bg-[#F3E7DC] py-16 border-t border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block mb-2">
              СТОИМОСТЬ
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171B18]">
              Цены на приём и манипуляции для экзотов
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-[#171B18]/10 divide-y divide-[#171B18]/10 overflow-hidden max-w-3xl">
            {exoticPrices.map((p) => (
              <div key={p.id} className="p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-base font-medium text-[#171B18]">{p.name}</div>
                  {p.description && (
                    <div className="text-xs text-[#171B18]/65 mt-0.5">{p.description}</div>
                  )}
                </div>
                <div className="text-lg font-semibold text-[#285B49] font-mono shrink-0">
                  {p.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

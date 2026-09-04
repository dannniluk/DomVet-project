import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { ViewMode } from '../types';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer id="main-footer" className="bg-[#285B49] text-[#FAF8F4] pt-20 pb-12 border-t border-[#285B49]/80">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Large brand typography moment */}
        <div className="border-b border-[#FAF8F4]/15 pb-12 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#FAF8F4]/60 block mb-3 font-semibold">
              Ветеринарная клиника на Ленинском
            </span>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#FAF8F4] leading-none">
              {CLINIC_INFO.brandName}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-editorial italic text-xl lg:text-2xl text-[#FAF8F4]/90 leading-snug">
              «С 2003 года рядом с вами и вашими питомцами.»
            </p>
            <p className="text-sm text-[#FAF8F4]/60 mt-3 leading-relaxed">
              Московский район Санкт-Петербурга. Приём кошек, собак, птиц, грызунов, рептилий и экзотических животных.
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 border-b border-[#FAF8F4]/15">
          {/* Col 1: Contacts & Hours */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#FAF8F4]/50 font-semibold">
              Контакты и приём
            </h3>
            <div>
              <a
                id="footer-phone"
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="text-2xl lg:text-3xl font-semibold text-[#FAF8F4] hover:text-[#E97832] transition-colors block"
              >
                {CLINIC_INFO.phone}
              </a>
              <p className="text-xs text-[#FAF8F4]/60 mt-1">
                Многоканальный телефон клиники
              </p>
            </div>

            <div className="space-y-2 pt-2 text-sm text-[#FAF8F4]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E97832] shrink-0 mt-0.5" />
                <span>
                  {CLINIC_INFO.city}, {CLINIC_INFO.address}
                  <br />
                  <span className="text-xs text-[#FAF8F4]/60">{CLINIC_INFO.metro}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E97832] shrink-0" />
                <span>{CLINIC_INFO.hours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="footer-book-btn"
                onClick={onOpenBooking}
                className="bg-[#E97832] hover:bg-[#d86b27] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                Записаться на приём
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#FAF8F4]/50 font-semibold">
              Разделы
            </h3>
            <ul className="space-y-2.5 text-[15px]">
              <li>
                <button
                  onClick={() => { onNavigate('services'); window.scrollTo(0,0); }}
                  className="text-[#FAF8F4]/80 hover:text-white transition-colors"
                >
                  Услуги и направления
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('doctors'); window.scrollTo(0,0); }}
                  className="text-[#FAF8F4]/80 hover:text-white transition-colors"
                >
                  Врачи клиники
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('prices'); window.scrollTo(0,0); }}
                  className="text-[#FAF8F4]/80 hover:text-white transition-colors"
                >
                  Прайс-лист и цены
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('exotics'); window.scrollTo(0,0); }}
                  className="text-[#FAF8F4]/80 hover:text-white transition-colors"
                >
                  Лечение экзотических животных
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('pharmacy'); window.scrollTo(0, 0); }}
                  className="text-[#FAF8F4]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Ветаптека (каталог)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contacts'); window.scrollTo(0,0); }}
                  className="text-[#FAF8F4]/80 hover:text-white transition-colors"
                >
                  Контакты и схема проезда
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical directions */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#FAF8F4]/50 font-semibold">
              Направления помощи
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF8F4]/70">
              <li>Терапия и осмотр</li>
              <li>УЗИ экспертного класса и ЭхоКГ</li>
              <li>Хирургия и анестезиология</li>
              <li>Вакцинация и микрочипирование</li>
              <li>Стоматология и ультразвуковая санация</li>
              <li>Ратология, орнитология и герпетология</li>
              <li>Онкология и дерматология</li>
              <li>Хранение истории болезни с 2003 г.</li>
            </ul>
          </div>

          {/* Col 4: Reference to original source */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-[#FAF8F4]/50 font-semibold">
              Фактический сайт
            </h3>
            <p className="text-xs text-[#FAF8F4]/70 leading-relaxed">
              Официальный архив клиники:
            </p>
            <a
              href="https://www.domvet.ru/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#E97832] hover:text-white transition-colors font-medium"
            >
              domvet.ru
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/50">
          <div>
            © 2003–{new Date().getFullYear()} Ветеринарная клиника «ДОМВЕТ». Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            <span>Лицензия на фармацевтическую деятельность</span>
            <span>Не является публичной офертой</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

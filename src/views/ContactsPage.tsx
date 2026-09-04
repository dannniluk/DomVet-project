import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Clock, Phone, Navigation, ArrowRight, Bus, Car } from 'lucide-react';

interface ContactsPageProps {
  onOpenBooking: () => void;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({ onOpenBooking }) => {
  return (
    <div id="contacts-page" className="w-full bg-[#FAF8F4] text-[#171B18] min-h-screen">
      {/* Hero */}
      <section className="bg-[#F3E7DC] py-14 lg:py-20 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
              КОНТАКТНАЯ ИНФОРМАЦИЯ
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171B18]">
              Контакты и адрес
            </h1>
            <p className="text-lg text-[#171B18]/80 leading-relaxed">
              Ветеринарная клиника ДОМВЕТ расположена в Московском районе Санкт-Петербурга по адресу: Ленинский проспект, 168. Работаем ежедневно без перерыва на обед с 09:00 до 22:00.
            </p>
          </div>
        </div>
      </section>

      {/* Main Info + Map Layout */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-[#171B18]/10 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#285B49] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/50">
                        Адрес
                      </h3>
                      <p className="text-lg font-semibold text-[#171B18] mt-0.5">
                        {CLINIC_INFO.city}, {CLINIC_INFO.address}
                      </p>
                      <p className="text-xs text-[#171B18]/60 mt-1">
                        {CLINIC_INFO.metro}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#171B18]/10 space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#285B49] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/50">
                        Режим работы
                      </h3>
                      <p className="text-lg font-semibold text-[#171B18] mt-0.5">
                        {CLINIC_INFO.hours}
                      </p>
                      <p className="text-xs text-[#171B18]/60 mt-1">
                        Приём врачей по предварительной записи и в порядке живой очереди при экстренных состояниях.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#171B18]/10 space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#285B49] shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/50">
                        Телефон клиники
                      </h3>
                      <a
                        href={`tel:${CLINIC_INFO.phoneRaw}`}
                        className="text-2xl font-bold text-[#171B18] hover:text-[#285B49] transition-colors block mt-0.5"
                      >
                        {CLINIC_INFO.phone}
                      </a>
                      <p className="text-xs text-[#171B18]/60 mt-1">
                        Консультации администратора и запись на приём
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to get there instructions */}
              <div className="bg-[#F3E7DC] p-6 rounded-xl space-y-3 border border-[#171B18]/6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#285B49]">
                  Как добраться
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm text-[#171B18]/80">
                  <div className="flex items-start gap-2.5">
                    <Bus className="w-4 h-4 text-[#285B49] shrink-0 mt-0.5" />
                    <span>
                      <strong>Пешком / общественный транспорт:</strong> От м. «Московская» (выход на Ленинский пр.) пешком 12 минут или 2 остановки на троллейбусе/автобусе до остановки «Варшавская улица».
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Car className="w-4 h-4 text-[#285B49] shrink-0 mt-0.5" />
                    <span>
                      <strong>На автомобиле:</strong> Удобный подъезд с Ленинского проспекта или улицы Варшавской. Вдоль фасада дома 168 имеется бесплатная парковка.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="bg-[#E97832] hover:bg-[#d86b27] text-white px-7 py-3.5 rounded-full text-base font-medium shadow-xs transition-colors cursor-pointer text-center"
                >
                  Записаться на приём
                </button>
                <a
                  href={`https://yandex.ru/maps/?rtext=~59.85172,30.30456`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#171B18]/20 hover:border-[#285B49] px-6 py-3.5 rounded-full text-base font-medium text-[#171B18] transition-colors text-center"
                >
                  <span>Маршрут в Яндекс Картах</span>
                  <ArrowRight className="w-4 h-4 text-[#285B49]" />
                </a>
              </div>
            </div>

            {/* Map 50% */}
            <div className="lg:col-span-7 h-[580px] rounded-2xl overflow-hidden border border-[#171B18]/15 bg-[#EAE8E3] relative shadow-sm">
              <iframe
                title="Карта проезда к ветеринарной клинике ДОМВЕТ"
                src="https://yandex.ru/map-widget/v1/?ll=30.304560%2C59.851720&z=16&pt=30.304560%2C59.851720,pm2gnm"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-[#171B18]/10 text-xs shadow-md space-y-1">
                <div className="font-bold text-[#171B18] text-sm">ДОМВЕТ</div>
                <div className="text-[#171B18]/70">Ленинский проспект, 168</div>
                <div className="text-[#285B49] font-medium">Ежедневно 09:00–22:00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

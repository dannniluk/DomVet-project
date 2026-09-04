import React from 'react';
import { SERVICES_DATA } from '../data/clinicData';
import { ViewMode } from '../types';
import { resolveAssetPath } from '../utils/assetPath';
import { ArrowRight, Check } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (slug: string) => void;
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  return (
    <div id="services-overview-page" className="w-full bg-[#FAF8F4] text-[#171B18] min-h-screen">
      {/* Hero */}
      <section className="bg-[#F3E7DC] py-14 lg:py-20 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
              НАПРАВЛЕНИЯ ПОМОЩИ
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171B18]">
              Услуги клиники DOMVET
            </h1>
            <p className="text-lg text-[#171B18]/80 leading-relaxed">
              Полный цикл ветеринарной помощи: от плановой вакцинации и профилактического осмотра до полостной хирургии, УЗИ экспертного класса и лечения экзотических животных.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES_DATA.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#171B18]/10 overflow-hidden flex flex-col justify-between group hover:border-[#285B49]/40 transition-all"
              >
                <div>
                  <div
                    onClick={() => {
                      onSelectService(service.slug);
                      window.scrollTo(0, 0);
                    }}
                    className="aspect-16/9 overflow-hidden bg-[#D8D8D4] cursor-pointer"
                  >
                    <img
                      src={resolveAssetPath(service.image)}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2
                        onClick={() => {
                          onSelectService(service.slug);
                          window.scrollTo(0, 0);
                        }}
                        className="text-2xl font-bold tracking-tight text-[#171B18] group-hover:text-[#285B49] transition-colors cursor-pointer"
                      >
                        {service.title}
                      </h2>
                      <span className="text-xs font-mono text-[#285B49] font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-sm text-[#171B18]/75 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#171B18]/8">
                      <div className="text-xs font-semibold text-[#171B18]/50 uppercase tracking-wider">
                        Показания к визиту:
                      </div>
                      {service.whenNeeded.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-xs text-[#171B18]/80 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#285B49] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-[#171B18]/8 mt-2">
                  <button
                    onClick={() => {
                      onSelectService(service.slug);
                      window.scrollTo(0, 0);
                    }}
                    className="text-xs font-semibold text-[#285B49] hover:text-[#171B18] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Подробнее об услуге</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(undefined, service.title)}
                    className="bg-[#E97832] hover:bg-[#d86b27] text-white px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

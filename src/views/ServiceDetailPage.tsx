import React from 'react';
import { SERVICES_DATA, DOCTORS, ALL_PRICES, CLINIC_INFO } from '../data/clinicData';
import { ServiceCategory, Doctor, ViewMode } from '../types';
import { ArrowLeft, CheckCircle2, AlertCircle, Phone, Calendar, ArrowRight } from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigateService: (slug: string) => void;
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onBack,
  onNavigateService,
  onOpenBooking,
  onSelectDoctor,
}) => {
  const service = SERVICES_DATA.find((s) => s.slug === slug) || SERVICES_DATA[0];

  const assignedDoctors = DOCTORS.filter((d) => service.doctors.includes(d.id));
  const relevantPrices = ALL_PRICES.filter((p) =>
    service.popularPriceIds.includes(p.id)
  );
  const otherServices = SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div id="service-detail-page" className="w-full bg-[#FAF8F4] text-[#171B18] min-h-screen">
      {/* Breadcrumb & Navigation back */}
      <div className="bg-[#FAF8F4] border-b border-[#171B18]/10 py-3.5">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#285B49] hover:text-[#171B18] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ко всем услугам</span>
          </button>

          <span className="text-xs text-[#171B18]/50">
            DOMVET · {service.title}
          </span>
        </div>
      </div>

      {/* Service Hero */}
      <section className="bg-[#F3E7DC] py-14 lg:py-20 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
                НАПРАВЛЕНИЕ ПОМОЩИ
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171B18] leading-[1.08]">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-[#171B18]/85 font-normal leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenBooking(undefined, service.title)}
                  className="bg-[#E97832] hover:bg-[#d86b27] text-white px-7 py-3.5 rounded-full text-base font-medium shadow-xs transition-colors cursor-pointer text-center"
                >
                  Записаться на приём
                </button>
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 border border-[#171B18]/20 hover:border-[#285B49] px-6 py-3.5 rounded-full text-base font-medium text-[#171B18] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#285B49]" />
                  <span>{CLINIC_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#D8D8D4] shadow-sm">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Description */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171B18]">
                  Как проходит процедура в DOMVET
                </h2>
                <p className="text-base text-[#171B18]/80 leading-relaxed">
                  {service.fullDesc}
                </p>
              </div>

              {/* When this service is needed */}
              <div className="space-y-4 pt-4 border-t border-[#171B18]/10">
                <h3 className="text-xl font-semibold text-[#171B18] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#E97832]" />
                  Когда необходимо обратиться
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {service.whenNeeded.map((symptom, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg border border-[#171B18]/10 text-sm text-[#171B18]/85 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#285B49] shrink-0 mt-0.5" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation guidelines if present */}
              {service.preparation && (
                <div className="space-y-4 pt-4 border-t border-[#171B18]/10">
                  <h3 className="text-xl font-semibold text-[#171B18]">
                    Как подготовить питомца к визиту
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#171B18]/80">
                    {service.preparation.map((prep, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#285B49] shrink-0 mt-2" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Relevant Prices List */}
              <div className="space-y-4 pt-4 border-t border-[#171B18]/10">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-[#171B18]">
                    Стоимость процедур по направлению
                  </h3>
                  <span className="text-xs text-[#171B18]/60">Официальный прайс</span>
                </div>

                <div className="bg-white rounded-xl border border-[#171B18]/10 divide-y divide-[#171B18]/10 overflow-hidden">
                  {relevantPrices.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                    >
                      <div>
                        <div className="text-base font-medium text-[#171B18]">
                          {p.name}
                        </div>
                        {p.description && (
                          <div className="text-xs text-[#171B18]/65 mt-0.5">
                            {p.description}
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-semibold text-[#285B49] font-mono shrink-0">
                        {p.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Responsible doctors & Appointment trigger */}
            <div className="lg:col-span-4 space-y-8">
              {/* Doctors card */}
              <div className="bg-white p-6 rounded-xl border border-[#171B18]/10 space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#285B49]">
                  Приём ведут врачи
                </h3>
                <div className="space-y-4">
                  {assignedDoctors.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => onSelectDoctor(doc)}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="w-12 h-14 rounded-md overflow-hidden bg-[#D8D8D4] shrink-0">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#171B18] group-hover:text-[#285B49] transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-[#171B18]/60 mt-0.5">
                          {doc.position}
                        </p>
                        <span className="text-[11px] text-[#285B49] font-medium">
                          Стаж {doc.experienceYears} лет
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Booking box */}
              <div className="bg-[#285B49] text-white p-6 rounded-xl space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F4]/60 block">
                  Онлайн-запись
                </span>
                <h4 className="text-xl font-semibold leading-snug">
                  Записаться на «{service.title}»
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Выберите удобный день и время. Администратор перезвонит вам для подтверждения визита.
                </p>
                <button
                  onClick={() => onOpenBooking(undefined, service.title)}
                  className="w-full bg-[#E97832] hover:bg-[#d86b27] text-white py-3 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  Записаться на приём
                </button>
              </div>

              {/* Other directions */}
              <div className="bg-[#FAF8F4] p-6 rounded-xl border border-[#171B18]/10 space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/60">
                  Другие услуги клиники
                </h4>
                <div className="space-y-2">
                  {otherServices.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => {
                        onNavigateService(s.slug);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-white text-sm text-[#171B18] flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium group-hover:text-[#285B49]">{s.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#171B18]/40 group-hover:text-[#285B49]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

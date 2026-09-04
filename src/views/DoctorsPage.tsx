import React, { useState, useMemo } from 'react';
import { DOCTORS, CLINIC_INFO } from '../data/clinicData';
import { Doctor } from '../types';
import { Award, Clock, ArrowRight, Calendar, GraduationCap } from 'lucide-react';

interface DoctorsPageProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenBooking: (doctorName?: string) => void;
}

const SPECIALTY_FILTERS = [
  { id: 'all', label: 'Все врачи' },
  { id: 'therapy', label: 'Терапия' },
  { id: 'surgery', label: 'Хирургия' },
  { id: 'ultrasound', label: 'УЗИ и диагностика' },
  { id: 'anesthesiology', label: 'Анестезиология' },
  { id: 'dermatology', label: 'Дерматология' },
  { id: 'oncology', label: 'Онкология' },
  { id: 'exotics', label: 'Экзотические животные' },
];

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onSelectDoctor,
  onOpenBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredDoctors = useMemo(() => {
    if (activeFilter === 'all') return DOCTORS;
    return DOCTORS.filter((doc) =>
      doc.specialtiesForFilter.includes(activeFilter as any)
    );
  }, [activeFilter]);

  return (
    <div id="doctors-page" className="w-full bg-[#FAF8F4] text-[#171B18] min-h-screen">
      {/* Page Hero */}
      <section className="bg-[#F3E7DC] py-14 lg:py-20 border-b border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#285B49] block">
              ВРАЧЕБНЫЙ СОСТАВ
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#171B18]">
              Врачи Домвет
            </h1>
            <p className="text-lg text-[#171B18]/80 leading-relaxed">
              Команда практикующих ветеринарных врачей с высшим профильным образованием и клиническим опытом до 26 лет. Ведём приём кошек, собак, грызунов, птиц и рептилий на Ленинском проспекте, 168.
            </p>
          </div>

          {/* Specialty Filter Buttons */}
          <div className="mt-8 flex flex-wrap gap-2">
            {SPECIALTY_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#285B49] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#171B18]/80 border border-[#171B18]/12'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Cards Directory */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-[#171B18]/10 overflow-hidden flex flex-col justify-between group hover:border-[#285B49]/40 transition-all"
              >
                <div>
                  {/* Photo 4:5 */}
                  <div
                    onClick={() => onSelectDoctor(doc)}
                    className="aspect-4/5 w-full overflow-hidden bg-[#D8D8D4] cursor-pointer relative"
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#171B18]/70 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      Стаж: {doc.experienceYears} лет
                    </div>
                  </div>

                  {/* Body info */}
                  <div className="p-6 space-y-3">
                    <div>
                      <h2
                        onClick={() => onSelectDoctor(doc)}
                        className="text-2xl font-bold tracking-tight text-[#171B18] group-hover:text-[#285B49] transition-colors cursor-pointer"
                      >
                        {doc.name}
                      </h2>
                      <p className="text-sm font-medium text-[#285B49] mt-0.5">
                        {doc.position}
                      </p>
                    </div>

                    <p className="text-xs text-[#171B18]/60 font-mono">
                      {doc.shortSpecialization}
                    </p>

                    <p className="text-sm text-[#171B18]/75 line-clamp-3 leading-relaxed">
                      {doc.bio}
                    </p>

                    <div className="pt-2 text-xs text-[#171B18]/65 flex items-center gap-1.5 border-t border-[#171B18]/8">
                      <Clock className="w-3.5 h-3.5 text-[#285B49] shrink-0" />
                      <span>{doc.scheduleDays}</span>
                    </div>
                  </div>
                </div>

                {/* Card actions */}
                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#171B18]/8 mt-2">
                  <button
                    onClick={() => onSelectDoctor(doc)}
                    className="text-xs font-semibold text-[#171B18]/80 hover:text-[#285B49] transition-colors cursor-pointer"
                  >
                    Подробнее →
                  </button>

                  <button
                    onClick={() => onOpenBooking(doc.name)}
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

      {/* Continuity and medical history notice */}
      <section className="bg-[#D8D8D4] py-14 border-t border-[#171B18]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-[#171B18]">
              Единый консилиум и совместное ведение пациентов
            </h3>
            <p className="text-sm text-[#171B18]/75 max-w-xl leading-relaxed">
              В сложных клинических ситуациях врачи DOMVET проводят совместные консилиумы с участием терапевта, хирурга и диагноста для выработки наилучшего протокола лечения.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="bg-[#285B49] hover:bg-[#20493b] text-white px-7 py-3 rounded-full text-sm font-medium transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Записаться на консультацию
          </button>
        </div>
      </section>
    </div>
  );
};

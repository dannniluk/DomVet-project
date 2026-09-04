import React from 'react';
import { Doctor } from '../types';
import { resolveAssetPath } from '../utils/assetPath';
import { X, Calendar, Award, GraduationCap, Clock } from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: (doctorName: string) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  onClose,
  onBookWithDoctor,
}) => {
  if (!doctor) return null;

  return (
    <div
      id="doctor-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171B18]/60 backdrop-blur-xs transition-opacity overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="doctor-detail-modal-dialog"
        className="bg-[#FAF8F4] w-full max-w-2xl rounded-2xl p-6 sm:p-8 relative shadow-xl border border-[#171B18]/10 text-[#171B18] my-8"
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
          <div className="w-full sm:w-48 shrink-0 aspect-4/5 rounded-xl overflow-hidden bg-[#D8D8D4]">
            <img
              src={resolveAssetPath(doctor.image)}
              alt={doctor.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#285B49] font-semibold block mb-1">
                Врач клиники ДОМВЕТ
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171B18]">
                {doctor.name}
              </h3>
              <p className="text-sm font-medium text-[#285B49] mt-0.5">
                {doctor.position}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#171B18]/70">
              <Award className="w-4 h-4 text-[#285B49]" />
              <span>Стаж клинической практики: <strong>{doctor.experienceYears} лет</strong></span>
            </div>

            <div className="space-y-3 pt-2 text-sm text-[#171B18]/80 leading-relaxed border-t border-[#171B18]/10">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#285B49]" />
                  Образование и квалификация
                </h4>
                <p className="text-sm">{doctor.education}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1">
                  Специализация и опыт
                </h4>
                <p className="text-sm">{doctor.bio}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#285B49]" />
                  Дни приёма в клинике
                </h4>
                <p className="text-sm font-medium text-[#171B18]">{doctor.scheduleDays}</p>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  onClose();
                  onBookWithDoctor(doctor.name);
                }}
                className="w-full sm:w-auto bg-[#E97832] hover:bg-[#d86b27] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
              >
                Записаться к этому врачу
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

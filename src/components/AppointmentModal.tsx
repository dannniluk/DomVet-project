import React, { useState } from 'react';
import { DOCTORS, CLINIC_INFO } from '../data/clinicData';
import { X, CheckCircle2, Clock, MapPin, Phone, Calendar } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDoctor?: string;
  defaultService?: string;
}

const PET_TYPES = [
  { id: 'cat', label: 'Кошка' },
  { id: 'dog', label: 'Собака' },
  { id: 'rodent', label: 'Грызун / Кролик' },
  { id: 'bird', label: 'Птица' },
  { id: 'reptile', label: 'Рептилия' },
  { id: 'ferret', label: 'Хорёк / Другое' }
];

const SERVICE_OPTIONS = [
  'Первичный терапевтический приём',
  'Повторный осмотр и консультация',
  'УЗИ диагностика / ЭхоКГ сердца',
  'Хирургическая консультация / операция',
  'Вакцинация и микрочипирование',
  'Приём специалиста по экзотам (ратолог / герпетолог)',
  'Стоматологический осмотр / санация',
  'Онкологический приём'
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultDoctor,
  defaultService,
}) => {
  const [selectedPet, setSelectedPet] = useState<string>('cat');
  const [petName, setPetName] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>(
    defaultService || SERVICE_OPTIONS[0]
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string>(
    defaultDoctor || 'any'
  );
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('12:00–16:00');
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone || !clientName) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setPetName('');
    setClientName('');
    setClientPhone('');
    setComment('');
    onClose();
  };

  return (
    <div
      id="appointment-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171B18]/60 backdrop-blur-xs transition-opacity overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="appointment-modal-dialog"
        className="bg-[#FAF8F4] w-full max-w-2xl rounded-2xl p-6 sm:p-10 relative shadow-xl border border-[#171B18]/10 text-[#171B18] my-8"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#171B18]/50 hover:text-[#171B18] transition-colors focus:outline-none cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-[#DCE6DE] text-[#285B49] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#285B49] font-semibold block mb-1">
                Заявка принята
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#171B18]">
                Спасибо, {clientName}!
              </h3>
            </div>
            <p className="text-[#171B18]/80 text-base max-w-lg mx-auto leading-relaxed">
              Администратор DOMVET свяжется с вами по номеру{' '}
              <span className="font-semibold text-[#171B18]">{clientPhone}</span> в ближайшее время для подтверждения точного времени визита.
            </p>

            <div className="bg-[#F3E7DC] rounded-xl p-5 text-left text-sm space-y-2.5 max-w-md mx-auto text-[#171B18]/90 border border-[#171B18]/6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#285B49] shrink-0" />
                <span>{CLINIC_INFO.address} (м. Московская)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#285B49] shrink-0" />
                <span>Ежедневно 09:00–22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#285B49] shrink-0" />
                <span>Если состояние питомца острое: {CLINIC_INFO.phone}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 bg-[#285B49] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#20493b] transition-colors cursor-pointer"
            >
              Вернуться на сайт
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-[#285B49] font-semibold block mb-1">
                Онлайн-запись
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#171B18]">
                Записаться на приём
              </h2>
              <p className="text-sm text-[#171B18]/70 mt-1">
                Клиника на Ленинском проспекте, 168 · Ежедневно 09:00–22:00
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pet selection buttons */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-2">
                  Вид животного
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PET_TYPES.map((pet) => (
                    <button
                      type="button"
                      key={pet.id}
                      onClick={() => setSelectedPet(pet.id)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all text-left cursor-pointer ${
                        selectedPet === pet.id
                          ? 'border-[#285B49] bg-[#DCE6DE]/40 text-[#171B18] font-semibold'
                          : 'border-[#171B18]/15 bg-white text-[#171B18]/80 hover:border-[#171B18]/30'
                      }`}
                    >
                      {pet.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service & Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                    Услуга или цель визита
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49]"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                    Специалист
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49]"
                  >
                    <option value="any">Дежурный врач направления</option>
                    {DOCTORS.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} ({doc.shortSpecialization})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                    Желаемая дата
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                    Удобное время
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49]"
                  >
                    <option value="09:00–12:00">Утро (09:00 – 12:00)</option>
                    <option value="12:00–16:00">День (12:00 – 16:00)</option>
                    <option value="16:00–19:00">Вечер (16:00 – 19:00)</option>
                    <option value="19:00–22:00">Поздний вечер (19:00 – 22:00)</option>
                  </select>
                </div>
              </div>

              {/* Owner info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Анна"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                    Контактный телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171B18]/60 mb-1.5">
                  Кличка питомца и симптомы (кратко)
                </label>
                <textarea
                  rows={2}
                  placeholder="Кличка питомца, возраст, что беспокоит..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white border border-[#171B18]/20 rounded-lg px-3.5 py-2.5 text-sm text-[#171B18] focus:outline-none focus:border-[#285B49] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#171B18]/50 text-center sm:text-left">
                  Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи администратора.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#E97832] hover:bg-[#d86b27] text-white px-8 py-3 rounded-full text-base font-medium shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
                >
                  Отправить заявку
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

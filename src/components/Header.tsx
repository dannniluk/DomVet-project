import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { ViewMode } from '../types';
import { Phone, Menu, X, Clock, MapPin } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, extraParam?: string) => void;
  onOpenBooking: (doctorName?: string, serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: ViewMode }[] = [
    { label: 'Услуги', view: 'services' },
    { label: 'Врачи', view: 'doctors' },
    { label: 'Цены', view: 'prices' },
    { label: 'Экзоты', view: 'exotics' },
    { label: 'Ветаптека', view: 'pharmacy' },
    { label: 'Контакты', view: 'contacts' },
  ];

  const handleNavClick = (view: ViewMode) => {
    setMobileMenuOpen(false);
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF8F4]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(23,27,24,0.06)] h-[72px]'
          : 'bg-[#FAF8F4] border-b border-[#171B18]/6 h-[84px]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full px-5 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-baseline gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#285B49] rounded-sm"
          >
            <span className="font-bold tracking-tight text-[#171B18] text-2xl lg:text-[26px] block leading-none">
              {CLINIC_INFO.brandName}
            </span>
            <span className="text-[12px] tracking-normal text-[#171B18]/60 font-medium block mt-1">
              Ветеринарная клиника на Ленинском
            </span>
          </button>

          <span className="hidden xl:inline-block text-[11px] font-medium tracking-wide text-[#285B49] bg-[#DCE6DE]/50 px-2 py-0.5 rounded-full ml-1">
            с 2003 года
          </span>
        </div>

        {/* Center: Main Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[15px] font-medium text-[#171B18]">
          {navItems.map((item) => {
            const isActive = currentView === item.view && item.label !== 'Ветаптека';
            return (
              <button
                key={item.label}
                id={`nav-link-${item.view}-${item.label}`}
                onClick={() => handleNavClick(item.view)}
                className={`px-3 py-2 transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#285B49] rounded-md ${
                  isActive
                    ? 'text-[#285B49] font-semibold'
                    : 'text-[#171B18]/80 hover:text-[#171B18]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#285B49] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side: Phone & Primary CTA */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <a
              id="header-phone-link"
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="text-[15px] font-semibold text-[#171B18] hover:text-[#285B49] transition-colors block leading-tight"
            >
              {CLINIC_INFO.phone}
            </a>
            <span className="text-[12px] text-[#171B18]/60 flex items-center justify-end gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#285B49] inline-block"></span>
              {CLINIC_INFO.hours}
            </span>
          </div>

          <button
            id="header-booking-cta"
            onClick={() => onOpenBooking()}
            className="bg-[#E97832] hover:bg-[#d86b27] active:bg-[#c96020] text-white px-5 py-2.5 rounded-full text-[15px] font-medium tracking-wide transition-all shadow-xs hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E97832] cursor-pointer"
          >
            Записаться
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            id="mobile-phone-btn"
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="p-2 text-[#171B18] hover:text-[#285B49] transition-colors"
            aria-label="Позвонить в клинику"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#171B18] focus:outline-none"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#FAF8F4] z-50 px-6 py-8 flex flex-col justify-between overflow-y-auto border-t border-[#171B18]/10"
        >
          <div className="space-y-4">
            <div className="text-xs font-semibold tracking-wider text-[#171B18]/40 uppercase mb-2">
              Навигация
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                id={`mobile-nav-${item.view}-${item.label}`}
                onClick={() => handleNavClick(item.view)}
                className="w-full text-left py-2.5 text-xl font-medium text-[#171B18] hover:text-[#285B49] transition-colors border-b border-[#171B18]/6"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-[#171B18]/10 space-y-4">
            <div className="space-y-1">
              <div className="text-xs text-[#171B18]/50 uppercase tracking-wider">Контакты</div>
              <a
                href={`tel:${CLINIC_INFO.phoneRaw}`}
                className="text-lg font-semibold text-[#171B18] block"
              >
                {CLINIC_INFO.phone}
              </a>
              <div className="text-sm text-[#171B18]/70 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#285B49] shrink-0" />
                <span>{CLINIC_INFO.city}, {CLINIC_INFO.address}</span>
              </div>
              <div className="text-sm text-[#171B18]/70 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#285B49] shrink-0" />
                <span>{CLINIC_INFO.hours}</span>
              </div>
            </div>

            <button
              id="mobile-drawer-booking-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#E97832] text-white py-3.5 rounded-full text-base font-medium shadow-sm active:scale-[0.99] transition-transform"
            >
              Записаться на приём
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

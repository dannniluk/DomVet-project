import React, { useState, useEffect } from 'react';
import { ViewMode, Doctor, PharmacyProduct } from './types';
import { CLINIC_INFO } from './data/clinicData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { PharmacyDetailModal } from './components/PharmacyDetailModal';
import { HomePage } from './views/HomePage';
import { PricePage } from './views/PricePage';
import { DoctorsPage } from './views/DoctorsPage';
import { ServicesPage } from './views/ServicesPage';
import { ServiceDetailPage } from './views/ServiceDetailPage';
import { ExoticsPage } from './views/ExoticsPage';
import { PharmacyPage } from './views/PharmacyPage';
import { ContactsPage } from './views/ContactsPage';
import { Phone, Calendar } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>('priem');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PharmacyProduct | null>(null);

  // Appointment Modal state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingDoctor, setBookingDoctor] = useState<string | undefined>(undefined);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  // Handle URL hash / initial navigation if applicable
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'prices', 'doctors', 'services', 'exotics', 'pharmacy', 'contacts'].includes(hash)) {
        setCurrentView(hash as ViewMode);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: ViewMode, extraParam?: string) => {
    if (view === 'service-detail' && extraParam) {
      setActiveServiceSlug(extraParam);
    }
    setCurrentView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (doctorName?: string, serviceName?: string) => {
    setBookingDoctor(doctorName);
    setBookingService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#171B18] font-sans antialiased selection:bg-[#E97832]/20 selection:text-[#171B18]">
      {/* Top Main Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
          />
        )}

        {currentView === 'prices' && (
          <PricePage onOpenBooking={handleOpenBooking} />
        )}

        {currentView === 'doctors' && (
          <DoctorsPage
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            onSelectService={(slug) => handleNavigate('service-detail', slug)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage
            slug={activeServiceSlug}
            onBack={() => handleNavigate('services')}
            onNavigateService={(slug) => handleNavigate('service-detail', slug)}
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
          />
        )}

        {currentView === 'exotics' && (
          <ExoticsPage
            onOpenBooking={handleOpenBooking}
            onSelectDoctor={(doc) => setSelectedDoctor(doc)}
          />
        )}

        {currentView === 'pharmacy' && (
          <PharmacyPage
            onOpenAppointment={(defaultComment) => handleOpenBooking(undefined, defaultComment)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {currentView === 'contacts' && (
          <ContactsPage onOpenBooking={() => handleOpenBooking()} />
        )}
      </main>

      {/* Primary Brand Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Subtle Mobile Bottom Sticky Bar for quick access */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#171B18]/10 py-2.5 px-4 z-30 flex items-center justify-between gap-3 shadow-lg">
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full border border-[#171B18]/20 text-xs font-semibold text-[#171B18] hover:bg-white"
        >
          <Phone className="w-3.5 h-3.5 text-[#285B49]" />
          <span>Позвонить</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#E97832] text-white text-xs font-semibold shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Записаться</span>
        </button>
      </div>

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultDoctor={bookingDoctor}
        defaultService={bookingService}
      />

      {/* Doctor Detail Modal */}
      <DoctorDetailModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookWithDoctor={(docName) => {
          setSelectedDoctor(null);
          handleOpenBooking(docName);
        }}
      />

      {/* Pharmacy Detail Modal */}
      <PharmacyDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onReserve={(prod) => {
          handleOpenBooking(
            undefined,
            `Бронирование в аптеке: ${prod.name} (${prod.price > 0 ? prod.price + ' ₽' : 'цена по запросу'})`
          );
        }}
      />
    </div>
  );
}

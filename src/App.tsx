import React, { useCallback, useState } from 'react';
import { listingData } from './data/listingData';
import { Header } from './components/Header';
import { ListingHeader } from './components/ListingHeader';
import { HeroGallery } from './components/HeroGallery';
import { HostHeader } from './components/HostHeader';
import { ListingHighlights } from './components/ListingHighlights';
import { DescriptionSection } from './components/DescriptionSection';
import { SleepingArrangements } from './components/SleepingArrangements';
import { AmenitiesSection } from './components/AmenitiesSection';
import { CalendarSection } from './components/CalendarSection';
import { BookingCard } from './components/BookingCard';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostProfileSection } from './components/HostProfileSection';
import { Footer } from './components/Footer';

// Modals
import { PhotoTourModal } from './components/modals/PhotoTourModal';
import { LightboxModal } from './components/modals/LightboxModal';
import { AmenitiesModal } from './components/modals/AmenitiesModal';
import { ShareModal } from './components/modals/ShareModal';
import { ContactHostModal } from './components/modals/ContactHostModal';

export const App: React.FC = () => {
  // Modal & Overlay state
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isContactHostOpen, setIsContactHostOpen] = useState(false);

  // Date selection state
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date(2026, 9, 5));
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date(2026, 9, 10));

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleClosePhotoTour = useCallback(() => setIsPhotoTourOpen(false), []);
  const handleCloseLightbox = useCallback(() => setIsLightboxOpen(false), []);
  const handleNavigateLightbox = useCallback((newIndex: number) => setLightboxIndex(newIndex), []);

  const scrollToCalendar = () => {
    const el = document.getElementById('availability');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header onSearchClick={() => setIsShareOpen(true)} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Listing Title & Action Bar */}
        <ListingHeader
          title={listingData.title}
          rating={listingData.rating}
          reviewsCount={listingData.reviewsCount}
          isSuperhost={listingData.isSuperhost}
          location={listingData.location}
          onShareClick={() => setIsShareOpen(true)}
        />

        {/* Hero Photo Grid (Desktop 5-photo grid) */}
        <HeroGallery
          photos={listingData.photos}
          onOpenPhotoTour={() => setIsPhotoTourOpen(true)}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Two-Column Section */}
        <div className="listing-two-column">
          {/* Left Main Column */}
          <div className="left-column">
            <HostHeader
              host={listingData.host}
              guestsCount={listingData.guestsCount}
              bedroomsCount={listingData.bedroomsCount}
              bedsCount={listingData.bedsCount}
              bathsCount={listingData.bathsCount}
              rating={listingData.rating}
              reviewsCount={listingData.reviewsCount}
              isGuestFavorite={listingData.isGuestFavorite}
            />

            <div className="divider" />

            <ListingHighlights highlights={listingData.highlights} />

            <div className="divider" />

            <DescriptionSection description={listingData.description} />

            <div className="divider" />

            <SleepingArrangements />

            <div className="divider" />

            <AmenitiesSection
              amenities={listingData.amenities}
              onOpenAmenitiesModal={() => setIsAmenitiesOpen(true)}
            />

            <div className="divider" />

            <CalendarSection
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSelectDates={(inDate, outDate) => {
                setCheckInDate(inDate);
                setCheckOutDate(outDate);
              }}
            />
          </div>

          {/* Right Column Sticky Booking Widget */}
          <div className="right-column">
            <BookingCard
              pricePerNight={listingData.pricePerNight}
              rating={listingData.rating}
              reviewsCount={listingData.reviewsCount}
              cleaningFee={listingData.cleaningFee}
              serviceFeeRate={listingData.serviceFeeRate}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onOpenCalendar={scrollToCalendar}
            />
          </div>
        </div>

        <div className="divider" style={{ margin: '48px 0' }} />

        {/* Guest Reviews Section */}
        <ReviewsSection
          rating={listingData.rating}
          reviewsCount={listingData.reviewsCount}
          categoryRatings={listingData.categoryRatings}
          reviews={listingData.reviews}
        />

        <div className="divider" style={{ margin: '48px 0' }} />

        {/* Location & Map Section */}
        <LocationSection
          location={listingData.location}
          coordinates={listingData.coordinates}
        />

        <div className="divider" style={{ margin: '48px 0' }} />

        {/* Host Profile Section */}
        <HostProfileSection
          host={listingData.host}
          onOpenContactModal={() => setIsContactHostOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        photos={listingData.photos}
        onClose={handleClosePhotoTour}
        onOpenLightbox={handleOpenLightbox}
        onShareClick={() => setIsShareOpen(true)}
      />

      <LightboxModal
        isOpen={isLightboxOpen}
        currentIndex={lightboxIndex}
        photos={listingData.photos}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
        onShareClick={() => setIsShareOpen(true)}
      />

      <AmenitiesModal
        isOpen={isAmenitiesOpen}
        amenities={listingData.amenities}
        onClose={() => setIsAmenitiesOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        title={listingData.title}
        onClose={() => setIsShareOpen(false)}
      />

      <ContactHostModal
        isOpen={isContactHostOpen}
        host={listingData.host}
        onClose={() => setIsContactHostOpen(false)}
      />
    </div>
  );
};

export default App;

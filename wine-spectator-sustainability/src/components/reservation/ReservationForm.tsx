'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationFormData, ReservationConfirmation } from '@/types/reservation';
import { ProgressIndicator } from './ProgressIndicator';
import { FloatingLabelInput } from './FloatingLabelInput';
import { CalendarPicker } from './CalendarPicker';
import { TimeSlotSelector } from './TimeSlotSelector';
import { PartySizeSelector } from './PartySizeSelector';
import { SpecialRequestsInput } from './SpecialRequestsInput';
import { InteractiveMap } from './InteractiveMap';
import { ReservationSuccess } from './ReservationSuccess';
import { useFormValidation } from '@/hooks/useFormValidation';
import { reservationSteps, availabilityDates, manhattanLocation, hamptonsLocation, mockWeatherData, seatingPreferences, occasions, lounges } from '@/data/reservation';

export function ReservationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReservationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    partySize: 2,
    duration: 2,
    lounge: 'manhattan',
    seatingPreference: 'no-preference',
    occasion: 'relaxation',
    specialRequests: '',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    preferredContact: 'email',
    newsletterSignup: false,
    specialOffers: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);

  const { validation, validateStep, clearErrors } = useFormValidation();

  // Update steps based on current step
  const updatedSteps = reservationSteps.map((step, index) => ({
    ...step,
    isCompleted: index < currentStep - 1,
    isActive: index === currentStep - 1
  }));

  const handleInputChange = useCallback((field: keyof ReservationFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearErrors();
  }, [clearErrors]);

  const handleNext = useCallback(() => {
    const stepValidation = validateStep(currentStep, formData);
    
    if (stepValidation.isValid) {
      setCurrentStep(prev => Math.min(prev + 1, reservationSteps.length));
    }
  }, [currentStep, formData, validateStep]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate confirmation
    const newConfirmation: ReservationConfirmation = {
      id: `RES-${Date.now()}`,
      confirmationNumber: `CR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: formData.date!,
      time: formData.time,
      partySize: formData.partySize,
      lounge: lounges.find(l => l.value === formData.lounge)?.label || 'Unknown',
      estimatedTotal: formData.partySize * 85, // Base price calculation
      currency: 'USD'
    };

    setConfirmation(newConfirmation);
    setShowSuccess(true);
    setIsSubmitting(false);
  }, [formData]);

  const handleAddToCalendar = useCallback(() => {
    // Generate calendar event URL
    const startDate = new Date(formData.date!);
    const [hours, minutes] = formData.time.split(':');
    startDate.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + formData.duration);

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cigar Lounge Reservation&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Reservation for ${formData.partySize} guests at ${lounges.find(l => l.value === formData.lounge)?.label}`;
    
    window.open(calendarUrl, '_blank');
  }, [formData]);

  const handleShare = useCallback(() => {
    const shareText = `I've made a reservation at the luxury cigar lounge for ${formatDate(formData.date!)} at ${formData.time}! 🚬✨`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Cigar Lounge Reservation',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // Show toast notification
    }
  }, [formData]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentLocation = () => {
    return formData.lounge === 'hamptons' ? hamptonsLocation : manhattanLocation;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-luxury-cream mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingLabelInput
                type="text"
                label="First Name"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                required
                error={validation.errors.firstName}
                icon="👤"
              />
              
              <FloatingLabelInput
                type="text"
                label="Last Name"
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                required
                error={validation.errors.lastName}
                icon="👤"
              />
              
              <FloatingLabelInput
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Enter your email address"
                required
                error={validation.errors.email}
                icon="📧"
              />
              
              <FloatingLabelInput
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder="Enter your phone number"
                required
                error={validation.errors.phone}
                icon="📱"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-luxury-cream mb-6">Reservation Details</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarPicker
                selectedDate={formData.date}
                onDateSelect={(date) => handleInputChange('date', date)}
                availabilityDates={availabilityDates}
              />
              
              <div className="space-y-6">
                <TimeSlotSelector
                  timeSlots={availabilityDates.find(av => 
                    av.date === formData.date?.toISOString().split('T')[0]
                  )?.timeSlots || []}
                  selectedTime={formData.time}
                  onTimeSelect={(time) => handleInputChange('time', time)}
                />
                
                <PartySizeSelector
                  partySize={formData.partySize}
                  onPartySizeChange={(size) => handleInputChange('partySize', size)}
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-luxury-cream mb-6">Preferences</h3>
            
            {/* Lounge Selection */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-luxury-cream">Select Location</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {lounges.map((lounge) => (
                  <motion.button
                    key={lounge.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('lounge', lounge.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      formData.lounge === lounge.value
                        ? 'border-cigar-gold bg-cigar-gold/10'
                        : 'border-luxury-slate/30 hover:border-cigar-gold/50'
                    }`}
                  >
                    <h5 className="font-bold text-luxury-cream mb-2">{lounge.label}</h5>
                    <p className="text-luxury-cream/70 text-sm">{lounge.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-luxury-cream">Seating Preference</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {seatingPreferences.map((pref) => (
                  <motion.button
                    key={pref.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('seatingPreference', pref.value)}
                    className={`p-3 rounded-lg border transition-all duration-300 flex items-center space-x-3 ${
                      formData.seatingPreference === pref.value
                        ? 'border-cigar-gold bg-cigar-gold/10'
                        : 'border-luxury-slate/30 hover:border-cigar-gold/50'
                    }`}
                  >
                    <span className="text-xl">{pref.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-luxury-cream">{pref.label}</div>
                      <div className="text-xs text-luxury-cream/70">{pref.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-luxury-cream">Occasion</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {occasions.map((occasion) => (
                  <motion.button
                    key={occasion.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('occasion', occasion.value)}
                    className={`p-3 rounded-lg border transition-all duration-300 text-center ${
                      formData.occasion === occasion.value
                        ? 'border-cigar-gold bg-cigar-gold/10'
                        : 'border-luxury-slate/30 hover:border-cigar-gold/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{occasion.icon}</div>
                    <div className="text-sm font-medium text-luxury-cream">{occasion.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-luxury-cream mb-6">Special Requests</h3>
            
            <div className="space-y-6">
              <SpecialRequestsInput
                label="Special Requests"
                value={formData.specialRequests}
                onChange={(value) => handleInputChange('specialRequests', value)}
                placeholder="Any special requests or notes for your visit?"
                maxLength={500}
              />
              
              <FloatingLabelInput
                type="text"
                label="Dietary Restrictions"
                value={formData.dietaryRestrictions}
                onChange={(value) => handleInputChange('dietaryRestrictions', value)}
                placeholder="Any dietary restrictions or allergies?"
                maxLength={200}
              />
              
              <FloatingLabelInput
                type="text"
                label="Accessibility Needs"
                value={formData.accessibilityNeeds}
                onChange={(value) => handleInputChange('accessibilityNeeds', value)}
                placeholder="Any accessibility requirements?"
                maxLength={200}
              />
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-luxury-cream mb-6">Contact Preferences</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-luxury-cream mb-4">Preferred Contact Method</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'email', label: 'Email', icon: '📧' },
                    { value: 'phone', label: 'Phone Call', icon: '📞' },
                    { value: 'text', label: 'Text Message', icon: '💬' }
                  ].map((method) => (
                    <motion.button
                      key={method.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInputChange('preferredContact', method.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                        formData.preferredContact === method.value
                          ? 'border-cigar-gold bg-cigar-gold/10'
                          : 'border-luxury-slate/30 hover:border-cigar-gold/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="font-medium text-luxury-cream">{method.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-luxury-cream">Newsletter & Offers</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.newsletterSignup}
                      onChange={(e) => handleInputChange('newsletterSignup', e.target.checked)}
                      className="w-5 h-5 text-cigar-gold bg-luxury-black border-luxury-slate rounded focus:ring-cigar-gold focus:ring-2"
                    />
                    <span className="text-luxury-cream">Subscribe to our newsletter for exclusive offers</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specialOffers}
                      onChange={(e) => handleInputChange('specialOffers', e.target.checked)}
                      className="w-5 h-5 text-cigar-gold bg-luxury-black border-luxury-slate rounded focus:ring-cigar-gold focus:ring-2"
                    />
                    <span className="text-luxury-cream">Receive notifications about special events</span>
                  </label>
                </div>
              </div>

              {/* Interactive Map */}
              <InteractiveMap
                location={getCurrentLocation()}
                weatherData={mockWeatherData}
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="reservation-form">
      {/* Progress Indicator */}
      <ProgressIndicator steps={updatedSteps} currentStep={currentStep} />

      {/* Form Content */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            currentStep === 1
              ? 'bg-luxury-black/30 text-luxury-cream/30 cursor-not-allowed'
              : 'bg-luxury-slate/50 text-luxury-cream hover:bg-luxury-slate/70'
          }`}
        >
          Previous
        </motion.button>

        <div className="text-center text-luxury-cream/70 text-sm">
          Step {currentStep} of {reservationSteps.length}
        </div>

        {currentStep < reservationSteps.length ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-6 py-3 bg-cigar-gold text-luxury-black rounded-lg font-bold hover:bg-amber-400 transition-colors duration-300"
          >
            Next
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-cigar-gold text-luxury-black rounded-lg font-bold hover:bg-amber-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
                <span>Processing...</span>
              </div>
            ) : (
              'Complete Reservation'
            )}
          </motion.button>
        )}
      </div>

      {/* Success Modal */}
      {confirmation && (
        <ReservationSuccess
          confirmation={confirmation}
          isVisible={showSuccess}
          onClose={() => setShowSuccess(false)}
          onAddToCalendar={handleAddToCalendar}
          onShare={handleShare}
        />
      )}
    </div>
  );
}

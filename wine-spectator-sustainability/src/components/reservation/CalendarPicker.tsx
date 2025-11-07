'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isPast } from 'date-fns';
import { AvailabilityDate } from '@/types/reservation';

interface CalendarPickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  availabilityDates: AvailabilityDate[];
}

export function CalendarPicker({ selectedDate, onDateSelect, availabilityDates }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return days;
  }, [currentMonth]);

  // Get availability for a specific date
  const getAvailabilityForDate = (date: Date): AvailabilityDate | null => {
    const dateString = format(date, 'yyyy-MM-dd');
    return availabilityDates.find(avail => avail.date === dateString) || null;
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => addDays(prev, direction === 'next' ? 31 : -31));
  };

  // Get day status
  const getDayStatus = (date: Date) => {
    const availability = getAvailabilityForDate(date);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);
    const isPastDate = isPast(date) && !isTodayDate;

    return {
      isAvailable: availability?.available && !isPastDate,
      isFullyBooked: availability?.fullyBooked,
      isSelected,
      isToday: isTodayDate,
      isPast: isPastDate
    };
  };

  return (
    <div className="calendar-picker bg-luxury-charcoal/30 backdrop-blur-xl rounded-2xl p-6 border border-luxury-slate/20">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg bg-luxury-black/50 hover:bg-luxury-black/70 text-luxury-cream transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h3 className="text-xl font-bold text-luxury-cream">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg bg-luxury-black/50 hover:bg-luxury-black/70 text-luxury-cream transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-luxury-cream/70 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) => {
          const status = getDayStatus(date);
          
          return (
            <motion.button
              key={date.toISOString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: status.isAvailable ? 1.05 : 1 }}
              whileTap={{ scale: status.isAvailable ? 0.95 : 1 }}
              onClick={() => status.isAvailable && onDateSelect(date)}
              disabled={!status.isAvailable}
              className={`
                relative p-3 rounded-lg text-sm font-medium transition-all duration-300
                ${status.isSelected
                  ? 'bg-cigar-gold text-luxury-black shadow-lg'
                  : status.isToday
                  ? 'bg-luxury-slate/50 text-cigar-gold border border-cigar-gold/50'
                  : status.isAvailable
                  ? 'bg-luxury-black/30 text-luxury-cream hover:bg-luxury-black/50 hover:border-cigar-gold/30 border border-transparent'
                  : 'bg-luxury-black/20 text-luxury-cream/30 cursor-not-allowed'
                }
              `}
            >
              {format(date, 'd')}

              {/* Status Indicators */}
              {status.isFullyBooked && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              
              {status.isAvailable && !status.isFullyBooked && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}

              {/* Today Indicator */}
              {status.isToday && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cigar-gold rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Selected Animation */}
              {status.isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-cigar-gold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-luxury-cream/70">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-luxury-cream/70">Fully Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cigar-gold rounded-full" />
          <span className="text-luxury-cream/70">Selected</span>
        </div>
      </div>
    </div>
  );
}

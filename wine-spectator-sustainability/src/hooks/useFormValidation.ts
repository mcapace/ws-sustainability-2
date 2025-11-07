'use client';

import { useState, useCallback } from 'react';
import { ReservationFormData, FormValidation } from '@/types/reservation';

export function useFormValidation() {
  const [validation, setValidation] = useState<FormValidation>({
    isValid: false,
    errors: {}
  });

  const validateField = useCallback((name: string, value: unknown): string | null => {
    switch (name) {
      case 'firstName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'First name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'First name can only contain letters';
        }
        return null;

      case 'lastName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Last name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'Last name can only contain letters';
        }
        return null;

      case 'email':
        if (!value || typeof value !== 'string') {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;

      case 'phone':
        if (!value || typeof value !== 'string') {
          return 'Phone number is required';
        }
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return 'Please enter a valid phone number';
        }
        return null;

      case 'date':
        if (!value) {
          return 'Date is required';
        }
        if (value instanceof Date) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (value < today) {
            return 'Date cannot be in the past';
          }
        }
        return null;

      case 'time':
        if (!value || typeof value !== 'string') {
          return 'Time is required';
        }
        return null;

      case 'partySize':
        if (typeof value !== 'number' || value < 1 || value > 12) {
          return 'Party size must be between 1 and 12';
        }
        return null;

      case 'lounge':
        if (!value || typeof value !== 'string') {
          return 'Please select a lounge location';
        }
        return null;

      case 'seatingPreference':
        if (!value || typeof value !== 'string') {
          return 'Please select a seating preference';
        }
        return null;

      case 'occasion':
        if (!value || typeof value !== 'string') {
          return 'Please select an occasion';
        }
        return null;

      case 'specialRequests':
        if (value && typeof value === 'string' && value.length > 500) {
          return 'Special requests cannot exceed 500 characters';
        }
        return null;

      case 'dietaryRestrictions':
        if (value && typeof value === 'string' && value.length > 200) {
          return 'Dietary restrictions cannot exceed 200 characters';
        }
        return null;

      case 'accessibilityNeeds':
        if (value && typeof value === 'string' && value.length > 200) {
          return 'Accessibility needs cannot exceed 200 characters';
        }
        return null;

      case 'preferredContact':
        if (!value || typeof value !== 'string') {
          return 'Please select a preferred contact method';
        }
        return null;

      default:
        return null;
    }
  }, []);

  const validateForm = useCallback((formData: Partial<ReservationFormData>): FormValidation => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Required fields for each step
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'date', 'time', 'partySize',
      'lounge', 'seatingPreference', 'occasion',
      'preferredContact'
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof ReservationFormData]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    // Validate optional fields if they have values
    const optionalFields = ['specialRequests', 'dietaryRestrictions', 'accessibilityNeeds'];
    optionalFields.forEach(field => {
      const value = formData[field as keyof ReservationFormData];
      if (value) {
        const error = validateField(field, value);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    });

    const result = { isValid, errors };
    setValidation(result);
    return result;
  }, [validateField]);

  const validateStep = useCallback((step: number, formData: Partial<ReservationFormData>): FormValidation => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Define required fields for each step
    const stepFields: Record<number, string[]> = {
      1: ['firstName', 'lastName', 'email', 'phone'],
      2: ['date', 'time', 'partySize'],
      3: ['lounge', 'seatingPreference', 'occasion'],
      4: [], // Optional step
      5: ['preferredContact']
    };

    const fieldsToValidate = stepFields[step] || [];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof ReservationFormData]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    const result = { isValid, errors };
    setValidation(result);
    return result;
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setValidation({ isValid: false, errors: {} });
  }, []);

  const setFieldError = useCallback((field: string, error: string) => {
    setValidation(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error }
    }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setValidation(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field];
      return {
        ...prev,
        errors: newErrors
      };
    });
  }, []);

  return {
    validation,
    validateField,
    validateForm,
    validateStep,
    clearErrors,
    setFieldError,
    clearFieldError
  };
}

'use client';

import React, { Suspense } from 'react';
import { AnalyticsProvider } from './AnalyticsProvider';

export function AnalyticsProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </Suspense>
  );
}

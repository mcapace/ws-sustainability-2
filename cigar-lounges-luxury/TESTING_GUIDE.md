# 🧪 Testing Guide

Comprehensive testing strategy for the Luxury Cigar Lounges application to ensure quality, performance, and accessibility.

## 🎯 Testing Strategy

### **Testing Pyramid**
```
    /\
   /  \
  / E2E \
 /______\
/        \
/   Unit  \
/__________\
```

- **Unit Tests**: 70% - Individual components and functions
- **Integration Tests**: 20% - Component interactions
- **E2E Tests**: 10% - Full user journeys

## 🔧 Testing Setup

### **Dependencies**
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.6",
    "@testing-library/user-event": "^14.5.1",
    "playwright": "^1.40.1",
    "pa11y": "^7.0.0",
    "lighthouse": "^11.4.0"
  }
}
```

### **Configuration Files**
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Test setup and mocks
- `playwright.config.ts` - E2E test configuration
- `lighthouse.config.js` - Performance testing

## 🧩 Unit Testing

### **Component Testing**

#### Example: Button Component
```typescript
// src/components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-cigar-gold');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Example: Animation Component
```typescript
// src/components/animations/TextEffects.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { LetterReveal } from './TextEffects';

describe('LetterReveal Component', () => {
  it('renders text content', () => {
    render(<LetterReveal text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LetterReveal text="Test" className="custom-class" />);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('uses custom HTML element when specified', () => {
    render(<LetterReveal text="Test" as="h1" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

### **Hook Testing**

#### Example: Custom Hook
```typescript
// src/hooks/useAnalytics.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAnalytics } from './useAnalytics';

describe('useAnalytics Hook', () => {
  beforeEach(() => {
    // Mock gtag
    global.gtag = jest.fn();
  });

  it('initializes analytics on mount', () => {
    renderHook(() => useAnalytics());
    // Verify analytics initialization
  });

  it('tracks events correctly', () => {
    const { result } = renderHook(() => useAnalytics());
    
    act(() => {
      result.current.trackEvent('click', 'button', 'header-cta');
    });

    expect(global.gtag).toHaveBeenCalledWith('event', 'click', {
      event_category: 'button',
      event_label: 'header-cta',
    });
  });
});
```

### **Utility Function Testing**

#### Example: Security Utils
```typescript
// src/lib/security.test.ts
import { sanitizeInput, isValidEmail, isValidPhone } from './security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      expect(sanitizeInput(input)).toBe('Hello');
    });

    it('removes JavaScript protocols', () => {
      const input = 'javascript:alert("xss")';
      expect(sanitizeInput(input)).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });
});
```

## 🔗 Integration Testing

### **Component Integration**

#### Example: Reservation Flow
```typescript
// src/components/reservation/ReservationFlow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReservationFlow } from './ReservationFlow';

describe('Reservation Flow Integration', () => {
  it('completes full reservation flow', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    
    render(<ReservationFlow onSubmit={mockSubmit} />);

    // Step 1: Select lounge
    await user.click(screen.getByText('Manhattan Luxury Lounge'));
    await user.click(screen.getByText('Continue'));

    // Step 2: Select date and time
    await user.click(screen.getByLabelText(/date/i));
    await user.click(screen.getByText('15'));
    await user.click(screen.getByText('Continue'));

    // Step 3: Fill contact information
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        // ... other fields
      });
    });
  });
});
```

## 🌐 End-to-End Testing

### **User Journey Tests**

#### Example: Complete User Flow
```typescript
// e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Journey', () => {
  test('complete lounge selection and reservation flow', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Luxury Cigar Lounges/);

    // Scroll to lounge selector
    await page.locator('#lounges').scrollIntoViewIfNeeded();
    
    // Select a lounge
    await page.click('[data-testid="lounge-card-manhattan"]');
    await expect(page.locator('[data-testid="lounge-details"]')).toBeVisible();

    // Navigate to reservations
    await page.click('[data-testid="make-reservation-btn"]');
    await expect(page).toHaveURL(/.*reservations/);

    // Fill reservation form
    await page.fill('[data-testid="first-name"]', 'John');
    await page.fill('[data-testid="last-name"]', 'Doe');
    await page.fill('[data-testid="email"]', 'john@example.com');
    
    // Select date
    await page.click('[data-testid="date-picker"]');
    await page.click('[data-testid="date-15"]');
    
    // Select time
    await page.click('[data-testid="time-7pm"]');
    
    // Submit reservation
    await page.click('[data-testid="submit-reservation"]');
    
    // Verify success state
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('text=Reservation confirmed')).toBeVisible();
  });

  test('mobile touch interactions', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Test swipe gestures
    await page.locator('[data-testid="lounge-carousel"]').swipe({ deltaX: -100 });
    
    // Test mobile navigation
    await page.click('[data-testid="mobile-menu-toggle"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
  });
});
```

#### Example: Performance Testing
```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('page load performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Assert page loads within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('lighthouse performance audit', async ({ page }) => {
    await page.goto('/');
    
    // Run Lighthouse audit
    const audit = await page.evaluate(() => {
      return new Promise((resolve) => {
        // This would integrate with Lighthouse CI
        resolve({ performance: 95, accessibility: 98 });
      });
    });
    
    expect(audit.performance).toBeGreaterThan(90);
    expect(audit.accessibility).toBeGreaterThan(95);
  });
});
```

## ♿ Accessibility Testing

### **Automated Accessibility Tests**

#### Example: Accessibility Audit
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('homepage accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBe(1); // Should have exactly one h1
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for proper form labels
    const inputs = await page.locator('input').all();
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const label = await page.locator(`label[for="${id}"]`).count();
      expect(label).toBeGreaterThan(0);
    }
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Verify focus management
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
```

### **Manual Accessibility Checklist**

#### Keyboard Navigation
- [ ] Tab order is logical and intuitive
- [ ] All interactive elements are reachable
- [ ] Focus indicators are visible
- [ ] Skip links work correctly
- [ ] Modal focus trapping works

#### Screen Reader Support
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for all images
- [ ] Form labels associated with inputs
- [ ] ARIA labels where needed
- [ ] Live regions for dynamic content

#### Visual Accessibility
- [ ] Color contrast meets WCAG AA standards
- [ ] Text is readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators are visible

## 📊 Performance Testing

### **Core Web Vitals**

#### Lighthouse CI Configuration
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
```

#### Performance Budget
```typescript
// src/lib/performance.ts
export const performanceBudget = {
  LCP: 2500,  // Largest Contentful Paint (ms)
  FID: 100,   // First Input Delay (ms)
  CLS: 0.1,   // Cumulative Layout Shift
  FCP: 1800,  // First Contentful Paint (ms)
  TTFB: 800,  // Time to First Byte (ms)
  JS_BUNDLE_SIZE: 500,  // KB
  CSS_BUNDLE_SIZE: 100, // KB
};
```

### **Load Testing**

#### Example: Load Test
```typescript
// e2e/load.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Load Tests', () => {
  test('handles multiple concurrent users', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
    ]);
    
    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );
    
    // Navigate all pages simultaneously
    await Promise.all(pages.map(page => page.goto('/')));
    
    // Verify all pages load successfully
    for (const page of pages) {
      await expect(page).toHaveTitle(/Luxury Cigar Lounges/);
    }
    
    // Clean up
    await Promise.all(contexts.map(context => context.close()));
  });
});
```

## 🧪 Test Data Management

### **Mock Data**

#### Example: Test Fixtures
```typescript
// src/__tests__/fixtures/lounges.ts
export const mockLounges = [
  {
    id: 'manhattan',
    name: 'Manhattan Luxury Lounge',
    description: 'Premium cigar lounge in Manhattan',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    // ... other properties
  },
];

export const mockCigars = [
  {
    id: 'cigar-1',
    name: 'Cohiba Behike 52',
    brand: 'Cohiba',
    price: 150,
    rating: 5,
    // ... other properties
  },
];
```

### **Test Utilities**

#### Example: Custom Render
```typescript
// src/__tests__/utils/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { MobileProvider } from '@/components/providers/MobileProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnalyticsProvider>
      <MobileProvider>
        {children}
      </MobileProvider>
    </AnalyticsProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

## 📈 Test Coverage

### **Coverage Goals**
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### **Coverage Commands**
```bash
# Run tests with coverage
npm run test:coverage

# Generate coverage report
npm run test:coverage -- --coverageReporters=html

# View coverage report
open coverage/index.html
```

## 🚀 CI/CD Integration

### **GitHub Actions Workflow**
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Run accessibility tests
        run: npm run test:accessibility
      
      - name: Run performance tests
        run: npm run lighthouse:ci
```

## 📋 Testing Checklist

### **Pre-Release Testing**
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Accessibility audit passes
- [ ] Performance budget met
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Error handling tested
- [ ] Security tests pass
- [ ] Load testing completed

### **Manual Testing Checklist**
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Animations perform smoothly
- [ ] Images load properly
- [ ] Mobile gestures work
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Print styles work
- [ ] Offline functionality
- [ ] Error states display correctly

## 🛠️ Debugging Tests

### **Common Issues**

#### Test Timeouts
```typescript
// Increase timeout for slow tests
test('slow test', async ({ page }) => {
  // Test implementation
}, { timeout: 30000 });
```

#### Flaky Tests
```typescript
// Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText('Loading complete')).toBeInTheDocument();
});
```

#### Mock Issues
```typescript
// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

## 📚 Resources

### **Testing Libraries**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### **Accessibility Resources**
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [Pa11y](https://pa11y.org/)

### **Performance Resources**
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

---

**Remember: Testing is not just about finding bugs—it's about building confidence in your code and ensuring a great user experience! 🚀**

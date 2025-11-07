'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Eye, FileText, Globe, Image } from 'lucide-react';

interface ValidationResult {
  type: 'success' | 'warning' | 'error';
  message: string;
  category: string;
}

export function ContentValidator() {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const validateContent = () => {
    const results: ValidationResult[] = [];

    // Check for placeholder content
    const placeholderChecks = [
      { text: '[INSERT ADDRESS]', category: 'Placeholders' },
      { text: 'Lorem ipsum', category: 'Placeholders' },
      { text: 'TODO:', category: 'Placeholders' },
      { text: 'FIXME:', category: 'Placeholders' },
    ];

    placeholderChecks.forEach(check => {
      if (document.body.textContent?.includes(check.text)) {
        results.push({
          type: 'warning',
          message: `Found placeholder text: "${check.text}"`,
          category: check.category,
        });
      }
    });

    // Check for missing alt text
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === '') {
        results.push({
          type: 'error',
          message: `Image ${index + 1} missing alt text`,
          category: 'Accessibility',
        });
      }
    });

    // Check for missing headings hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let hasH1 = false;
    headings.forEach(heading => {
      if (heading.tagName === 'H1') {
        hasH1 = true;
      }
    });

    if (!hasH1) {
      results.push({
        type: 'error',
        message: 'Missing H1 heading',
        category: 'SEO',
      });
    }

    // Check for broken links
    const links = document.querySelectorAll('a[href]');
    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:'))) {
        // Skip internal links, mailto, and tel links
        return;
      }
      if (href && !href.startsWith('http') && !href.startsWith('/')) {
        results.push({
          type: 'warning',
          message: `Link ${index + 1} has relative path: "${href}"`,
          category: 'Links',
        });
      }
    });

    // Check for missing meta tags
    const title = document.querySelector('title');
    if (!title || !title.textContent) {
      results.push({
        type: 'error',
        message: 'Missing page title',
        category: 'SEO',
      });
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription || !metaDescription.getAttribute('content')) {
      results.push({
        type: 'warning',
        message: 'Missing meta description',
        category: 'SEO',
      });
    }

    // Check for console errors
    const originalError = console.error;
    const originalWarn = console.warn;
    const errors: string[] = [];
    const warnings: string[] = [];

    console.error = (...args) => {
      errors.push(args.join(' '));
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      warnings.push(args.join(' '));
      originalWarn.apply(console, args);
    };

    // Restore original functions after a short delay
    setTimeout(() => {
      console.error = originalError;
      console.warn = originalWarn;
    }, 1000);

    if (errors.length > 0) {
      results.push({
        type: 'error',
        message: `${errors.length} console error(s) detected`,
        category: 'JavaScript',
      });
    }

    if (warnings.length > 0) {
      results.push({
        type: 'warning',
        message: `${warnings.length} console warning(s) detected`,
        category: 'JavaScript',
      });
    }

    setValidationResults(results);
  };

  useEffect(() => {
    if (isVisible) {
      validateContent();
    }
  }, [isVisible]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SEO':
        return <Globe className="w-4 h-4" />;
      case 'Accessibility':
        return <Eye className="w-4 h-4" />;
      case 'Images':
        return <Image className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const groupedResults = validationResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, ValidationResult[]>);

  const errorCount = validationResults.filter(r => r.type === 'error').length;
  const warningCount = validationResults.filter(r => r.type === 'warning').length;

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-[9999] bg-luxury-charcoal/90 backdrop-blur-lg border border-luxury-slate/20 text-luxury-cream p-3 rounded-lg hover:bg-luxury-charcoal transition-colors flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FileText className="w-5 h-5" />
        <span className="text-sm font-semibold">Content QA</span>
        {(errorCount > 0 || warningCount > 0) && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {errorCount + warningCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 z-[9999] bg-luxury-charcoal/95 backdrop-blur-lg border border-luxury-slate/20 rounded-lg p-4 min-w-[400px] max-w-[500px] max-h-[600px] overflow-y-auto shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-luxury-cream">Content Validation</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-luxury-cream/60 hover:text-luxury-cream"
              >
                ✕
              </button>
            </div>

            {validationResults.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-luxury-cream/70">No issues found!</p>
                <p className="text-luxury-cream/50 text-sm">Content looks good</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedResults).map(([category, results]) => (
                  <div key={category}>
                    <div className="flex items-center space-x-2 mb-2">
                      {getCategoryIcon(category)}
                      <h4 className="font-semibold text-luxury-cream">{category}</h4>
                      <span className="text-xs text-luxury-cream/60">({results.length})</span>
                    </div>
                    <div className="space-y-2">
                      {results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-2 rounded-lg bg-luxury-slate/10"
                        >
                          {getIcon(result.type)}
                          <p className="text-sm text-luxury-cream/80 flex-1">{result.message}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-luxury-slate/20">
              <button
                onClick={validateContent}
                className="w-full bg-cigar-gold text-luxury-charcoal py-2 px-4 rounded-lg font-semibold hover:bg-cigar-gold/90 transition-colors"
              >
                Re-validate Content
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

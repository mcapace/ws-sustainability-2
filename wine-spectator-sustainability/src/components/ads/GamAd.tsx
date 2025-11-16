import { useEffect } from 'react';

interface GamAdProps {
  slotId: string; // DOM id (must match defineSlot in GPT setup)
  variant: 'top' | 'mid' | 'bottom';
  className?: string;
}

export function GamAd({ slotId, variant, className = '' }: GamAdProps) {
  useEffect(() => {
    // Ensure GPT is available and display the slot once mounted
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!w.googletag || !w.googletag.cmd) return;
    w.googletag.cmd.push(function () {
      try {
        w.googletag.display(slotId);
      } catch (_) {
        // no-op
      }
    });
  }, [slotId]);

  // Responsive sizing wrapper (centered). We allocate the correct creative box size per breakpoint.
  // - top/bottom: 728x90 on md+; 300x50 on mobile
  // - mid: 300x250 always
  const sizeClasses =
    variant === 'mid'
      ? 'w-[300px] h-[250px]'
      : 'w-[300px] h-[50px] md:w-[728px] md:h-[90px]';

  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div id={slotId} className={`${sizeClasses}`} />
    </div>
  );
}

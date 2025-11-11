'use client';

import type { HTMLAttributes } from 'react';

type Dimension = [number, number];

interface AdSlotProps extends HTMLAttributes<HTMLDivElement> {
  slotId: string;
  label: string;
  desktop: Dimension;
  tablet?: Dimension;
  mobile?: Dimension;
  sticky?: boolean;
}

const dimensionLabel = ([width, height]: Dimension) => `${width}×${height}`;

export function AdSlot({
  slotId,
  label,
  desktop,
  tablet,
  mobile,
  className = '',
  sticky = false,
  ...rest
}: AdSlotProps) {
  return (
    <div
      className={`flex w-full justify-center ${sticky ? 'sticky top-0 z-30' : ''} ${className}`.trim()}
      {...rest}
    >
      <div
        id={slotId}
        data-slot={slotId}
        data-desktop={dimensionLabel(desktop)}
        data-tablet={tablet ? dimensionLabel(tablet) : undefined}
        data-mobile={mobile ? dimensionLabel(mobile) : undefined}
        className="flex w-full max-w-[min(100%,_960px)] flex-col items-center justify-center rounded-2xl border border-dashed border-[#C5CEC4] bg-white/70 px-4 py-6 text-center text-sm uppercase tracking-[0.3em] text-[#6F8277] shadow-[0_18px_40px_-30px_rgba(31,77,59,0.3)]"
      >
        <span className="font-semibold text-[#1F4D3B]">{label}</span>
        <div className="mt-2 flex flex-col items-center gap-1 text-[0.65rem] tracking-[0.35em] text-[#6F8277]">
          <span>Desktop: {dimensionLabel(desktop)}</span>
          {tablet ? <span>Tablet: {dimensionLabel(tablet)}</span> : null}
          {mobile ? <span>Mobile: {dimensionLabel(mobile)}</span> : null}
        </div>
        <span className="mt-3 text-[0.6rem] tracking-[0.35em] text-[#B8C7BB]">GAM placement ready</span>
      </div>
    </div>
  );
}



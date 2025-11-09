import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { DependencyList } from 'react';
import { useEffect, useMemo, useRef } from 'react';

type TimelineLike = gsap.core.Timeline | gsap.core.Tween;

let orchestratorInstance: AnimationOrchestrator | null = null;

const isBrowser = typeof window !== 'undefined';

class AnimationOrchestrator {
  private timelines = new Set<TimelineLike>();
  private isReducedMotion = false;
  private isInitialized = false;
  private matchMediaListener: ((event: MediaQueryListEvent) => void) | null = null;

  constructor() {
    if (isBrowser) {
      this.initialize();
    }
  }

  private initialize() {
    if (this.isInitialized || !isBrowser) return;

    if (!gsap.core.globals().ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = prefersReducedMotion.matches;

    this.matchMediaListener = event => {
      this.setReducedMotion(event.matches);
    };

    if (prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener('change', this.matchMediaListener);
    } else if ((prefersReducedMotion as MediaQueryList).addListener) {
      (prefersReducedMotion as MediaQueryList).addListener(this.matchMediaListener);
    }

    this.isInitialized = true;
  }

  public getReducedMotion() {
    return this.isReducedMotion;
  }

  public setReducedMotion(value: boolean) {
    this.isReducedMotion = value;
    if (value) {
      this.suspendAll();
    } else {
      this.resumeAll();
    }
  }

  public register(createTimeline: () => TimelineLike | null) {
    if (this.isReducedMotion) {
      return null;
    }

    const timeline = createTimeline();

    if (!timeline) return null;

    this.timelines.add(timeline);
    return timeline;
  }

  public unregister(timeline: TimelineLike | null) {
    if (!timeline) return;
    this.timelines.delete(timeline);
    timeline.kill();
  }

  public suspendAll() {
    this.timelines.forEach(timeline => {
      timeline.pause(0, false);
    });

    if (ScrollTrigger.getAll().length > 0) {
      ScrollTrigger.getAll().forEach(trigger => trigger.disable());
    }
  }

  public resumeAll() {
    if (this.isReducedMotion) return;

    this.timelines.forEach(timeline => {
      timeline.play(0);
    });
    ScrollTrigger.refresh();
  }
}

export const getAnimationOrchestrator = () => {
  if (!orchestratorInstance) {
    orchestratorInstance = new AnimationOrchestrator();
  }
  return orchestratorInstance;
};

interface UseTimelineOptions {
  disabled?: boolean;
  deps?: DependencyList;
}

export const useGsapTimeline = (
  createTimeline: () => TimelineLike | null,
  options: UseTimelineOptions = {},
) => {
  const orchestrator = useMemo(() => getAnimationOrchestrator(), []);
  const timelineRef = useRef<TimelineLike | null>(null);
  const { disabled = false, deps = [] } = options;

  useEffect(() => {
    if (!isBrowser) return;

    if (disabled || orchestrator.getReducedMotion()) {
      return () => {};
    }

    timelineRef.current = orchestrator.register(createTimeline);

    return () => orchestrator.unregister(timelineRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, orchestrator, ...deps]);
};

export const useReducedMotionPreference = () => {
  const orchestrator = useMemo(() => getAnimationOrchestrator(), []);

  useEffect(() => {
    orchestrator.setReducedMotion(orchestrator.getReducedMotion());
  }, [orchestrator]);

  return {
    reducedMotion: orchestrator.getReducedMotion(),
    setReducedMotion: (value: boolean) => orchestrator.setReducedMotion(value),
  };
};


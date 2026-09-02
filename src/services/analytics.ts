import type { AnalyticsEvent } from '../types';
import { config } from '../config';

export function initAnalytics(): void {
  if (config.analytics.enabled) {
    console.log('[Analytics] Initialized analytics service (Privacy-First)');
    // Future: Plausible or GA4 initialization logic here
  }
}

export function trackEvent(event: AnalyticsEvent, metadata?: Record<string, string>): void {
  if (config.analytics.enabled) {
    // Future: Plausible or GA4 tracking call here
    // e.g. plausible(event, { props: metadata })
    console.log(`[Analytics] Track Event: ${event}`, metadata || {});
  } else if (import.meta.env?.DEV) {
    console.log(`[Analytics] (Dev Mode) Track Event: ${event}`, metadata || {});
  }
}

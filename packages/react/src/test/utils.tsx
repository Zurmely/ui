import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import type { AccessibilityPreferences } from '../components/accessibility/preferences';

export interface RenderWithThemeOptions extends RenderOptions {
  theme?: 'light' | 'dark';
  accessibility?: AccessibilityPreferences;
}

function accessibilityAttributes(
  preferences: AccessibilityPreferences = {},
): Record<string, string> {
  const attrs: Record<string, string> = {};

  if (preferences.contrast && preferences.contrast !== 'system') {
    attrs['data-contrast'] = preferences.contrast;
  }
  if (preferences.motion && preferences.motion !== 'system') {
    attrs['data-motion'] = preferences.motion;
  }
  if (preferences.transparency && preferences.transparency !== 'system') {
    attrs['data-transparency'] = preferences.transparency;
  }
  if (preferences.linkUnderline && preferences.linkUnderline !== 'auto') {
    attrs['data-link-underline'] = preferences.linkUnderline;
  }

  return attrs;
}

export function renderWithTheme(ui: ReactElement, options?: RenderWithThemeOptions) {
  const { theme = 'light', accessibility, ...renderOptions } = options ?? {};

  return render(
    <div data-theme={theme} {...accessibilityAttributes(accessibility)}>
      {ui}
    </div>,
    renderOptions,
  );
}

export async function checkA11y(container: HTMLElement) {
  const { axe } = await import('vitest-axe');
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

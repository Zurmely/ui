import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

export interface RenderWithThemeOptions extends RenderOptions {
  theme?: 'light' | 'dark';
}

export function renderWithTheme(ui: ReactElement, options?: RenderWithThemeOptions) {
  const { theme = 'light', ...renderOptions } = options ?? {};

  return render(<div data-theme={theme}>{ui}</div>, renderOptions);
}

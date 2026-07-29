import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { ThemeController } from './ThemeController';
import { THEME_STORAGE_KEY } from './theme';

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
}

describe('ThemeController', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: createMemoryStorage(),
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders theme options as a radiogroup', () => {
    renderWithTheme(<ThemeController />);
    expect(screen.getByRole('radiogroup', { name: 'Theme' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'System' })).toBeInTheDocument();
  });

  it('selects system by default and applies resolved theme', () => {
    renderWithTheme(<ThemeController />);
    const system = screen.getByRole('radio', { name: 'System' });
    expect(system).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('calls onChange and applies dark theme when selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<ThemeController onChange={onChange} />);

    await user.click(screen.getByRole('radio', { name: 'Dark' }));

    expect(onChange).toHaveBeenCalledWith('dark');
    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists the preference to localStorage and restores it on remount', async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithTheme(<ThemeController />);

    await user.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    unmount();
    renderWithTheme(<ThemeController />);

    expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('does not write to localStorage when storageKey is false', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeController storageKey={false} />);

    await user.click(screen.getByRole('radio', { name: 'Dark' }));

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('supports controlled value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<ThemeController value="light" onChange={onChange} storageKey={false} />);

    expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'true');

    await user.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(onChange).toHaveBeenCalledWith('dark');
    expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(<ThemeController />);
    await checkA11y(container);
  });
});

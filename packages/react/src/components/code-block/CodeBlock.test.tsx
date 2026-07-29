import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { checkA11y, renderWithTheme } from '../../test/utils';
import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  it('renders single-line code by default with a copy control', () => {
    renderWithTheme(<CodeBlock>--z-color-text-primary</CodeBlock>);
    const root = screen.getByText('--z-color-text-primary').closest('.z-code-block');
    expect(root).toHaveAttribute('data-variant', 'single');
    expect(screen.getByText('--z-color-text-primary').tagName).toBe('CODE');
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('renders multi-line block with language label, copy, and highlighting', () => {
    const { container } = renderWithTheme(
      <CodeBlock variant="multi" language="tsx">
        {`const x = 1;`}
      </CodeBlock>,
    );
    expect(screen.getByText('tsx')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
    expect(container.querySelector('.z-code-block')).toHaveAttribute('data-variant', 'multi');
    expect(container.querySelector('.z-code-block__pre')).toBeTruthy();
  });

  it('keeps a header with copy when multi has no language', () => {
    const { container } = renderWithTheme(
      <CodeBlock variant="multi">{`line one`}</CodeBlock>,
    );
    expect(container.querySelector('.z-code-block__header')).toBeTruthy();
    expect(container.querySelector('.z-code-block__lang')).toBeNull();
    expect(screen.getByRole('button', { name: 'Copy code' })).toBeInTheDocument();
  });

  it('copies source text when the copy button is pressed', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText },
    });

    renderWithTheme(<CodeBlock code="--z-spacing-gap-inline" />);
    await user.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(writeText).toHaveBeenCalledWith('--z-spacing-gap-inline');
    vi.unstubAllGlobals();
  });

  it('forwards ref to the root element', () => {
    const ref = vi.fn();
    renderWithTheme(<CodeBlock ref={ref}>token</CodeBlock>);
    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <>
        <CodeBlock variant="single">--z-spacing-gap-inline</CodeBlock>
        <CodeBlock variant="multi" language="css">
          {`.root { color: red; }`}
        </CodeBlock>
      </>,
    );
    await checkA11y(container);
  });
});

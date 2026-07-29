import { Highlight, type Language } from 'prism-react-renderer';
import {
  forwardRef,
  useCallback,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { IconButton } from '../icon-button';
import { cx } from '../../shared';
import { codeBlockHighlightTheme } from './highlight-theme';
import './code-block.css';

export type CodeBlockVariant = 'single' | 'multi';

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  variant?: CodeBlockVariant;
  /** Language for the multi variant label and syntax highlighting. Defaults to `tsx` when multi. */
  language?: string;
  /** Explicit code string to display and copy. Falls back to string `children`. */
  code?: string;
  children?: ReactNode;
}

function resolveCode(code: string | undefined, children: ReactNode): string {
  if (code != null) return code;
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  return '';
}

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="5.5"
        y="3.5"
        width="8"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 5.5V12A1.5 1.5 0 0 0 5 13.5h5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeBlockCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <IconButton
      type="button"
      size="sm"
      variant="ghost"
      className="z-code-block__copy"
      disabled={!text}
      aria-label={copied ? 'Copied' : 'Copy code'}
      onClick={(event) => {
        void handleCopy();
        event.currentTarget.blur();
      }}
    >
      {copied ? <CheckIcon /> : <ClipboardIcon />}
    </IconButton>
  );
}

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(function CodeBlock(
  { variant = 'single', language, code, className, children, title, ...props },
  ref,
) {
  const source = resolveCode(code, children).replace(/^\n/, '').replace(/\n$/, '');

  if (variant === 'single') {
    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        className={cx('z-code-block', className)}
        data-variant="single"
        {...props}
      >
        <code className="z-code-block__code" title={title ?? (source || undefined)}>
          {source}
        </code>
        <CodeBlockCopyButton text={source} />
      </span>
    );
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={cx('z-code-block', className)}
      data-variant="multi"
      {...props}
    >
      <div className="z-code-block__header">
        {language ? <span className="z-code-block__lang">{language}</span> : null}
        <CodeBlockCopyButton text={source} />
      </div>
      <Highlight
        theme={codeBlockHighlightTheme}
        code={source}
        language={(language || 'tsx') as Language}
      >
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={cx('z-code-block__pre', preClassName)} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
});

CodeBlock.displayName = 'CodeBlock';

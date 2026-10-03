import {
  Button,
  CodeBlock,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@z-ux/ui';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

interface ResolvedTokenProps {
  token: string;
  label: string;
}

export function useResolvedToken(name: string): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    const update = () => {
      setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style', 'class'],
    });

    return () => observer.disconnect();
  }, [name]);

  return value;
}

function useResolvedBoxShadow(varName: string): { ref: RefObject<HTMLDivElement | null>; value: string } {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  useLayoutEffect(() => {
    const update = () => {
      if (!ref.current) return;
      setValue(getComputedStyle(ref.current).boxShadow);
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style', 'class'],
    });

    return () => observer.disconnect();
  }, [varName]);

  return { ref, value };
}

function TokenCopyMeta({
  token,
  resolved,
  textClassName,
}: {
  token: string;
  resolved?: string;
  textClassName: string;
}) {
  const valueText = resolved || '—';

  return (
    <div className="docs-token-card__meta">
      <Separator className="docs-token-card__separator" />
      <div className="docs-token-card__meta-rows">
        <CodeBlock variant="single" className={textClassName} title={valueText}>
          {valueText}
        </CodeBlock>
        <CodeBlock variant="single" className={textClassName} title={token}>
          {token}
        </CodeBlock>
      </div>
    </div>
  );
}

type SwatchHoverMode = 'expand' | 'fill';

function useSwatchHoverExpand(
  hostRef: RefObject<HTMLElement | null>,
  detailsRef: RefObject<HTMLDivElement | null>,
  deps: unknown[],
): { mode: SwatchHoverMode; expandedWidth?: string } {
  const [mode, setMode] = useState<SwatchHoverMode>('fill');
  const [expandedWidth, setExpandedWidth] = useState<string>();

  useLayoutEffect(() => {
    const host = hostRef.current;
    const details = detailsRef.current;
    if (!host || !details) return;

    let frame = 0;

    const measure = () => {
      // Ignore sizes while expanded on hover so we compare against resting width only.
      if (host.matches(':hover, :focus-within')) return;

      const inset = Number.parseFloat(getComputedStyle(details).left) || 0;

      details.style.width = 'max-content';
      details.style.right = 'auto';
      details.style.bottom = 'auto';
      const panelWidth = details.getBoundingClientRect().width;
      details.style.width = '';
      details.style.right = '';
      details.style.bottom = '';

      const neededInner = Math.ceil(panelWidth) + inset * 2;
      const available = host.clientWidth;
      const hostChrome = host.offsetWidth - host.clientWidth;

      if (neededInner <= available) {
        setMode('fill');
        setExpandedWidth(undefined);
      } else {
        setMode('expand');
        setExpandedWidth(`${neededInner + hostChrome}px`);
      }
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(host);
    host.addEventListener('pointerleave', schedule);
    host.addEventListener('focusout', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener('pointerleave', schedule);
      host.removeEventListener('focusout', schedule);
    };
  }, deps);

  return { mode, expandedWidth };
}

export function PrimitiveColorSwatch({ varName }: { varName: string }) {
  const resolved = useResolvedToken(varName);
  const hostRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const { mode, expandedWidth } = useSwatchHoverExpand(hostRef, detailsRef, [resolved, varName]);
  const [open, setOpen] = useState(false);
  const valueText = resolved || '—';

  return (
    <div
      ref={hostRef}
      className={`docs-primitive-swatch${mode === 'expand' ? ' docs-primitive-swatch--expand' : ''}`}
      style={
        {
          background: `var(${varName})`,
          ['--docs-strip-expanded-width']: expandedWidth,
        } as CSSProperties
      }
    >
      <button
        type="button"
        className="docs-primitive-swatch__open"
        aria-label={`View ${varName}`}
        onClick={() => setOpen(true)}
      />
      <div ref={detailsRef} className="docs-primitive-swatch__details">
        <CodeBlock
          variant="single"
          className="docs-primitive-swatch__text"
          title={resolved || undefined}
        >
          {valueText}
        </CodeBlock>
        <CodeBlock variant="single" className="docs-primitive-swatch__text" title={varName}>
          {varName}
        </CodeBlock>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{varName}</DialogTitle>
            <DialogDescription>Primitive color token</DialogDescription>
          </DialogHeader>
          <div className="docs-primitive-swatch-dialog">
            <div
              className="docs-primitive-swatch-dialog__preview"
              style={{ background: `var(${varName})` }}
              aria-hidden="true"
            />
            <div className="docs-primitive-swatch-dialog__meta">
              <CodeBlock variant="single" title={valueText}>
                {valueText}
              </CodeBlock>
              <CodeBlock variant="single" title={varName}>
                {varName}
              </CodeBlock>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function pairedPreviewClass(token: string): string {
  if (token.includes('on-solid')) return ' docs-color-token-card__sample--on-solid';
  if (token.includes('on-primary')) return ' docs-color-token-card__sample--on-primary';
  if (token.includes('inverse')) return ' docs-color-token-card__sample--on-inverse';
  return '';
}

export function ColorSwatch({
  token,
  label,
  kind = 'fill',
  useWhen,
}: {
  token: string;
  label: string;
  kind?: 'fill' | 'text' | 'border' | 'icon';
  useWhen?: string;
}) {
  const varName = token.startsWith('--') ? token : `--z-color-${token}`;
  const resolved = useResolvedToken(varName);
  const pairClass = pairedPreviewClass(token);

  return (
    <article className="docs-color-token-card">
      <div
        className="docs-color-token-card__preview"
        style={kind === 'fill' ? { background: `var(${varName})` } : undefined}
      >
        {kind === 'text' ? (
          <div
            className={`docs-color-token-card__sample docs-color-token-card__sample--text${pairClass}`}
            style={{ color: `var(${varName})` }}
            aria-hidden="true"
          >
            Aa
          </div>
        ) : null}
        {kind === 'border' ? (
          <div
            className="docs-color-token-card__sample docs-color-token-card__sample--border"
            style={{ borderColor: `var(${varName})` }}
            aria-hidden="true"
          />
        ) : null}
        {kind === 'icon' ? (
          <div
            className={`docs-color-token-card__sample docs-color-token-card__sample--icon${pairClass}`}
            style={{ color: `var(${varName})` }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 5.5v3M8 10.5h.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="docs-color-token-card__name">
        <span className="docs-color-token-card__label">{label}</span>
        {useWhen ? (
          <span className="docs-color-token-card__description" title={useWhen}>
            {useWhen}
          </span>
        ) : null}
        <TokenCopyMeta
          token={varName}
          resolved={resolved}
          textClassName="docs-color-token-card__text"
        />
      </div>
    </article>
  );
}

function StripTokenCard({
  label,
  token,
  resolved,
  description,
  preview,
}: {
  label: string;
  token: string;
  resolved?: string;
  description?: string;
  preview: ReactNode;
}) {
  return (
    <article className="docs-color-token-card">
      <div className="docs-color-token-card__preview">
        <div className="docs-color-token-card__sample">{preview}</div>
      </div>
      <div className="docs-color-token-card__name">
        <span className="docs-color-token-card__label">{label}</span>
        {description ? (
          <span className="docs-color-token-card__description" title={description}>
            {description}
          </span>
        ) : null}
        <TokenCopyMeta
          token={token}
          resolved={resolved}
          textClassName="docs-color-token-card__text"
        />
      </div>
    </article>
  );
}

function DemoTokenCard({
  label,
  token,
  resolved,
  description,
  preview,
  className,
}: {
  label: string;
  token: string;
  resolved?: string;
  description?: string;
  preview: ReactNode;
  className?: string;
}) {
  return (
    <article className={className ? `docs-demo-token-card ${className}` : 'docs-demo-token-card'}>
      <div className="docs-demo-token-card__preview">
        <div className="docs-demo-token-card__sample">{preview}</div>
      </div>
      <div className="docs-demo-token-card__body">
        <span className="docs-demo-token-card__label">{label}</span>
        {description ? (
          <span className="docs-demo-token-card__description">{description}</span>
        ) : null}
        <TokenCopyMeta
          token={token}
          resolved={resolved}
          textClassName="docs-demo-token-card__text"
        />
      </div>
    </article>
  );
}

export function PrimitiveSpaceBar({ step }: { step: string }) {
  const varName = `--z-space-${step}`;
  const resolved = useResolvedToken(varName);

  return (
    <StripTokenCard
      label={`space.${step}`}
      token={varName}
      resolved={resolved}
      preview={
        <div
          className="docs-size-square"
          style={{ width: `var(${varName})`, height: `var(${varName})` }}
          aria-hidden="true"
        />
      }
    />
  );
}

export function SpaceBar({
  token,
  label,
  useWhen,
}: ResolvedTokenProps & { useWhen?: string }) {
  const varName = token.startsWith('--') ? token : `--z-spacing-${token}`;
  const resolved = useResolvedToken(varName);

  return (
    <StripTokenCard
      label={label}
      token={varName}
      resolved={resolved}
      description={useWhen}
      preview={
        <div
          className="docs-size-square"
          style={{ width: `var(${varName})`, height: `var(${varName})` }}
          aria-hidden="true"
        />
      }
    />
  );
}

export function PrimitiveRadiusSample({ step }: { step: string }) {
  const varName = `--z-radius-${step}`;
  const resolved = useResolvedToken(varName);

  return (
    <StripTokenCard
      label={`radius.${step}`}
      token={varName}
      resolved={resolved}
      preview={
        <div
          className="docs-size-radius-square"
          style={{ borderRadius: `var(${varName})` }}
          aria-hidden="true"
        />
      }
    />
  );
}

export function RadiusSample({
  token,
  label,
  useWhen,
}: ResolvedTokenProps & { useWhen?: string }) {
  const varName = token.startsWith('--') ? token : `--z-radius-${token}`;
  const resolved = useResolvedToken(varName);

  return (
    <StripTokenCard
      label={label}
      token={varName}
      resolved={resolved}
      description={useWhen}
      preview={
        <div
          className="docs-size-radius-square"
          style={{ borderRadius: `var(${varName})` }}
          aria-hidden="true"
        />
      }
    />
  );
}

export function FontSizeSample({ step }: { step: string }) {
  const varName = `--z-font-size-${step}`;
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label={`size ${step}`}
      token={varName}
      resolved={resolved}
      preview={
        <span
          className="docs-font-size-item__sample"
          style={{ fontSize: `var(${varName})` }}
          aria-hidden="true"
        >
          Aa
        </span>
      }
    />
  );
}

export function FontWeightSample({ weight }: { weight: string }) {
  const varName = `--z-font-weight-${weight}`;
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label={weight}
      token={varName}
      resolved={resolved}
      preview={
        <span
          className="docs-font-weight-item__sample"
          style={{ fontWeight: `var(${varName})` }}
          aria-hidden="true"
        >
          Weight
        </span>
      }
    />
  );
}

export function FontLineHeightSample({ lineHeight }: { lineHeight: string }) {
  const varName = `--z-font-line-height-${lineHeight}`;
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label={lineHeight}
      token={varName}
      resolved={resolved}
      preview={
        <p
          className="docs-font-line-height-item__sample"
          style={{ lineHeight: `var(${varName})` }}
          aria-hidden="true"
        >
          Line height shapes how copy breathes across multiple lines.
        </p>
      }
    />
  );
}

export function FontFamilySample({ family }: { family: 'sans' | 'mono' }) {
  const varName = `--z-font-family-${family}`;
  const resolved = useResolvedToken(varName);
  const sample = family === 'mono' ? 'const x = 42;' : 'Manrope UI sans';

  return (
    <DemoTokenCard
      label={family}
      token={varName}
      resolved={resolved}
      preview={
        <p
          className="docs-font-family-item__sample"
          style={{ fontFamily: `var(${varName})` }}
          aria-hidden="true"
        >
          {sample}
        </p>
      }
    />
  );
}

export function TextRoleSample({
  role,
  useWhen,
}: {
  role: string;
  useWhen?: string;
}) {
  const size = useResolvedToken(`--z-text-${role}-size`);
  const weight = useResolvedToken(`--z-text-${role}-weight`);
  const lineHeight = useResolvedToken(`--z-text-${role}-line-height`);
  const token = `--z-text-${role}-size`;
  const resolved = `${size} / ${weight} / ${lineHeight}`;

  return (
    <DemoTokenCard
      className="docs-demo-token-card--text-role"
      label={role}
      token={token}
      resolved={resolved}
      description={useWhen}
      preview={
        <p
          className="docs-text-role__sample"
          style={{
            fontFamily: `var(--z-text-${role}-font-family)`,
            fontSize: `var(--z-text-${role}-size)`,
            fontWeight: `var(--z-text-${role}-weight)`,
            lineHeight: `var(--z-text-${role}-line-height)`,
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      }
    />
  );
}

export function PrimitiveShadowSample({ step }: { step: string }) {
  const varName = `--shadow-${step}`;
  const { ref, value } = useResolvedBoxShadow(varName);

  return (
    <StripTokenCard
      label={`shadow ${step}`}
      token={varName}
      resolved={value || undefined}
      preview={
        <div className="docs-elevation-demo">
          <div
            ref={ref}
            className="docs-elevation-demo__surface"
            style={{ boxShadow: `var(${varName})` }}
            aria-hidden="true"
          />
        </div>
      }
    />
  );
}

export function ElevationReservedRoleSwatch({
  token,
  label,
  useWhen,
  role,
}: {
  token: string;
  label: string;
  useWhen: string;
  role: 'raised' | 'overlay' | 'modal';
}) {
  const varName = token.startsWith('--') ? token : `--z-elevation-${token}`;

  return (
    <StripTokenCard
      label={label}
      token={varName}
      resolved="none"
      description={useWhen}
      preview={
        <div
          className={`docs-elevation-fill-demo docs-elevation-fill-demo--${role}`}
          aria-hidden="true"
        >
          <div className="docs-elevation-fill-demo__canvas" />
          {role === 'modal' ? <div className="docs-elevation-fill-demo__scrim" /> : null}
          <div className="docs-elevation-fill-demo__panel" />
        </div>
      }
    />
  );
}

export function ElevationSwatch({
  token,
  label,
  useWhen,
  variant = 'ring',
}: {
  token: string;
  label: string;
  useWhen: string;
  variant?: 'ring';
}) {
  const varName = token.startsWith('--') ? token : `--z-elevation-${token}`;
  const { ref, value } = useResolvedBoxShadow(varName);

  return (
    <StripTokenCard
      label={label}
      token={varName}
      resolved={value || undefined}
      description={useWhen}
      preview={
        <div className="docs-elevation-demo docs-elevation-demo--ring-context">
          <div
            ref={ref}
            className="docs-elevation-demo__surface docs-elevation-demo__surface--ring"
            style={{ boxShadow: `var(${varName})` }}
            aria-hidden="true"
          />
        </div>
      }
    />
  );
}

export function MotionDurationSample({
  purpose,
  label,
  useWhen,
}: {
  purpose: string;
  label: string;
  useWhen?: string;
}) {
  const varName = `--z-motion-duration-${purpose}`;
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label={label}
      token={varName}
      resolved={resolved}
      description={useWhen}
      preview={
        <div className="docs-motion-chip docs-motion-chip--duration" aria-hidden="true" />
      }
    />
  );
}

export function MotionEasingSample({
  purpose,
  label,
  useWhen,
}: {
  purpose: string;
  label: string;
  useWhen?: string;
}) {
  const varName = `--z-motion-easing-${purpose}`;
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label={label}
      token={varName}
      resolved={resolved}
      description={useWhen}
      preview={
        <div className="docs-motion-chip docs-motion-chip--easing" aria-hidden="true" />
      }
    />
  );
}

export function MotionInteractionSample() {
  const varName = '--z-motion-duration-interaction';
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label="Interaction"
      token={varName}
      resolved={resolved}
      description="Hover the preview to see color feedback timing."
      preview={
        <div className="docs-motion-demo docs-motion-demo--interaction" aria-hidden="true" />
      }
    />
  );
}

export function MotionEnterExitSample() {
  const varName = '--z-motion-duration-enter';
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label="Enter / exit"
      token={varName}
      resolved={resolved}
      description="Hover the preview to see enter and exit timing."
      preview={
        <div className="docs-motion-demo-wrap" aria-hidden="true">
          <div className="docs-motion-demo docs-motion-demo--enter-exit" />
        </div>
      }
    />
  );
}

export function MotionContinuousSample() {
  const varName = '--z-motion-duration-continuous';
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label="Continuous"
      token={varName}
      resolved={resolved}
      description="Looping indicator timing (spinner-style)."
      preview={
        <div className="docs-motion-demo docs-motion-demo--continuous" aria-hidden="true" />
      }
    />
  );
}

export function MotionLayoutSample() {
  const varName = '--z-motion-duration-layout';
  const resolved = useResolvedToken(varName);

  return (
    <DemoTokenCard
      label="Layout"
      token={varName}
      resolved={resolved}
      description="Hover the preview to see expand timing."
      preview={
        <div className="docs-motion-demo docs-motion-demo--layout" aria-hidden="true" />
      }
    />
  );
}

export function RecipePanel({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="docs-recipe">
      <h4 className="docs-recipe__title">{title}</h4>
      {note ? <p className="docs-recipe__note">{note}</p> : null}
      <div className="docs-recipe__content">{children}</div>
    </div>
  );
}

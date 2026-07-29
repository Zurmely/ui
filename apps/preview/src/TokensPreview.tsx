import type { ReactNode } from 'react';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="preview__section">
      <h2 className="preview__section-title">{title}</h2>
      {children}
    </section>
  );
}

function TokenMeta({ children }: { children: ReactNode }) {
  return <h3 className="preview__text-meta">{children}</h3>;
}

function ColorSwatch({
  token,
  label,
  kind = 'fill',
}: {
  token: string;
  label: string;
  kind?: 'fill' | 'text' | 'border' | 'icon';
}) {
  const varName = `--z-color-${token}`;

  return (
    <div className="preview__swatch">
      {kind === 'fill' ? (
        <div
          className="preview__swatch-chip"
          style={{ background: `var(${varName})` }}
          aria-hidden="true"
        />
      ) : null}
      {kind === 'text' ? (
        <div
          className={`preview__swatch-chip preview__swatch-chip--text${
            token.includes('inverse') || token.includes('on-solid')
              ? ' preview__swatch-chip--on-dark'
              : ''
          }`}
          style={{ color: `var(${varName})` }}
          aria-hidden="true"
        >
          Aa
        </div>
      ) : null}
      {kind === 'border' ? (
        <div
          className="preview__swatch-chip preview__swatch-chip--border"
          style={{ borderColor: `var(${varName})` }}
          aria-hidden="true"
        />
      ) : null}
      {kind === 'icon' ? (
        <div
          className={`preview__swatch-chip preview__swatch-chip--icon${
            token.includes('inverse') || token.includes('on-solid')
              ? ' preview__swatch-chip--on-dark'
              : ''
          }`}
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
      <div className="preview__swatch-meta">
        <span className="preview__swatch-label">{label}</span>
        <code className="preview__swatch-token">{varName}</code>
      </div>
    </div>
  );
}

function SpaceBar({ token, label }: { token: string; label: string }) {
  const varName = `--z-spacing-${token}`;
  return (
    <div className="preview__space-row">
      <div className="preview__space-meta">
        <span className="preview__swatch-label">{label}</span>
        <code className="preview__swatch-token">{varName}</code>
      </div>
      <div
        className="preview__space-bar"
        style={{ width: `var(${varName})` }}
        aria-hidden="true"
      />
    </div>
  );
}

function RadiusSample({ token, label }: { token: string; label: string }) {
  const varName = `--z-radius-${token}`;
  return (
    <div className="preview__radius-item">
      <div
        className="preview__radius-chip"
        style={{ borderRadius: `var(${varName})` }}
        aria-hidden="true"
      />
      <div className="preview__swatch-meta">
        <span className="preview__swatch-label">{label}</span>
        <code className="preview__swatch-token">{varName}</code>
      </div>
    </div>
  );
}

const BACKGROUND_TOKENS = [
  { token: 'background-canvas', label: 'Canvas' },
  { token: 'background-surface', label: 'Surface' },
  { token: 'background-subtle', label: 'Subtle' },
  { token: 'background-muted', label: 'Muted' },
  { token: 'background-inverse', label: 'Inverse' },
  { token: 'background-selected', label: 'Selected' },
  { token: 'background-primary-subtle', label: 'Primary subtle' },
  { token: 'background-danger-subtle', label: 'Danger subtle' },
  { token: 'background-success-subtle', label: 'Success subtle' },
  { token: 'background-warning-subtle', label: 'Warning subtle' },
  { token: 'background-info-subtle', label: 'Info subtle' },
  { token: 'background-primary', label: 'Primary' },
  { token: 'background-primary-hover', label: 'Primary hover' },
  { token: 'background-primary-active', label: 'Primary active' },
  { token: 'background-primary-disabled', label: 'Primary disabled' },
  { token: 'background-danger', label: 'Danger' },
  { token: 'background-success', label: 'Success' },
  { token: 'background-warning', label: 'Warning' },
  { token: 'background-info', label: 'Info' },
] as const;

const TEXT_TOKENS = [
  { token: 'text-primary', label: 'Primary' },
  { token: 'text-secondary', label: 'Secondary' },
  { token: 'text-tertiary', label: 'Tertiary' },
  { token: 'text-disabled', label: 'Disabled' },
  { token: 'text-inverse', label: 'Inverse' },
  { token: 'text-on-solid', label: 'On solid' },
  { token: 'text-on-primary', label: 'On primary' },
  { token: 'text-danger', label: 'Danger' },
  { token: 'text-success', label: 'Success' },
  { token: 'text-warning', label: 'Warning' },
  { token: 'text-info', label: 'Info' },
  { token: 'text-link', label: 'Link' },
  { token: 'text-link-hover', label: 'Link hover' },
] as const;

const ICON_TOKENS = [
  { token: 'icon-primary', label: 'Primary' },
  { token: 'icon-secondary', label: 'Secondary' },
  { token: 'icon-disabled', label: 'Disabled' },
  { token: 'icon-inverse', label: 'Inverse' },
  { token: 'icon-on-solid', label: 'On solid' },
  { token: 'icon-on-primary', label: 'On primary' },
  { token: 'icon-danger', label: 'Danger' },
  { token: 'icon-success', label: 'Success' },
  { token: 'icon-warning', label: 'Warning' },
  { token: 'icon-info', label: 'Info' },
] as const;

const BORDER_TOKENS = [
  { token: 'border-subtle', label: 'Subtle' },
  { token: 'border-default', label: 'Default' },
  { token: 'border-strong', label: 'Strong' },
  { token: 'border-disabled', label: 'Disabled' },
  { token: 'border-primary', label: 'Primary' },
  { token: 'border-danger', label: 'Danger' },
  { token: 'border-success', label: 'Success' },
  { token: 'border-warning', label: 'Warning' },
  { token: 'border-info', label: 'Info' },
  { token: 'border-focus', label: 'Focus' },
] as const;

const SPACE_INSET = [
  { token: 'inset-control-compact-y', label: 'Control compact Y' },
  { token: 'inset-control-compact-x', label: 'Control compact X' },
  { token: 'inset-control-y', label: 'Control Y' },
  { token: 'inset-control-x', label: 'Control X' },
  { token: 'inset-control-comfortable-y', label: 'Control comfortable Y' },
  { token: 'inset-control-comfortable-x', label: 'Control comfortable X' },
  { token: 'inset-compact', label: 'Compact' },
  { token: 'inset-container', label: 'Container' },
  { token: 'inset-panel', label: 'Panel' },
  { token: 'inset-tooltip-y', label: 'Tooltip Y' },
  { token: 'inset-tooltip-x', label: 'Tooltip X' },
] as const;

const SPACE_GAP = [
  { token: 'gap-inline-tight', label: 'Inline tight' },
  { token: 'gap-inline', label: 'Inline' },
  { token: 'gap-component', label: 'Component' },
  { token: 'gap-section', label: 'Section' },
  { token: 'gap-page-section', label: 'Page section' },
] as const;

const SPACE_STACK = [
  { token: 'stack-form', label: 'Form' },
  { token: 'stack-control', label: 'Control' },
  { token: 'stack-component', label: 'Component' },
  { token: 'stack-section', label: 'Section' },
  { token: 'stack-page-section', label: 'Page section' },
] as const;

const RADIUS_TOKENS = [
  { token: 'control-compact', label: 'Control compact' },
  { token: 'control', label: 'Control' },
  { token: 'surface', label: 'Surface' },
  { token: 'container', label: 'Container' },
  { token: 'pill', label: 'Pill' },
  { token: 'circle', label: 'Circle' },
] as const;

export default function TokensPreview() {
  return (
    <>
      <Section title="Colors">
        <div className="preview__token-group">
          <TokenMeta>Background</TokenMeta>
          <div className="preview__swatch-grid">
            {BACKGROUND_TOKENS.map((item) => (
              <ColorSwatch key={item.token} {...item} kind="fill" />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Text</TokenMeta>
          <div className="preview__swatch-grid">
            {TEXT_TOKENS.map((item) => (
              <ColorSwatch key={item.token} {...item} kind="text" />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Icon</TokenMeta>
          <div className="preview__swatch-grid">
            {ICON_TOKENS.map((item) => (
              <ColorSwatch key={item.token} {...item} kind="icon" />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Border</TokenMeta>
          <div className="preview__swatch-grid">
            {BORDER_TOKENS.map((item) => (
              <ColorSwatch key={item.token} {...item} kind="border" />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Focus &amp; overlay</TokenMeta>
          <div className="preview__swatch-grid">
            <ColorSwatch token="focus-ring" label="Focus ring" kind="border" />
            <ColorSwatch token="overlay-scrim" label="Overlay scrim" kind="fill" />
            <ColorSwatch token="overlay-tooltip" label="Overlay tooltip" kind="fill" />
          </div>
        </div>
      </Section>

      <Section title="Spacing">
        <div className="preview__token-group">
          <TokenMeta>Inset</TokenMeta>
          <div className="preview__space-stack">
            {SPACE_INSET.map((item) => (
              <SpaceBar key={item.token} {...item} />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Gap</TokenMeta>
          <div className="preview__space-stack">
            {SPACE_GAP.map((item) => (
              <SpaceBar key={item.token} {...item} />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Stack</TokenMeta>
          <div className="preview__space-stack">
            {SPACE_STACK.map((item) => (
              <SpaceBar key={item.token} {...item} />
            ))}
          </div>
        </div>

        <div className="preview__token-group">
          <TokenMeta>Offset</TokenMeta>
          <div className="preview__space-stack">
            <SpaceBar token="offset-overlay" label="Overlay" />
          </div>
        </div>
      </Section>

      <Section title="Radius">
        <div className="preview__radius-grid">
          {RADIUS_TOKENS.map((item) => (
            <RadiusSample key={item.token} {...item} />
          ))}
        </div>
      </Section>

      <Section title="Motion">
        <div className="preview__motion-grid">
          <div className="preview__motion-card">
            <div className="preview__motion-demo preview__motion-demo--interaction" aria-hidden="true" />
            <div className="preview__swatch-meta">
              <span className="preview__swatch-label">Interaction</span>
              <code className="preview__swatch-token">--z-motion-duration-interaction</code>
              <code className="preview__swatch-token">--z-motion-easing-interaction</code>
            </div>
            <p className="preview__text-meta">Hover the chip to see color feedback timing.</p>
          </div>
          <div className="preview__motion-card">
            <div className="preview__motion-demo preview__motion-demo--continuous" aria-hidden="true" />
            <div className="preview__swatch-meta">
              <span className="preview__swatch-label">Continuous</span>
              <code className="preview__swatch-token">--z-motion-duration-continuous</code>
              <code className="preview__swatch-token">--z-motion-easing-continuous</code>
            </div>
            <p className="preview__text-meta">Looping indicator timing (spinner-style).</p>
          </div>
        </div>
      </Section>
    </>
  );
}

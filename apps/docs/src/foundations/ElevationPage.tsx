import { Badge } from '@z-ui/react';
import { FoundationPageHeader } from '../components/FoundationPageHeader';
import { TokenTable } from '../components/TokenTable';
import { buildTokenManifest, getTokensByTier } from '../tokens/parse';
import {
  ElevationSwatch,
  PrimitiveShadowSample,
  RecipePanel,
} from '../tokens/TokenSwatches';
import { Section, TokenGroup, TokenSubGroup } from './FoundationSection';

const ELEVATION_SUBGROUPS = [
  {
    title: 'Shadows',
    tokens: [
      {
        token: 'raised',
        label: 'Raised',
        useWhen: 'Cards, subtle lift above canvas',
        variant: 'shadow' as const,
      },
      {
        token: 'overlay',
        label: 'Overlay',
        useWhen: 'Select, Menu, Popover, Tooltip, Toast',
        variant: 'shadow' as const,
      },
      {
        token: 'modal',
        label: 'Modal',
        useWhen: 'Dialog, Drawer',
        variant: 'shadow' as const,
      },
    ],
  },
  {
    title: 'Ring',
    tokens: [
      {
        token: 'ring',
        label: 'Ring',
        useWhen: 'Outline halo separating a node from its background',
        variant: 'ring' as const,
      },
    ],
  },
] as const;

const COMPONENT_MAPPING = [
  { component: 'Card', role: 'raised' },
  { component: 'Menu', role: 'overlay' },
  { component: 'Popover', role: 'overlay' },
  { component: 'Tooltip', role: 'overlay' },
  { component: 'Toast', role: 'overlay' },
  { component: 'Dialog', role: 'modal' },
  { component: 'Drawer', role: 'modal' },
  { component: 'Timeline', role: 'ring' },
] as const;

const SHADOW_STEPS = ['1', '2', '3', '4'] as const;

export function ElevationPage() {
  const manifest = buildTokenManifest();
  const primitives = getTokensByTier(manifest, 'elevation', 'primitive');
  const semanticCount = ELEVATION_SUBGROUPS.reduce((count, group) => count + group.tokens.length, 0);

  return (
    <div className="docs-page">
      <FoundationPageHeader
        title="Elevation"
        summary={
          <>
            Shadow tokens for raised surfaces, overlays, modals, and rings. {primitives.length}{' '}
            primitives, {semanticCount} semantics parsed from <code>elevation.css</code>.
          </>
        }
      />

      <Section title="Semantic elevation">
        <p className="docs-page__intro">
          Purpose-based depth tokens. Use <code>elevation.ring</code> for outline halos; use raised
          through modal for drop shadows. Toggle the theme to compare light and dark shadow values.
        </p>
        <TokenGroup title="Elevation">
          {ELEVATION_SUBGROUPS.map((subgroup) => (
            <TokenSubGroup key={subgroup.title} title={subgroup.title}>
              <div className="docs-elevation-grid">
                {subgroup.tokens.map((item) => (
                  <ElevationSwatch
                    key={item.token}
                    token={item.token}
                    label={item.label}
                    useWhen={item.useWhen}
                    variant={item.variant}
                  />
                ))}
              </div>
            </TokenSubGroup>
          ))}
        </TokenGroup>
      </Section>

      <Section title="Primitives">
        <p className="docs-page__intro">
          Raw shadow scale. Components consume semantic <code>--z-elevation-*</code> aliases only.
        </p>
        <TokenSubGroup title="Shadow scale">
          <div className="docs-elevation-primitives-grid">
            {SHADOW_STEPS.map((step) => (
              <PrimitiveShadowSample key={step} step={step} />
            ))}
          </div>
        </TokenSubGroup>
        <TokenTable
          rows={primitives.map((t) => ({
            name: t.theme ? `${t.name} (${t.theme})` : t.name,
            value: t.value,
          }))}
        />
      </Section>

      <Section title="Recipes">
        <p className="docs-page__intro">
          Depth layering and component-to-role mapping from the elevation semantics contract.
        </p>
        <div className="docs-recipes-grid">
          <RecipePanel
            title="Depth stack"
            note="elevation.raised, elevation.overlay, and elevation.modal layered above canvas"
          >
            <div className="docs-recipe-depth-stack">
              <div className="docs-recipe-depth-stack__canvas" aria-hidden="true" />
              <div className="docs-recipe-depth-stack__raised">elevation.raised</div>
              <div className="docs-recipe-depth-stack__overlay">elevation.overlay</div>
              <div className="docs-recipe-depth-stack__modal">elevation.modal</div>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Component mapping"
            note="box-shadow: var(--z-elevation-*) — one semantic role per floating or raised surface"
          >
            <div className="docs-recipe-elevation-map">
              {COMPONENT_MAPPING.map((item) => (
                <div key={item.component} className="docs-recipe-elevation-map__row">
                  <span className="docs-recipe-elevation-map__component">{item.component}</span>
                  <Badge size="sm" tone="neutral">
                    elevation.{item.role}
                  </Badge>
                </div>
              ))}
            </div>
          </RecipePanel>
        </div>
      </Section>
    </div>
  );
}

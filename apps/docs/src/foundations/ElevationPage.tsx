import { Badge } from '@z-ux/ui';
import {
  buildFoundationToc,
  foundationTocItem,
  FoundationTabbedPage,
} from '../docs-tabs/FoundationTabbedPage';
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
  { component: 'Megamenu', role: 'overlay' },
  { component: 'Select', role: 'overlay' },
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

  const summary = (
    <>
      Fill-based depth and outline halos for the page, raised panels, sunk wells, and modal scrims.{' '}
      {primitives.length} primitives, {semanticCount} semantics parsed from <code>elevation.css</code>.
      Depth uses <code>color.background</code> structure, not drop shadows: canvas (step 100), raised{' '}
      <code>surface</code> (light 50, dark 200), sunk <code>subtle</code> (light 200, dark 50). Modals
      dim with flat <code>color.overlay.scrim</code>. <code>elevation.ring</code> is an outline halo;{' '}
      <code>elevation.raised</code>, <code>elevation.overlay</code>, and <code>elevation.modal</code> are{' '}
      <code>none</code> — do not apply <code>box-shadow</code>. Focus rings use <code>color.focus.ring</code>.
    </>
  );

  const designUsage = (
    <>
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
            note="color.background.surface on canvas for each raised floating panel — not box-shadow; elevation.raised, elevation.overlay, and elevation.modal stay none"
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
    </>
  );

  const codeReference = (
    <>
      <Section title="Semantic elevation">
        <p className="docs-page__intro">
          Purpose-based elevation semantics. Depth is <code>color.background.canvas</code> (step 100 in
          both themes), raised <code>color.background.surface</code> (light 50, dark 200), and sunk{' '}
          <code>color.background.subtle</code> (light 200, dark 50) — not drop shadows. Modals dim the
          page with flat <code>color.overlay.scrim</code>. <code>elevation.ring</code> is an outline
          halo, not lift. <code>elevation.raised</code>, <code>elevation.overlay</code>, and{' '}
          <code>elevation.modal</code> are <code>none</code> and must not be applied as{' '}
          <code>box-shadow</code>. Focus rings use <code>color.focus.ring</code>. Toggle the theme to
          compare light and dark fill steps.
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
    </>
  );

  const tocByTab = buildFoundationToc(
    [foundationTocItem('recipes', 'Recipes')],
    [
      foundationTocItem('semantic-elevation', 'Semantic elevation'),
      foundationTocItem('primitives', 'Primitives'),
    ],
  );

  return (
    <FoundationTabbedPage
      title="Elevation"
      path="/foundations/elevation"
      summary={summary}
      changelogKey="elevation"
      designUsage={designUsage}
      codeReference={codeReference}
      tocByTab={tocByTab}
    />
  );
}

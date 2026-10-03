import { Badge } from '@z-ux/ui';
import {
  buildFoundationToc,
  foundationTocItem,
  FoundationTabbedPage,
} from '../docs-tabs/FoundationTabbedPage';
import { buildTokenManifest, getTokensByTier } from '../tokens/parse';
import {
  ElevationReservedRoleSwatch,
  ElevationSwatch,
  RecipePanel,
} from '../tokens/TokenSwatches';
import { Section, TokenGroup, TokenSubGroup } from './FoundationSection';

const ELEVATION_SUBGROUPS = [
  {
    title: 'Reserved roles (none)',
    tokens: [
      {
        token: 'raised',
        label: 'Raised',
        role: 'raised' as const,
        useWhen:
          'Cards and other raised panels use color.background.surface on color.background.canvas. elevation.raised is none — not box-shadow.',
      },
      {
        token: 'overlay',
        label: 'Overlay',
        role: 'overlay' as const,
        useWhen:
          'Menu, Popover, Select, Toast, Calendar, and similar floating panels use color.background.surface on the canvas. elevation.overlay is none.',
      },
      {
        token: 'modal',
        label: 'Modal',
        role: 'modal' as const,
        useWhen:
          'Dialog and Drawer panels use color.background.surface over a flat color.overlay.scrim. elevation.modal is none.',
      },
    ],
  },
  {
    title: 'Ring',
    tokens: [
      {
        token: 'ring',
        label: 'Ring',
        useWhen: 'Outline halo separating a node from its background (not a drop shadow)',
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

export function ElevationPage() {
  const manifest = buildTokenManifest();
  const primitives = getTokensByTier(manifest, 'elevation', 'primitive');
  const semanticCount = ELEVATION_SUBGROUPS.reduce((count, group) => count + group.tokens.length, 0);

  const summary = (
    <>
      Fill-based depth and outline halos for the page, raised panels, sunk wells, and modal scrims.{' '}
      {primitives.length > 0 ? (
        <>
          {primitives.length} primitives, {semanticCount} semantics parsed from <code>elevation.css</code>.
        </>
      ) : (
        <>
          {semanticCount} semantics parsed from <code>elevation.css</code>.
        </>
      )}
      Depth uses <code>color.background</code> structure, not drop shadows: canvas (step 100), raised{' '}
      <code>surface</code> (light 50, dark 200), sunk <code>subtle</code> (light 200, dark 50). Modals
      dim with flat <code>color.overlay.scrim</code>. <code>elevation.ring</code> is an outline halo;{' '}
      <code>elevation.raised</code>, <code>elevation.overlay</code>, and <code>elevation.modal</code> are{' '}
      <code>none</code> — do not apply <code>box-shadow</code>. Focus rings use <code>color.focus.ring</code>.
    </>
  );

  const designUsage = (
    <>
      <Section title="Depth on pages">
        <p className="docs-page__intro docs-elevation-rule">
          The page is the background. Do not put body text in a raised surface, and do not nest one
          raised surface inside another. Use a lighter fill only when something actually floats — a
          dialog, a menu, or a card that holds an action. If the parent is already raised, children
          stay on that same fill. The first lift is that one lighter step — not a border and not a
          second level.
        </p>
      </Section>

      <Section title="Recipes">
        <p className="docs-page__intro">
          Depth layering and component-to-role mapping from the elevation semantics contract.
        </p>
        <div className="docs-recipes-grid">
          <RecipePanel
            title="Depth stack"
            note="background.canvas, background.surface on canvas, and overlay.scrim behind modal panels — elevation.raised, elevation.overlay, and elevation.modal are none"
          >
            <div className="docs-recipe-depth-stack">
              <div className="docs-recipe-depth-stack__canvas" aria-hidden="true" />
              <div className="docs-recipe-depth-stack__surface docs-recipe-depth-stack__surface--card">
                background.surface (card on canvas)
              </div>
              <div className="docs-recipe-depth-stack__surface docs-recipe-depth-stack__surface--float">
                background.surface (menu, popover, select, toast)
              </div>
              <div className="docs-recipe-depth-stack__modal-scene">
                <div className="docs-recipe-depth-stack__scrim" aria-hidden="true" />
                <div className="docs-recipe-depth-stack__surface docs-recipe-depth-stack__surface--modal">
                  background.surface + overlay.scrim (dialog, drawer)
                </div>
              </div>
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
                {subgroup.tokens.map((item) =>
                  'role' in item ? (
                    <ElevationReservedRoleSwatch
                      key={item.token}
                      token={item.token}
                      label={item.label}
                      useWhen={item.useWhen}
                      role={item.role}
                    />
                  ) : (
                    <ElevationSwatch
                      key={item.token}
                      token={item.token}
                      label={item.label}
                      useWhen={item.useWhen}
                      variant="ring"
                    />
                  ),
                )}
              </div>
            </TokenSubGroup>
          ))}
        </TokenGroup>
      </Section>
    </>
  );

  const codeToc = [foundationTocItem('semantic-elevation', 'Semantic elevation')];

  const tocByTab = buildFoundationToc(
    [
      foundationTocItem('depth-on-pages', 'Depth on pages'),
      foundationTocItem('recipes', 'Recipes'),
    ],
    codeToc,
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

import { FoundationPageHeader } from '../components/FoundationPageHeader';
import { buildTokenManifest, getTokensByTier } from '../tokens/parse';
import {
  PrimitiveRadiusSample,
  PrimitiveSpaceBar,
  RadiusSample,
  RecipePanel,
  SpaceBar,
} from '../tokens/TokenSwatches';
import { Section, TokenGroup, TokenSubGroup } from './FoundationSection';

const SPACE_PRIMITIVES = ['0', '0-5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16'] as const;

const RADIUS_PRIMITIVES = ['0', '1', '2', '3', 'full'] as const;

const INSET_SUBGROUPS = [
  {
    title: 'Control density',
    tokens: [
      {
        token: 'inset-control-compact-y',
        label: 'Compact Y',
        useWhen: 'Dense controls — vertical padding (tooltip, compact triggers)',
      },
      {
        token: 'inset-control-compact-x',
        label: 'Compact X',
        useWhen: 'Dense controls — horizontal padding',
      },
      {
        token: 'inset-control-y',
        label: 'Default Y',
        useWhen: 'Standard text fields, buttons, menu items — vertical',
      },
      {
        token: 'inset-control-x',
        label: 'Default X',
        useWhen: 'Standard text fields, buttons, menu items — horizontal',
      },
      {
        token: 'inset-control-comfortable-y',
        label: 'Comfortable Y',
        useWhen: 'Large controls and generous tap targets — vertical',
      },
      {
        token: 'inset-control-comfortable-x',
        label: 'Comfortable X',
        useWhen: 'Large controls and generous tap targets — horizontal',
      },
    ],
  },
  {
    title: 'Box surfaces',
    tokens: [
      {
        token: 'inset-box-tight',
        label: 'Tight',
        useWhen: '4px symmetric box padding (menu viewport, tab list)',
      },
      {
        token: 'inset-box-compact',
        label: 'Compact',
        useWhen: '8px symmetric box padding (dense list items, toolbars)',
      },
      {
        token: 'inset-box',
        label: 'Box',
        useWhen: '16px symmetric box padding (list items, cards, alerts)',
      },
      {
        token: 'inset-box-comfortable',
        label: 'Comfortable',
        useWhen: '24px symmetric box padding (dialogs, drawers)',
      },
    ],
  },
  {
    title: 'Aliases',
    tokens: [
      { token: 'inset-compact', label: 'Compact', useWhen: 'Alias of spacing.inset.box.tight' },
      { token: 'inset-container', label: 'Container', useWhen: 'Alias of spacing.inset.box.comfortable' },
      { token: 'inset-panel', label: 'Panel', useWhen: 'Alias of spacing.inset.box' },
    ],
  },
  {
    title: 'Tooltip',
    tokens: [
      { token: 'inset-tooltip-y', label: 'Tooltip Y', useWhen: 'Tooltip content vertical padding' },
      { token: 'inset-tooltip-x', label: 'Tooltip X', useWhen: 'Tooltip content horizontal padding' },
    ],
  },
] as const;

const SPACE_GAP = [
  { token: 'gap-inline-tight', label: 'Inline tight', useWhen: 'Icon+label in dense lists, tab triggers' },
  { token: 'gap-inline', label: 'Inline', useWhen: 'Related inline elements (select value + icon)' },
  { token: 'gap-component', label: 'Component', useWhen: 'Sections inside a component (dialog title + body)' },
  { token: 'gap-section', label: 'Section', useWhen: 'Space between component groups on a page' },
  { token: 'gap-page-section', label: 'Page section', useWhen: 'Major page regions' },
] as const;

const SPACE_STACK = [
  { token: 'stack-form', label: 'Form', useWhen: 'Label, description, and error in a field' },
  { token: 'stack-control', label: 'Control', useWhen: 'Radio or checkbox item lists' },
  { token: 'stack-component', label: 'Component', useWhen: 'Content below a tab list' },
  { token: 'stack-section', label: 'Section', useWhen: 'Between sections in a form or settings page' },
  { token: 'stack-page-section', label: 'Page section', useWhen: 'Between major page blocks' },
] as const;

const RADIUS_SUBGROUPS = [
  {
    title: 'Control',
    tokens: [
      {
        token: 'control-compact',
        label: 'Compact',
        useWhen: 'Dense controls and list items (checkbox, menu item, tab trigger)',
      },
      {
        token: 'control',
        label: 'Control',
        useWhen: 'Standard text fields, textareas, select triggers',
      },
    ],
  },
  {
    title: 'Surface',
    tokens: [
      {
        token: 'surface',
        label: 'Surface',
        useWhen: 'Detached floating panels (alert, toast, popover, toolbar)',
      },
      {
        token: 'container',
        label: 'Container',
        useWhen: 'Large containers and tight-nested panels (dialog, card, menu)',
      },
    ],
  },
  {
    title: 'Shape',
    tokens: [
      { token: 'pill', label: 'Pill', useWhen: 'Fully rounded tracks (switch)' },
      { token: 'circle', label: 'Circle', useWhen: 'Circular elements (radio, spinner, switch thumb)' },
    ],
  },
] as const;

export function SizesPage() {
  const manifest = buildTokenManifest();
  const primitives = getTokensByTier(manifest, 'sizes', 'primitive');
  const semantics = getTokensByTier(manifest, 'sizes', 'semantic');

  return (
    <div className="docs-page">
      <FoundationPageHeader
        title="Sizes"
        summary={
          <>
            Spacing and radius tokens on an 8px grid. {primitives.length} primitives,{' '}
            {semantics.length} semantics parsed from <code>sizes.css</code>.
          </>
        }
      />

      <Section title="Spacing primitives">
        <p className="docs-page__intro">
          Raw spacing scale on an 8px grid. <code>space.0-5</code> (4px) is the only half-step for
          dense inline UI.
        </p>
        <div className="docs-space-grid">
          {SPACE_PRIMITIVES.map((step) => (
            <PrimitiveSpaceBar key={step} step={step} />
          ))}
        </div>
      </Section>

      <Section title="Radius primitives">
        <p className="docs-page__intro">
          Corner-radius steps. Semantic roles below alias these primitives for component use.
        </p>
        <TokenSubGroup title="Radius scale">
          <div className="docs-radius-grid">
            {RADIUS_PRIMITIVES.map((step) => (
              <PrimitiveRadiusSample key={step} step={step} />
            ))}
          </div>
        </TokenSubGroup>
      </Section>

      <Section title="Semantic spacing">
        <p className="docs-page__intro">
          Use <code>spacing.inset.control.*</code> for horizontal text controls (buttons, inputs).
          Use <code>spacing.inset.box.*</code> for box-shaped surfaces (cards, list items, alerts).
        </p>

        <TokenGroup title="Inset">
          {INSET_SUBGROUPS.map((subgroup) => (
            <TokenSubGroup key={subgroup.title} title={subgroup.title}>
              <div className="docs-space-grid">
                {subgroup.tokens.map((item) => (
                  <SpaceBar key={item.token} {...item} />
                ))}
              </div>
            </TokenSubGroup>
          ))}
        </TokenGroup>

        <TokenGroup title="Gap">
          <TokenSubGroup title="Inline & section">
            <div className="docs-space-grid">
              {SPACE_GAP.map((item) => (
                <SpaceBar key={item.token} {...item} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="Stack">
          <TokenSubGroup title="Vertical rhythm">
            <div className="docs-space-grid">
              {SPACE_STACK.map((item) => (
                <SpaceBar key={item.token} {...item} />
              ))}
            </div>
          </TokenSubGroup>
        </TokenGroup>

        <TokenGroup title="Offset">
          <TokenSubGroup title="Overlay">
            <div className="docs-space-grid">
              <SpaceBar
                token="offset-overlay"
                label="Overlay"
                useWhen="Floating overlay distance from trigger (menu, popover, tooltip)"
              />
            </div>
          </TokenSubGroup>
        </TokenGroup>
      </Section>

      <Section title="Semantic radius">
        <p className="docs-page__intro">
          Nested radius rule: when a child sits within one 4px step of the container edge, outer
          radius = inner radius + padding.
        </p>
        <TokenGroup title="Radius">
          {RADIUS_SUBGROUPS.map((subgroup) => (
            <TokenSubGroup key={subgroup.title} title={subgroup.title}>
              <div className="docs-radius-grid">
                {subgroup.tokens.map((item) => (
                  <RadiusSample key={item.token} {...item} />
                ))}
              </div>
            </TokenSubGroup>
          ))}
        </TokenGroup>
      </Section>

      <Section title="Recipes">
        <p className="docs-page__intro">
          Layout patterns composed from semantic spacing and radius tokens.
        </p>
        <div className="docs-recipes-grid">
          <RecipePanel
            title="Form field stack"
            note="spacing.stack.form between label, input, and helper text"
          >
            <div className="docs-recipe-form-stack">
              <span className="docs-recipe-form-stack__label">Password</span>
              <span className="docs-recipe-form-stack__input">••••••••</span>
              <span className="docs-recipe-form-stack__hint">Must be at least 8 characters.</span>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Control density"
            note="spacing.inset.control.compact, .y/.x, and .comfortable for vertical and horizontal padding"
          >
            <div className="docs-recipe-control-density">
              <span className="docs-recipe-control-density__item docs-recipe-control-density__item--compact">
                Compact
              </span>
              <span className="docs-recipe-control-density__item docs-recipe-control-density__item--default">
                Default
              </span>
              <span className="docs-recipe-control-density__item docs-recipe-control-density__item--comfortable">
                Comfortable
              </span>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Nested radius"
            note="radius.container on outer panel; radius.control on inner control"
          >
            <div className="docs-recipe-nested-radius">
              <div className="docs-recipe-nested-radius__outer">
                <div className="docs-recipe-nested-radius__inner">Inner control</div>
              </div>
            </div>
          </RecipePanel>

          <RecipePanel
            title="Overlay offset"
            note="spacing.offset.overlay — matches Radix sideOffset={4}"
          >
            <div className="docs-recipe-overlay-offset">
              <span className="docs-recipe-overlay-offset__trigger">Trigger</span>
              <span className="docs-recipe-overlay-offset__panel">Menu content</span>
            </div>
          </RecipePanel>
        </div>
      </Section>
    </div>
  );
}
